'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

// ============================================
// AUTHENTICATION & AUTHORIZATION
// ============================================

export async function getAdminProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  const adminClient = createAdminClient();
  const { data: admin, error } = await adminClient
    .from('admins')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (error || !admin) {
    return { error: 'No tienes permisos de administrador' };
  }

  return { success: true, admin };
}

export async function signInAsAdmin(email: string, password: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Verificar que el user sea admin
  const adminClient = createAdminClient();
  const { data: admin, error: adminError } = await adminClient
    .from('admins')
    .select('*')
    .eq('user_id', data.user.id)
    .eq('status', 'active')
    .single();

  if (adminError || !admin) {
    // Cerrar sesión si no es admin
    await supabase.auth.signOut();
    return { error: 'No tienes permisos de administrador' };
  }

  return { success: true, admin };
}

// ============================================
// DASHBOARD OVERVIEW
// ============================================

export async function getAdminDashboardStats(team?: string) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();
  const teamFilter = team || adminProfile.admin.team;

  try {
    // Total owners
    let ownersQuery = adminClient.from('owners').select('id', { count: 'exact', head: true });
    if (teamFilter !== 'Both') {
      ownersQuery = ownersQuery.eq('preferred_destination', teamFilter);
    }
    const { count: totalOwners } = await ownersQuery;

    // Total referrals by status
    let referralsQuery = adminClient.from('referrals').select('status, destination');
    if (teamFilter !== 'Both') {
      referralsQuery = referralsQuery.eq('destination', teamFilter);
    }
    const { data: allReferrals } = await referralsQuery;

    const referralsByStatus = {
      pending: allReferrals?.filter(r => r.status === 'pending').length || 0,
      contacted: allReferrals?.filter(r => r.status === 'contacted').length || 0,
      interested: allReferrals?.filter(r => r.status === 'interested').length || 0,
      won: allReferrals?.filter(r => r.status === 'won').length || 0,
      lost: allReferrals?.filter(r => r.status === 'lost').length || 0,
    };

    // Vouchers by status
    let vouchersQuery = adminClient.from('vouchers').select('status, destination');
    if (teamFilter !== 'Both') {
      vouchersQuery = vouchersQuery.eq('destination', teamFilter);
    }
    const { data: allVouchers } = await vouchersQuery;

    const vouchersByStatus = {
      pending: allVouchers?.filter(v => v.status === 'pending').length || 0,
      redeemed: allVouchers?.filter(v => v.status === 'redeemed').length || 0,
      expired: allVouchers?.filter(v => v.status === 'expired').length || 0,
    };

    // Conversion rate
    const totalReferrals = allReferrals?.length || 0;
    const conversionRate = totalReferrals > 0 
      ? ((referralsByStatus.won / totalReferrals) * 100).toFixed(1)
      : '0.0';

    return {
      success: true,
      stats: {
        totalOwners: totalOwners || 0,
        totalReferrals,
        referralsByStatus,
        vouchersByStatus,
        conversionRate,
      },
    };
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return { error: error.message || 'Error al obtener estadísticas' };
  }
}

// ============================================
// OWNERS MANAGEMENT
// ============================================

export async function getAllOwners(filters?: {
  search?: string;
  destination?: string;
  status?: string;
}) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();
  const team = adminProfile.admin.team;

  try {
    let query = adminClient
      .from('owners')
      .select(`
        id,
        email,
        first_name,
        last_name,
        phone,
        preferred_destination,
        status,
        total_referrals,
        successful_referrals,
        total_rewards_earned,
        created_at
      `)
      .order('created_at', { ascending: false });

    // Filtrar por equipo
    if (team !== 'Both') {
      query = query.eq('preferred_destination', team);
    }

    // Filtros adicionales
    if (filters?.destination && filters.destination !== 'all') {
      query = query.eq('preferred_destination', filters.destination);
    }
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters?.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data: owners, error } = await query;

    if (error) {
      console.error('Error fetching owners:', error);
      return { error: error.message };
    }

    return { success: true, owners: owners || [] };
  } catch (error: any) {
    console.error('Unexpected error fetching owners:', error);
    return { error: error.message || 'Error al obtener propietarios' };
  }
}

export async function getOwnerDetail(ownerId: string) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();

  try {
    // Get owner data
    const { data: owner, error: ownerError } = await adminClient
      .from('owners')
      .select('*')
      .eq('id', ownerId)
      .single();

    if (ownerError || !owner) {
      return { error: 'Propietario no encontrado' };
    }

    // Get owner's referrals
    const { data: referrals } = await adminClient
      .from('referrals')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    // Get owner's rewards
    const { data: rewards } = await adminClient
      .from('rewards')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    return {
      success: true,
      owner,
      referrals: referrals || [],
      rewards: rewards || [],
    };
  } catch (error: any) {
    console.error('Error fetching owner detail:', error);
    return { error: error.message || 'Error al obtener detalle del propietario' };
  }
}

// ============================================
// REFERRALS MANAGEMENT
// ============================================

export async function getAllReferrals(filters?: {
  search?: string;
  destination?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();
  const team = adminProfile.admin.team;

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
        guest_accepted_at,
        updated_at,
        owners:owner_id (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    // Filtrar por equipo
    if (team !== 'Both') {
      query = query.eq('destination', team);
    }

    // Filtros adicionales
    if (filters?.destination && filters.destination !== 'all') {
      query = query.eq('destination', filters.destination);
    }
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }
    if (filters?.search) {
      query = query.or(`guest_first_name.ilike.%${filters.search}%,guest_last_name.ilike.%${filters.search}%,guest_email.ilike.%${filters.search}%`);
    }

    const { data: referrals, error } = await query;

    if (error) {
      console.error('Error fetching referrals:', error);
      return { error: error.message };
    }

    // Transform owners from array to object (Supabase returns array for foreign key)
    const transformedReferrals = referrals?.map(ref => ({
      ...ref,
      owners: Array.isArray(ref.owners) ? ref.owners[0] || null : ref.owners
    })) || [];

    return { success: true, referrals: transformedReferrals };
  } catch (error: any) {
    console.error('Unexpected error fetching referrals:', error);
    return { error: error.message || 'Error al obtener referidos' };
  }
}

export async function updateReferralStatus(
  referralId: string,
  status: string,
  notes?: string
) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();

  try {
    const { data: referral, error } = await adminClient
      .from('referrals')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', referralId)
      .select(`
        id,
        owner_id,
        guest_first_name,
        guest_last_name,
        guest_email,
        destination,
        status
      `)
      .single();

    if (error) {
      console.error('Error updating referral:', error);
      return { error: error.message };
    }

    // Auto-generate voucher if status is 'won'
    if (status === 'won') {
      console.log('✓ Referral marked as WON - Auto-generating voucher...');
      
      // Check if voucher already exists
      const { data: existingVoucher } = await adminClient
        .from('vouchers')
        .select('id')
        .eq('referral_id', referralId)
        .single();

      if (!existingVoucher) {
        // Generate unique voucher code
        const voucherCode = `PB${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        // Voucher expires in 90 days
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 90);

        const guestName = `${referral.guest_first_name} ${referral.guest_last_name}`;

        // Create voucher
        const { data: newVoucher, error: voucherError } = await adminClient
          .from('vouchers')
          .insert({
            referral_id: referral.id,
            owner_id: referral.owner_id,
            guest_name: guestName,
            guest_email: referral.guest_email,
            amount: 200.00,
            currency: 'USD',
            destination: referral.destination,
            voucher_code: voucherCode,
            status: 'pending',
            expires_at: expiresAt.toISOString(),
          })
          .select()
          .single();

        if (voucherError) {
          console.error('⚠️ Error auto-generating voucher:', voucherError);
        } else {
          console.log('✅ Voucher auto-generated:', voucherCode);
          
          // Log voucher creation
          await adminClient.from('admin_activity_logs').insert({
            admin_id: adminProfile.admin.id,
            action: 'generated_voucher',
            entity_type: 'voucher',
            entity_id: newVoucher.id,
            details: { referralId, voucherCode, amount: 200, autoGenerated: true },
          });
        }
      } else {
        console.log('ℹ️ Voucher already exists for this referral');
      }
    }

    // Log activity
    await adminClient.from('admin_activity_logs').insert({
      admin_id: adminProfile.admin.id,
      action: 'updated_referral_status',
      entity_type: 'referral',
      entity_id: referralId,
      details: { status, notes },
    });

    // Revalidate for both locales
    revalidatePath('/es/admin/dashboard/referrals');
    revalidatePath('/es/admin/dashboard/vouchers');
    revalidatePath('/es/admin/dashboard');
    revalidatePath('/en/admin/dashboard/referrals');
    revalidatePath('/en/admin/dashboard/vouchers');
    revalidatePath('/en/admin/dashboard');
    return { success: true, referral };
  } catch (error: any) {
    console.error('Unexpected error updating referral:', error);
    return { error: error.message || 'Error al actualizar referido' };
  }
}

// ============================================
// VOUCHERS MANAGEMENT
// ============================================

export async function generateVoucher(referralId: string) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();

  try {
    // Get referral data
    const { data: referral, error: refError } = await adminClient
      .from('referrals')
      .select(`
        id,
        owner_id,
        guest_first_name,
        guest_last_name,
        guest_email,
        destination,
        status
      `)
      .eq('id', referralId)
      .single();

    if (refError || !referral) {
      return { error: 'Referido no encontrado' };
    }

    if (referral.status !== 'won') {
      return { error: 'Solo se pueden generar vouchers para referidos ganados (status: won)' };
    }

    // Check if voucher already exists
    const { data: existing } = await adminClient
      .from('vouchers')
      .select('id')
      .eq('referral_id', referralId)
      .single();

    if (existing) {
      return { error: 'Ya existe un voucher para este referido' };
    }

    // Generate unique voucher code
    const voucherCode = `PB${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Voucher expires in 90 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    const guestName = `${referral.guest_first_name} ${referral.guest_last_name}`;

    // Create voucher
    const { data: voucher, error: voucherError } = await adminClient
      .from('vouchers')
      .insert({
        referral_id: referral.id,
        owner_id: referral.owner_id,
        guest_name: guestName,
        guest_email: referral.guest_email,
        amount: 200.00,
        currency: 'USD',
        destination: referral.destination,
        voucher_code: voucherCode,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (voucherError) {
      console.error('Error creating voucher:', voucherError);
      return { error: voucherError.message };
    }

    // Log activity
    await adminClient.from('admin_activity_logs').insert({
      admin_id: adminProfile.admin.id,
      action: 'generated_voucher',
      entity_type: 'voucher',
      entity_id: voucher.id,
      details: { referralId, voucherCode, amount: 200 },
    });

    // Revalidate for both locales
    revalidatePath('/es/admin/dashboard/vouchers');
    revalidatePath('/es/admin/dashboard/referrals');
    revalidatePath('/en/admin/dashboard/vouchers');
    revalidatePath('/en/admin/dashboard/referrals');
    return { success: true, voucher };
  } catch (error: any) {
    console.error('Unexpected error generating voucher:', error);
    return { error: error.message || 'Error al generar voucher' };
  }
}

export async function getAllVouchers(filters?: {
  status?: string;
  destination?: string;
}) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();
  const team = adminProfile.admin.team;

  try {
    let query = adminClient
      .from('vouchers')
      .select(`
        id,
        voucher_code,
        guest_name,
        guest_email,
        amount,
        currency,
        destination,
        status,
        expires_at,
        redeemed_at,
        redeemed_by,
        created_at,
        referrals:referral_id (
          guest_first_name,
          guest_last_name
        ),
        owners:owner_id (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    // Filtrar por equipo
    if (team !== 'Both') {
      query = query.eq('destination', team);
    }

    // Filtros adicionales
    if (filters?.destination && filters.destination !== 'all') {
      query = query.eq('destination', filters.destination);
    }
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    const { data: vouchers, error } = await query;

    if (error) {
      console.error('Error fetching vouchers:', error);
      return { error: error.message };
    }

    // Transform referrals and owners from arrays to objects
    const transformedVouchers = vouchers?.map(voucher => ({
      ...voucher,
      referrals: Array.isArray(voucher.referrals) ? voucher.referrals[0] || null : voucher.referrals,
      owners: Array.isArray(voucher.owners) ? voucher.owners[0] || null : voucher.owners
    })) || [];

    return { success: true, vouchers: transformedVouchers };
  } catch (error: any) {
    console.error('Unexpected error fetching vouchers:', error);
    return { error: error.message || 'Error al obtener vouchers' };
  }
}

export async function redeemVoucher(voucherId: string) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();

  try {
    const { data: voucher, error } = await adminClient
      .from('vouchers')
      .update({
        status: 'redeemed',
        redeemed_at: new Date().toISOString(),
        redeemed_by: `${adminProfile.admin.first_name} ${adminProfile.admin.last_name}`,
        updated_at: new Date().toISOString(),
      })
      .eq('id', voucherId)
      .select()
      .single();

    if (error) {
      console.error('Error redeeming voucher:', error);
      return { error: error.message };
    }

    // Log activity
    await adminClient.from('admin_activity_logs').insert({
      admin_id: adminProfile.admin.id,
      action: 'redeemed_voucher',
      entity_type: 'voucher',
      entity_id: voucherId,
      details: { voucherCode: voucher.voucher_code },
    });

    // Revalidate for both locales
    revalidatePath('/es/admin/dashboard/vouchers');
    revalidatePath('/en/admin/dashboard/vouchers');
    return { success: true, voucher };
  } catch (error: any) {
    console.error('Unexpected error redeeming voucher:', error);
    return { error: error.message || 'Error al canjear voucher' };
  }
}

// ============================================
// ACTIVITY LOGS
// ============================================

export async function getActivityLogs(limit: number = 50) {
  const adminProfile = await getAdminProfile();
  if (adminProfile.error || !adminProfile.admin) {
    return { error: adminProfile.error || 'No autorizado' };
  }

  const adminClient = createAdminClient();

  try {
    const { data: logs, error } = await adminClient
      .from('admin_activity_logs')
      .select(`
        id,
        action,
        entity_type,
        entity_id,
        details,
        created_at,
        admins:admin_id (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching activity logs:', error);
      return { error: error.message };
    }

    return { success: true, logs: logs || [] };
  } catch (error: any) {
    console.error('Unexpected error fetching logs:', error);
    return { error: error.message || 'Error al obtener logs' };
  }
}
