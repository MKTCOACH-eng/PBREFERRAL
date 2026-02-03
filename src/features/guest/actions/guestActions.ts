'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function getReferralByToken(token: string) {
  try {
    const adminClient = createAdminClient();

    // Get referral by token
    const { data: referral, error } = await adminClient
      .from('referrals')
      .select(`
        id,
        guest_first_name,
        guest_last_name,
        guest_email,
        guest_phone,
        destination,
        guest_token,
        guest_token_expires_at,
        guest_viewed_at,
        guest_accepted_at,
        status,
        owner_id,
        owners:owner_id (
          first_name,
          last_name,
          email
        )
      `)
      .eq('guest_token', token)
      .single();

    if (error || !referral) {
      return { error: 'Token inválido o expirado' };
    }

    // Check if token is expired
    if (referral.guest_token_expires_at) {
      const expiresAt = new Date(referral.guest_token_expires_at);
      if (expiresAt < new Date()) {
        return { error: 'Este enlace ha expirado' };
      }
    }

    // Mark as viewed if not already viewed
    if (!referral.guest_viewed_at) {
      await adminClient
        .from('referrals')
        .update({ guest_viewed_at: new Date().toISOString() })
        .eq('id', referral.id);
    }

    // Transform owners from array to object
    const transformedReferral = {
      ...referral,
      owners: Array.isArray(referral.owners) ? referral.owners[0] || null : referral.owners
    };

    return { success: true, referral: transformedReferral };
  } catch (error: any) {
    console.error('Error getting referral by token:', error);
    return { error: 'Error al cargar la información' };
  }
}

export async function acceptReferralOffer(token: string) {
  try {
    const adminClient = createAdminClient();

    // Update referral as accepted
    const { data, error } = await adminClient
      .from('referrals')
      .update({
        guest_accepted_at: new Date().toISOString(),
        status: 'interested'
      })
      .eq('guest_token', token)
      .select()
      .single();

    if (error) {
      console.error('Error accepting offer:', error);
      return { error: 'Error al aceptar la oferta' };
    }

    // TODO: Send notification to sales team
    console.log('✅ Guest accepted offer:', data);

    revalidatePath('/guest');
    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error accepting offer:', error);
    return { error: 'Error inesperado' };
  }
}

export async function requestMoreInfo(token: string, message?: string) {
  try {
    const adminClient = createAdminClient();

    // Update referral with request for more info
    const { data, error } = await adminClient
      .from('referrals')
      .update({
        special_requests: message || 'Solicita más información',
        status: 'contacted'
      })
      .eq('guest_token', token)
      .select()
      .single();

    if (error) {
      console.error('Error requesting more info:', error);
      return { error: 'Error al enviar solicitud' };
    }

    // TODO: Send notification to sales team
    console.log('📧 Guest requested more info:', data);

    revalidatePath('/guest');
    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error requesting info:', error);
    return { error: 'Error inesperado' };
  }
}
