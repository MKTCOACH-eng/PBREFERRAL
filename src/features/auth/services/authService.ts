import { createClient } from '@/shared/lib/supabase/client';

export async function sendMagicLink(email: string): Promise<void> {
  const supabase = createClient();
  
  // Get current locale from URL path
  const locale = window.location.pathname.split('/')[1] || 'en';

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
