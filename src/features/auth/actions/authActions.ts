'use server';

import { createClient } from '@/lib/supabase/server';
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
    return { error: authError.message };
  }

  if (authData.user) {
    // Create owner profile
    const { error: profileError } = await supabase
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
      return { error: 'Failed to create profile' };
    }
  }

  revalidatePath('/dashboard');
  return { success: true };
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
