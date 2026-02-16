'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

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

    // Get owner info
    const { data: owner } = await adminClient
      .from('users')
      .select('id, name_first, name_last, email')
      .eq('id', shareLink.owner_id)
      .single();

    return {
      success: true,
      referral: {
        owner_id: shareLink.owner_id,
        owners: owner
          ? { first_name: owner.name_first, last_name: owner.name_last, email: owner.email }
          : null,
      },
    };
  } catch (error: any) {
    console.error('Error getting referral by token:', error);
    return { error: 'Error loading information' };
  }
}

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
      const { data: owner } = await adminClient
        .from('users')
        .select('id')
        .eq('email', data.ownerEmail)
        .eq('role', 'owner')
        .single();
      if (owner) ownerId = owner.id;
    }

    // Check for duplicates (email or phone within 180 days)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 180);

    const { data: duplicates } = await adminClient
      .from('referrals')
      .select('id')
      .or(`guest_email.eq.${data.email},guest_phone.eq.${data.phone}`)
      .gte('submitted_at', cutoffDate.toISOString())
      .limit(1);

    const isDuplicate = duplicates && duplicates.length > 0;
    const duplicateOfId = isDuplicate ? duplicates[0].id : null;

    const dest = data.destination === 'mazatlan' ? 'mazatlan' : 'los_cabos';

    // Create referral
    const { data: newReferral, error: referralError } = await adminClient
      .from('referrals')
      .insert({
        owner_id: ownerId || '00000000-0000-0000-0000-000000000000', // placeholder if no owner
        guest_first_name: data.firstName,
        guest_last_name: data.lastName,
        guest_email: data.email,
        guest_phone: data.phone,
        destination_initial: dest,
        destination_current: dest,
        status: 'new',
        consent_transactional: data.consentTransactional,
        consent_marketing: data.consentMarketing,
        source: data.ownerToken ? 'guest_link' : 'admin_manual',
        duplicate_of_referral_id: duplicateOfId,
      })
      .select()
      .single();

    if (referralError) {
      console.error('Error creating guest referral:', referralError);
      return { error: `Error: ${referralError.message}` };
    }

    if (newReferral) {
      // Create opportunity
      await adminClient.from('opportunities').insert({
        referral_id: newReferral.id,
        destination: dest,
        stage: 'new',
      });

      // Create 24h follow-up task
      const dueAt = new Date();
      dueAt.setHours(dueAt.getHours() + 24);
      await adminClient.from('internal_tasks').insert({
        referral_id: newReferral.id,
        task_type: 'contact_within_24h',
        description: `Contact guest ${data.firstName} ${data.lastName} within 24 hours`,
        due_at: dueAt.toISOString(),
        status: 'pending',
      });

      // Queue guest confirmation notification
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

      // Queue internal team notification
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

      // If duplicate, notify admin
      if (isDuplicate) {
        await adminClient.from('notifications').insert({
          recipient_user_id: null,
          recipient_role: 'admin',
          channel: 'in_app',
          template_key: 'duplicate_referral_detected',
          language: 'en',
          payload_json: {
            guest_name: `${data.firstName} ${data.lastName}`,
            guest_email: data.email,
            duplicate_of: duplicateOfId,
          },
          status: 'queued',
        });
      }

      // Audit log
      await adminClient.from('audit_logs').insert({
        actor_user_id: null,
        action_key: 'referral.guest_submitted',
        entity_type: 'referral',
        entity_id: newReferral.id,
        after_json: newReferral,
      });
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
