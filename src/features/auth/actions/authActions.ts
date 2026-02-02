'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { sendEmail, generateReferralConfirmationEmail, generateGuestWelcomeEmail } from '@/lib/email/sendEmail';

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
    // Step 1: Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          destination: data.destination,
        }
      }
    });

    if (authError) {
      console.error('Error signing up:', authError);
      return { error: `Error al crear cuenta: ${authError.message}` };
    }

    if (!authData.user) {
      return { error: 'No se pudo crear el usuario' };
    }

    // Step 2: Wait a bit for auth to propagate
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: Create owner profile using admin client (bypasses RLS)
    const adminClient = createAdminClient();
    
    // First check if profile already exists
    const { data: existingOwner } = await adminClient
      .from('owners')
      .select('id')
      .eq('user_id', authData.user.id)
      .single();

    if (!existingOwner) {
      const { error: profileError } = await adminClient
        .from('owners')
        .insert({
          user_id: authData.user.id,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          preferred_destination: data.destination,
          status: 'active',
        });

      if (profileError) {
        console.error('Error creating owner profile:', profileError);
        
        // Provide helpful error messages
        if (profileError.code === '23505') {
          return { error: 'Este email ya está registrado.' };
        } else if (profileError.message.includes('relation') || profileError.message.includes('does not exist')) {
          return { error: 'La base de datos no está configurada correctamente. Por favor ejecuta el script supabase-setup.sql' };
        } else {
          return { error: `Error al crear perfil: ${profileError.message} (Código: ${profileError.code})` };
        }
      }
    }

    revalidatePath('/dashboard');
    return { success: true };
    
  } catch (error: any) {
    console.error('Unexpected error during signup:', error);
    return { error: `Error inesperado: ${error.message || 'Por favor intenta de nuevo'}` };
  }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    }
  });

  if (error) {
    console.error('Error with Google auth:', error);
    return { error: error.message };
  }

  return { success: true, url: data.url };
}

export async function signInWithFacebook() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    }
  });

  if (error) {
    console.error('Error with Facebook auth:', error);
    return { error: error.message };
  }

  return { success: true, url: data.url };
}

export async function completeOwnerProfile(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;
  const preferredDestination = formData.get('preferredDestination') as string || null;

  const { error } = await supabase
    .from('owners')
    .insert({
      user_id: user.id,
      email: user.email!,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      preferred_destination: preferredDestination,
      status: 'active',
    });

  if (error) {
    console.error('Error creating owner profile:', error);
    return { error: 'Failed to create profile' };
  }

  revalidatePath('/dashboard');
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

export async function updateReferral(
  referralId: string,
  data: {
    guestFirstName?: string;
    guestLastName?: string;
    guestEmail?: string;
    guestPhone?: string;
    destination?: string;
    specialRequests?: string;
  }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  try {
    const adminClient = createAdminClient();
    
    // Verify ownership
    const { data: owner } = await adminClient
      .from('owners')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!owner) {
      return { error: 'Perfil no encontrado' };
    }

    const { data: referral } = await adminClient
      .from('referrals')
      .select('owner_id')
      .eq('id', referralId)
      .single();

    if (!referral || referral.owner_id !== owner.id) {
      return { error: 'No tienes permiso para editar este referido' };
    }

    // Update referral
    const updateData: any = {};
    if (data.guestFirstName !== undefined) updateData.guest_first_name = data.guestFirstName;
    if (data.guestLastName !== undefined) updateData.guest_last_name = data.guestLastName;
    if (data.guestEmail !== undefined) updateData.guest_email = data.guestEmail;
    if (data.guestPhone !== undefined) updateData.guest_phone = data.guestPhone;
    if (data.destination !== undefined) updateData.destination = data.destination;
    if (data.specialRequests !== undefined) updateData.special_requests = data.specialRequests;

    const { error: updateError } = await adminClient
      .from('referrals')
      .update(updateData)
      .eq('id', referralId);

    if (updateError) {
      console.error('Error updating referral:', updateError);
      return { error: `Error al actualizar: ${updateError.message}` };
    }

    revalidatePath('/dashboard/referrals');
    revalidatePath('/dashboard');
    return { success: true };
    
  } catch (error: any) {
    console.error('Unexpected error updating referral:', error);
    return { error: `Error inesperado: ${error.message}` };
  }
}

export async function deleteReferral(referralId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  try {
    const adminClient = createAdminClient();
    
    // Verify ownership
    const { data: owner } = await adminClient
      .from('owners')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!owner) {
      return { error: 'Perfil no encontrado' };
    }

    const { data: referral } = await adminClient
      .from('referrals')
      .select('owner_id, status')
      .eq('id', referralId)
      .single();

    if (!referral || referral.owner_id !== owner.id) {
      return { error: 'No tienes permiso para eliminar este referido' };
    }

    // Only allow deletion of pending referrals
    if (referral.status !== 'pending') {
      return { error: 'Solo puedes eliminar referidos pendientes' };
    }

    const { error: deleteError } = await adminClient
      .from('referrals')
      .delete()
      .eq('id', referralId);

    if (deleteError) {
      console.error('Error deleting referral:', deleteError);
      return { error: `Error al eliminar: ${deleteError.message}` };
    }

    revalidatePath('/dashboard/referrals');
    revalidatePath('/dashboard');
    return { success: true };
    
  } catch (error: any) {
    console.error('Unexpected error deleting referral:', error);
    return { error: `Error inesperado: ${error.message}` };
  }
}

export async function createReferral(data: {
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  destination: string;
  specialRequests?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  try {
    // Get owner profile with email and name
    const adminClient = createAdminClient();
    const { data: owner } = await adminClient
      .from('owners')
      .select('id, email, first_name, last_name')
      .eq('user_id', user.id)
      .single();

    if (!owner) {
      return { error: 'Perfil de propietario no encontrado' };
    }

    // Create referral
    const referralData = {
      owner_id: owner.id,
      guest_first_name: data.guestFirstName,
      guest_last_name: data.guestLastName,
      guest_email: data.guestEmail,
      guest_phone: data.guestPhone,
      destination: data.destination,
      special_requests: data.specialRequests || null,
      status: 'pending',
    };

    const { data: newReferral, error: referralError } = await adminClient
      .from('referrals')
      .insert(referralData)
      .select()
      .single();

    if (referralError) {
      console.error('Error creating referral:', referralError);
      return { error: `Error al crear referido: ${referralError.message}` };
    }

    // Send confirmation emails (non-blocking)
    try {
      // Email to owner
      const ownerFullName = `${owner.first_name || ''} ${owner.last_name || ''}`.trim() || 'Propietario';
      const guestFullName = `${data.guestFirstName} ${data.guestLastName}`;
      
      await sendEmail({
        to: owner.email,
        subject: '✅ Referido Creado Exitosamente - Pueblo Bonito',
        html: generateReferralConfirmationEmail(ownerFullName, guestFullName, data.destination),
      });

      // Email to guest
      await sendEmail({
        to: data.guestEmail,
        subject: '🏖️ ¡Bienvenido a Pueblo Bonito! Oferta Exclusiva',
        html: generateGuestWelcomeEmail(guestFullName, ownerFullName, data.destination),
      });
    } catch (emailError: any) {
      console.error('Error sending emails (non-critical):', emailError);
      // Don't fail the referral creation if emails fail
    }

    revalidatePath('/dashboard/referrals');
    revalidatePath('/dashboard');
    return { success: true };
    
  } catch (error: any) {
    console.error('Unexpected error creating referral:', error);
    return { error: `Error inesperado: ${error.message}` };
  }
}
