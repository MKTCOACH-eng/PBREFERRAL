'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { getAdminProfile } from './adminActions';
import { revalidatePath } from 'next/cache';

// ============================================
// PIPEDRIVE INTEGRATION
// ============================================

export async function sendProspectToPipedrive(prospectId: string) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();

  try {
    // Get prospect data
    const { data: prospect, error: prospectError } = await adminClient
      .from('referrals')
      .select(`
        id,
        guest_first_name,
        guest_last_name,
        guest_email,
        guest_phone,
        destination,
        status
      `)
      .eq('id', prospectId)
      .single();

    if (prospectError || !prospect) {
      return { error: 'Prospecto no encontrado' };
    }

    // TODO: Implement actual Pipedrive API integration
    // For now, we'll just mark it as synced
    const mockPipedriveId = `PD-${Date.now()}`;

    // Update referral with Pipedrive ID
    const { error: updateError } = await adminClient
      .from('referrals')
      .update({
        pipedrive_id: mockPipedriveId,
        pipedrive_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', prospectId);

    if (updateError) {
      console.error('Error updating referral with Pipedrive ID:', updateError);
      return { error: updateError.message };
    }

    // Log activity
    await adminClient.from('admin_activity_logs').insert({
      admin_id: adminProfile.admin.id,
      action: 'sent_to_pipedrive',
      entity_type: 'referral',
      entity_id: prospectId,
      details: { pipedriveId: mockPipedriveId },
    });

    // Revalidate for both locales
    revalidatePath('/es/admin/dashboard/prospects');
    revalidatePath('/en/admin/dashboard/prospects');

    return { success: true, pipedriveId: mockPipedriveId };
  } catch (error: any) {
    console.error('Unexpected error sending to Pipedrive:', error);
    return { error: error.message || 'Error al enviar a Pipedrive' };
  }
}

// ============================================
// PROSPECTS MANAGEMENT (Guests from Referrals)
// ============================================

export async function getAllProspects(filters?: {
  search?: string;
  destination?: string;
  status?: string;
  source?: string;
  team?: string;
}) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();
  const team = filters?.team || adminProfile.admin.team;

  try {
    let query = adminClient
      .from('referrals')
      .select(`
        id,
        guest_first_name,
        guest_last_name,
        guest_email,
        guest_phone,
        destination,
        status,
        created_at,
        guest_viewed_at,
        pipedrive_id,
        pipedrive_synced_at,
        owners:owner_id (
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by team
    if (team !== 'Both') {
      query = query.eq('destination', team);
    }

    // Additional filters
    if (filters?.destination && filters.destination !== 'all') {
      query = query.eq('destination', filters.destination);
    }
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters?.search) {
      query = query.or(`guest_first_name.ilike.%${filters.search}%,guest_last_name.ilike.%${filters.search}%,guest_email.ilike.%${filters.search}%`);
    }

    const { data: referrals, error } = await query;

    if (error) {
      console.error('Error fetching prospects:', error);
      return { error: error.message };
    }

    // Transform referrals to prospects format
    const prospects = referrals?.map(ref => {
      // Transform owners from array to object
      const owner = Array.isArray(ref.owners) ? ref.owners[0] : ref.owners;
      
      return {
        id: ref.id,
        first_name: ref.guest_first_name,
        last_name: ref.guest_last_name,
        email: ref.guest_email,
        phone: ref.guest_phone,
        destination: ref.destination,
        status: ref.status || 'new',
        source: 'referral',
        pipedrive_id: ref.pipedrive_id,
        pipedrive_synced_at: ref.pipedrive_synced_at,
        created_at: ref.created_at,
        last_contact_at: ref.guest_viewed_at,
        referral_id: ref.id,
        owner: owner ? {
          first_name: owner.first_name,
          last_name: owner.last_name,
        } : undefined,
      };
    }) || [];

    return { success: true, prospects };
  } catch (error: any) {
    console.error('Unexpected error fetching prospects:', error);
    return { error: error.message || 'Error al obtener prospectos' };
  }
}
