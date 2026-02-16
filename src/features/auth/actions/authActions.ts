'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

// ===== MAGIC LINK AUTH (MVP Primary) =====

export async function sendMagicLink(email: string, locale: string = 'en') {
  const supabase = await createClient();

  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?locale=${locale}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error('Error sending magic link:', error);
    return { error: error.message };
  }

  return { success: true };
}

// ===== LEGACY PASSWORD AUTH (kept for backwards compatibility) =====

export async function signUpWithEmail(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  destination: string;
}) {
  const supabase = await createClient();

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          destination: data.destination,
        },
      },
    });

    if (authError) {
      console.error('Error signing up:', authError);
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: 'Could not create user' };
    }

    // Create owner profile using admin client
    await ensureOwnerProfile(authData.user.id, {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      destination: data.destination,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error during signup:', error);
    return { error: error.message || 'Unexpected error' };
  }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error signing in:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}

// ===== PROFILE MANAGEMENT =====

export async function ensureOwnerProfile(
  userId: string,
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    destination?: string;
  }
) {
  const adminClient = createAdminClient();

  // Check if user already exists in our users table
  const { data: existingUser } = await adminClient
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (!existingUser) {
    // Create user record
    const { error: userError } = await adminClient.from('users').insert({
      id: userId,
      role: 'owner',
      destination_scope: mapDestination(data.destination),
      name_first: data.firstName || '',
      name_last: data.lastName || '',
      email: data.email,
      phone: data.phone || null,
      language_preference: 'en',
      status: 'active',
    });

    if (userError && userError.code !== '23505') {
      console.error('Error creating user profile:', userError);
    }
  }

  // Check if owner profile exists
  const { data: existingOwner } = await adminClient
    .from('owners')
    .select('id')
    .eq('owner_user_id', userId)
    .single();

  if (!existingOwner) {
    const { error: ownerError } = await adminClient.from('owners').insert({
      owner_user_id: userId,
      owner_external_id: null,
      unit_community: null,
    });

    if (ownerError && ownerError.code !== '23505') {
      console.error('Error creating owner profile:', ownerError);
    }
  }
}

export async function completeOwnerProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'Not authenticated' };

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;
  const destination = formData.get('preferredDestination') as string;

  const adminClient = createAdminClient();

  // Update user
  const { error: userError } = await adminClient
    .from('users')
    .update({
      name_first: firstName,
      name_last: lastName,
      phone: phone || null,
      destination_scope: mapDestination(destination),
    })
    .eq('id', user.id);

  if (userError) {
    console.error('Error updating user profile:', userError);
    return { error: 'Failed to update profile' };
  }

  revalidatePath('/');
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return { error: error.message };
  }
  revalidatePath('/');
  return { success: true };
}

// ===== REFERRAL CRUD =====

export async function createReferral(data: {
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  destination: string;
  consentTransactional?: boolean;
  consentMarketing?: boolean;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'Not authenticated' };

  try {
    const adminClient = createAdminClient();

    // Ensure owner profile exists
    await ensureOwnerProfile(user.id, { email: user.email! });

    const dest = mapDestination(data.destination);

    // Create referral record (uses spec schema)
    const { data: newReferral, error: referralError } = await adminClient
      .from('referrals')
      .insert({
        owner_id: user.id,
        guest_first_name: data.guestFirstName,
        guest_last_name: data.guestLastName,
        guest_email: data.guestEmail,
        guest_phone: data.guestPhone,
        destination_initial: dest || 'los_cabos',
        destination_current: dest || 'los_cabos',
        status: 'new',
        consent_transactional: data.consentTransactional ?? true,
        consent_marketing: data.consentMarketing ?? false,
        source: 'owner_dashboard',
      })
      .select()
      .single();

    if (referralError) {
      console.error('Error creating referral:', referralError);
      return { error: `Error creating referral: ${referralError.message}` };
    }

    // Create corresponding opportunity (1:1)
    if (newReferral) {
      await adminClient.from('opportunities').insert({
        referral_id: newReferral.id,
        destination: dest || 'los_cabos',
        stage: 'new',
      });

      // Create internal task (24h follow-up)
      const dueAt = new Date();
      dueAt.setHours(dueAt.getHours() + 24);
      await adminClient.from('internal_tasks').insert({
        referral_id: newReferral.id,
        task_type: 'contact_within_24h',
        description: `Contact guest ${data.guestFirstName} ${data.guestLastName} within 24 hours`,
        due_at: dueAt.toISOString(),
        status: 'pending',
      });

      // Log audit
      await adminClient.from('audit_logs').insert({
        actor_user_id: user.id,
        action_key: 'referral.created',
        entity_type: 'referral',
        entity_id: newReferral.id,
        after_json: newReferral,
      });

      // Queue notifications
      await queueNotification(adminClient, {
        recipientRole: 'owner',
        recipientUserId: user.id,
        channel: 'email',
        templateKey: 'owner_referral_confirmation',
        language: 'en',
        payload: {
          owner_name: user.user_metadata?.first_name || user.email,
          guest_name: `${data.guestFirstName} ${data.guestLastName}`,
          destination: data.destination,
        },
      });

      await queueNotification(adminClient, {
        recipientRole: 'guest',
        recipientUserId: null,
        channel: 'email',
        templateKey: 'guest_confirmation',
        language: 'en',
        payload: {
          guest_name: `${data.guestFirstName} ${data.guestLastName}`,
          guest_email: data.guestEmail,
        },
      });
    }

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error creating referral:', error);
    return { error: error.message || 'Unexpected error' };
  }
}

export async function updateReferral(
  referralId: string,
  data: {
    guestFirstName?: string;
    guestLastName?: string;
    guestEmail?: string;
    guestPhone?: string;
    destination?: string;
  }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  try {
    const adminClient = createAdminClient();

    // Verify ownership
    const { data: referral } = await adminClient
      .from('referrals')
      .select('owner_id, status')
      .eq('id', referralId)
      .single();

    if (!referral || referral.owner_id !== user.id) {
      return { error: 'Permission denied' };
    }

    const updateData: Record<string, unknown> = {};
    if (data.guestFirstName) updateData.guest_first_name = data.guestFirstName;
    if (data.guestLastName) updateData.guest_last_name = data.guestLastName;
    if (data.guestEmail) updateData.guest_email = data.guestEmail;
    if (data.guestPhone) updateData.guest_phone = data.guestPhone;

    const { error: updateError } = await adminClient
      .from('referrals')
      .update(updateData)
      .eq('id', referralId);

    if (updateError) return { error: updateError.message };

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteReferral(referralId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  try {
    const adminClient = createAdminClient();
    const { data: referral } = await adminClient
      .from('referrals')
      .select('owner_id, status')
      .eq('id', referralId)
      .single();

    if (!referral || referral.owner_id !== user.id) {
      return { error: 'Permission denied' };
    }

    if (referral.status !== 'new') {
      return { error: 'Can only delete new referrals' };
    }

    await adminClient.from('referrals').delete().eq('id', referralId);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// ===== SOCIAL AUTH (kept for future) =====

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  return { success: true, url: data.url };
}

export async function signInWithFacebook() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  return { success: true, url: data.url };
}

// ===== HELPERS =====

function mapDestination(dest?: string | null): 'los_cabos' | 'mazatlan' | null {
  if (!dest) return null;
  const lower = dest.toLowerCase();
  if (lower.includes('cabo')) return 'los_cabos';
  if (lower.includes('mazat')) return 'mazatlan';
  return null;
}

async function queueNotification(
  adminClient: ReturnType<typeof createAdminClient>,
  data: {
    recipientRole: string;
    recipientUserId: string | null;
    channel: string;
    templateKey: string;
    language: string;
    payload: Record<string, unknown>;
  }
) {
  try {
    await adminClient.from('notifications').insert({
      recipient_user_id: data.recipientUserId,
      recipient_role: data.recipientRole,
      channel: data.channel,
      template_key: data.templateKey,
      language: data.language,
      payload_json: data.payload,
      status: 'queued',
    });
  } catch (err) {
    console.error('Error queuing notification:', err);
  }
}
