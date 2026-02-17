import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const locale = searchParams.get('locale') || 'en';
  const next = searchParams.get('next') || `/${locale}/dashboard`;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Ensure user has an owner profile in our tables
      try {
        const adminClient = createAdminClient();
        const userId = data.user.id;
        const email = data.user.email || '';
        const metadata = data.user.user_metadata || {};

        // Check/create users record
        const { data: existingUser } = await adminClient
          .from('users')
          .select('id')
          .eq('id', userId)
          .single();

        if (!existingUser) {
          await adminClient.from('users').insert({
            id: userId,
            role: 'owner',
            destination_scope: null,
            name_first: metadata.first_name || metadata.full_name?.split(' ')[0] || '',
            name_last: metadata.last_name || metadata.full_name?.split(' ').slice(1).join(' ') || '',
            email,
            phone: metadata.phone || null,
            language_preference: locale === 'es' ? 'es' : 'en',
            status: 'active',
          });
        }

        // Check/create owners record
        const { data: existingOwner } = await adminClient
          .from('owners')
          .select('id')
          .eq('owner_user_id', userId)
          .single();

        if (!existingOwner) {
          await adminClient.from('owners').insert({
            owner_user_id: userId,
          });
        }
      } catch (profileError) {
        console.error('Error ensuring owner profile on callback:', profileError);
        // Don't block login if profile creation fails
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error - redirect to home
  return NextResponse.redirect(`${origin}/${locale}/homeowner?error=auth_failed`);
}
