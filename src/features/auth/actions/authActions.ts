'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

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

  console.log('[createReferral] User:', user?.id);

  if (!user) {
    return { error: 'No autenticado' };
  }

  try {
    // Get owner profile
    const adminClient = createAdminClient();
    const { data: owner, error: ownerError } = await adminClient
      .from('owners')
      .select('id')
      .eq('user_id', user.id)
      .single();

    console.log('[createReferral] Owner:', owner, 'Error:', ownerError);

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

    console.log('[createReferral] Creating referral:', referralData);

    const { data: newReferral, error: referralError } = await adminClient
      .from('referrals')
      .insert(referralData)
      .select()
      .single();

    console.log('[createReferral] Result:', newReferral, 'Error:', referralError);

    if (referralError) {
      console.error('Error creating referral:', referralError);
      return { error: `Error al crear referido: ${referralError.message}` };
    }

    revalidatePath('/dashboard/referrals');
    revalidatePath('/dashboard');
    return { success: true };
    
  } catch (error: any) {
    console.error('Unexpected error creating referral:', error);
    return { error: `Error inesperado: ${error.message}` };
  }
}
