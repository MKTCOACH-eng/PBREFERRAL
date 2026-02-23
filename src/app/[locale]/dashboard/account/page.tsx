import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getTranslations } from 'next-intl/server';
import ShareLinkSection from '@/features/dashboard/components/ShareLinkSection';
import ProfileSection from '@/features/dashboard/components/ProfileSection';

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations({ locale, namespace: 'account' });

  if (!user) return null;

  const adminClient = createAdminClient();

  // Get user profile
  const { data: userProfile } = await adminClient
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get owner profile
  const { data: ownerProfile } = await adminClient
    .from('owners')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Get or create share link (try with user.id first, as that's what the original code used)
  let { data: shareLink } = await adminClient
    .from('share_links')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  // If not found by user.id, try by owners.id
  if (!shareLink && ownerProfile?.id) {
    const { data: linkByOwner } = await adminClient
      .from('share_links')
      .select('*')
      .eq('owner_id', ownerProfile.id)
      .single();
    shareLink = linkByOwner;
  }

  if (!shareLink) {
    const token = generateToken();
    const { data: newLink } = await adminClient
      .from('share_links')
      .insert({
        owner_id: user.id,
        token,
      })
      .select()
      .single();
    shareLink = newLink;
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const shareLinkUrl = shareLink
    ? `${baseUrl}/${locale}/homeguest?token=${shareLink.token}`
    : null;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-serif font-light text-[#1A2332]">
        {t('title')}
      </h1>

      <ProfileSection
        user={{
          email: user.email || '',
          firstName: ownerProfile?.first_name || userProfile?.name_first || '',
          lastName: ownerProfile?.last_name || userProfile?.name_last || '',
          phone: ownerProfile?.phone || userProfile?.phone || '',
        }}
      />

      {shareLinkUrl && (
        <ShareLinkSection
          shareUrl={shareLinkUrl}
          clicks={shareLink?.clicks_count || 0}
          referrals={shareLink?.referrals_count || 0}
        />
      )}
    </div>
  );
}

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
