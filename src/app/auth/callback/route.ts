import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/homeowner?error=auth_failed', requestUrl.origin));
    }

    if (session?.user) {
      // Check if owner profile exists
      const { data: existingOwner } = await supabase
        .from('owners')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      // If no profile exists, create one (for OAuth users)
      if (!existingOwner) {
        const userMetadata = session.user.user_metadata;
        const email = session.user.email || '';
        
        // Extract name from metadata
        const fullName = userMetadata.full_name || userMetadata.name || '';
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || 'Usuario';
        const lastName = nameParts.slice(1).join(' ') || 'OAuth';

        const { error: profileError } = await supabase
          .from('owners')
          .insert({
            user_id: session.user.id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone: userMetadata.phone || '', // OAuth might not provide phone
            preferred_destination: 'Los Cabos', // Default
            status: 'active',
          });

        if (profileError) {
          console.error('Error creating OAuth owner profile:', profileError);
          // Continue anyway - user can complete profile later
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  // Default to 'es' locale for auth callback
  return NextResponse.redirect(new URL('/es/dashboard', requestUrl.origin));
}
