'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

/**
 * Get referral info by share link token.
 * share_links.owner_id references users.id (or owners.id depending on creation).
 */
export async function getReferralByToken(token: string) {
  try {
    const adminClient = createAdminClient();

    const { data: shareLink } = await adminClient
      .from('share_links')
      .select('owner_id, token, clicks_count')
      .eq('token', token)
      .single();

    if (!shareLink) {
      return { error: 'Invalid or expired token' };
    }

    // Increment click count
    await adminClient
      .from('share_links')
      .update({
        clicks_count: (shareLink.clicks_count || 0) + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('token', token);

    // Get owner info from owners table
    const { data: owner } = await adminClient
      .from('owners')
      .select('id, first_name, last_name, email, user_id')
      .eq('id', shareLink.owner_id)
      .single();

    // If not found by owners.id, try by user_id
    let ownerInfo = owner;
    if (!ownerInfo) {
      const { data: ownerByUser } = await adminClient
        .from('owners')
        .select('id, first_name, last_name, email, user_id')
        .eq('user_id', shareLink.owner_id)
        .single();
      ownerInfo = ownerByUser;
    }

    return {
      success: true,
      referral: {
        owner_id: ownerInfo?.id || shareLink.owner_id,
        owners: ownerInfo
          ? { first_name: ownerInfo.first_name, last_name: ownerInfo.last_name, email: ownerInfo.email }
          : null,
      },
    };
  } catch (error: any) {
    console.error('Error getting referral by token:', error);
    return { error: 'Error loading information' };
  }
}

/**
 * Submit a guest referral from the guest landing page.
 * 
 * ACTUAL DB SCHEMA:
 *   referrals.owner_id → FK to owners.id (NOT users.id)
 *   referrals.destination → text ("Los Cabos" | "Mazatlán")
 *   referrals.status → text ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')
 *   Uses created_at (not submitted_at) for timestamps
 */
export async function submitGuestReferral(data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  destination: string;
  consentTransactional: boolean;
  consentMarketing: boolean;
  ownerToken?: string;
  ownerEmail?: string;
}) {
  try {
    const adminClient = createAdminClient();

    // Resolve owner ID from token or email
    // IMPORTANT: referrals.owner_id references owners.id, not users.id
    let ownerId: string | null = null;

    if (data.ownerToken) {
      const { data: shareLink } = await adminClient
        .from('share_links')
        .select('owner_id')
        .eq('token', data.ownerToken)
        .single();
      if (shareLink) ownerId = shareLink.owner_id;
    }

    if (!ownerId && data.ownerEmail) {
      // Look up owner by email in owners table
      const { data: owner } = await adminClient
        .from('owners')
        .select('id')
        .eq('email', data.ownerEmail)
        .single();
      if (owner) ownerId = owner.id;
    }

    // Check for duplicates (email or phone within 180 days)
    // Uses created_at (actual column) instead of submitted_at
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 180);

    const { data: duplicates } = await adminClient
      .from('referrals')
      .select('id')
      .or(`guest_email.eq.${data.email},guest_phone.eq.${data.phone}`)
      .gte('created_at', cutoffDate.toISOString())
      .limit(1);

    const isDuplicate = duplicates && duplicates.length > 0;

    // Map destination to display text (actual DB uses text, not enum)
    const dest = data.destination.toLowerCase().includes('mazat') ? 'Mazatlán' : 'Los Cabos';

    // Create referral (using actual DB column names)
    const insertData: Record<string, unknown> = {
      guest_first_name: data.firstName,
      guest_last_name: data.lastName,
      guest_email: data.email,
      guest_phone: data.phone,
      destination: dest,
      status: 'pending',
    };

    // Only add owner_id if we have one (FK constraint)
    if (ownerId) {
      insertData.owner_id = ownerId;
    }

    const { data: newReferral, error: referralError } = await adminClient
      .from('referrals')
      .insert(insertData)
      .select()
      .single();

    if (referralError) {
      console.error('Error creating guest referral:', referralError);
      return { error: `Error: ${referralError.message}` };
    }

    if (newReferral) {
      // Try to create opportunity (opportunities table uses enums)
      try {
        const destEnum = dest.includes('Mazat') ? 'mazatlan' : 'los_cabos';
        await adminClient.from('opportunities').insert({
          referral_id: newReferral.id,
          destination: destEnum,
          stage: 'new',
        });
      } catch (oppErr) {
        console.error('Warning: Could not create opportunity:', oppErr);
      }

      // Try to create 24h follow-up task
      try {
        const dueAt = new Date();
        dueAt.setHours(dueAt.getHours() + 24);
        await adminClient.from('internal_tasks').insert({
          referral_id: newReferral.id,
          task_type: 'contact_within_24h',
          description: `Contact guest ${data.firstName} ${data.lastName} within 24 hours`,
          due_at: dueAt.toISOString(),
          status: 'pending',
        });
      } catch (taskErr) {
        console.error('Warning: Could not create task:', taskErr);
      }

      // Queue guest confirmation notification
      try {
        await adminClient.from('notifications').insert({
          recipient_user_id: null,
          recipient_role: 'guest',
          channel: 'email',
          template_key: 'guest_confirmation',
          language: 'en',
          payload_json: {
            guest_name: `${data.firstName} ${data.lastName}`,
            guest_email: data.email,
            destination: dest,
          },
          status: 'queued',
        });
      } catch (notifErr) {
        console.error('Warning: Could not queue notification:', notifErr);
      }

      // Queue internal team notification
      try {
        await adminClient.from('notifications').insert({
          recipient_user_id: null,
          recipient_role: 'internal',
          channel: 'email',
          template_key: 'internal_new_referral',
          language: 'en',
          payload_json: {
            guest_name: `${data.firstName} ${data.lastName}`,
            guest_email: data.email,
            guest_phone: data.phone,
            owner_email: data.ownerEmail || 'Unknown',
            destination: dest,
          },
          status: 'queued',
        });
      } catch (notifErr) {
        console.error('Warning: Could not queue internal notification:', notifErr);
      }

      // If duplicate, notify admin
      if (isDuplicate) {
        try {
          await adminClient.from('notifications').insert({
            recipient_user_id: null,
            recipient_role: 'admin',
            channel: 'in_app',
            template_key: 'duplicate_referral_detected',
            language: 'en',
            payload_json: {
              guest_name: `${data.firstName} ${data.lastName}`,
              guest_email: data.email,
              duplicate_of: duplicates![0].id,
            },
            status: 'queued',
          });
        } catch (notifErr) {
          console.error('Warning: Could not queue duplicate notification:', notifErr);
        }
      }

      // Audit log
      try {
        await adminClient.from('audit_logs').insert({
          actor_user_id: null,
          action_key: 'referral.guest_submitted',
          entity_type: 'referral',
          entity_id: newReferral.id,
          after_json: newReferral,
        });
      } catch (auditErr) {
        console.error('Warning: Could not create audit log:', auditErr);
      }
    }

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error submitting guest referral:', error);
    return { error: 'Unexpected error' };
  }
}

export async function acceptReferralOffer(token: string) {
  try {
    const adminClient = createAdminClient();

    const { data, error } = await adminClient
      .from('referrals')
      .update({
        status: 'contacted',
      })
      .eq('id', token)
      .select()
      .single();

    if (error) return { error: 'Error accepting offer' };

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { error: 'Unexpected error' };
  }
}

export async function requestMoreInfo(token: string, message?: string) {
  try {
    const adminClient = createAdminClient();

    const { error } = await adminClient
      .from('referrals')
      .update({ status: 'contacted' })
      .eq('id', token);

    if (error) return { error: 'Error' };

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { error: 'Unexpected error' };
  }
}
