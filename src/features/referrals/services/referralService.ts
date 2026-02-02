import { createClient } from '@/shared/lib/supabase/client';
import type { Destination } from '@/shared/types/database.types';

export interface GuestReferralData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  destination: Destination;
  consentTransactional: boolean;
  consentMarketing: boolean;
  shareToken?: string;
}

export async function submitGuestReferral(data: GuestReferralData): Promise<void> {
  const supabase = createClient();

  // First, get owner_id from share_token if provided
  let ownerId: string | null = null;
  
  if (data.shareToken) {
    const { data: shareLink, error: shareLinkError } = await supabase
      .from('share_links')
      .select('owner_id')
      .eq('token', data.shareToken)
      .single();

    if (shareLinkError) {
      throw new Error('Invalid referral link');
    }

    ownerId = shareLink.owner_id;

    // Update share link stats
    await supabase
      .from('share_links')
      .update({
        referrals_count: supabase.raw('referrals_count + 1'),
        last_used_at: new Date().toISOString(),
      })
      .eq('token', data.shareToken);
  }

  if (!ownerId) {
    throw new Error('No owner found for this referral');
  }

  // Create referral
  const { data: referral, error: referralError } = await supabase
    .from('referrals')
    .insert({
      owner_id: ownerId,
      guest_first_name: data.firstName,
      guest_last_name: data.lastName,
      guest_email: data.email,
      guest_phone: data.phone,
      destination_initial: data.destination,
      destination_current: data.destination,
      consent_transactional: data.consentTransactional,
      consent_marketing: data.consentMarketing,
      source: 'guest_link',
      status: 'new',
    })
    .select()
    .single();

  if (referralError) {
    throw new Error(referralError.message);
  }

  // Create opportunity
  const { error: opportunityError } = await supabase
    .from('opportunities')
    .insert({
      referral_id: referral.id,
      destination: data.destination,
      stage: 'new',
    });

  if (opportunityError) {
    throw new Error(opportunityError.message);
  }

  // TODO: Trigger notifications
  // - Guest confirmation email
  // - Owner confirmation email
  // - Internal team notification
}

export async function getOwnerReferrals(ownerId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('owner_id', ownerId)
    .order('submitted_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getReferralById(referralId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('referrals')
    .select('*, opportunities(*)')
    .eq('id', referralId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
