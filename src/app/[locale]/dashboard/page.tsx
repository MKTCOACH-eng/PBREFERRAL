import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations('dashboard');

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
    .eq('owner_user_id', user.id)
    .single();

  // Get referrals
  const { data: referrals } = await adminClient
    .from('referrals')
    .select('*')
    .eq('owner_id', user.id)
    .order('submitted_at', { ascending: false });

  const totalReferrals = referrals?.length || 0;
  const successfulReferrals = referrals?.filter(r => r.status === 'closed_won').length || 0;

  // Get rewards
  const { data: rewards } = await adminClient
    .from('rewards')
    .select('amount_usd, status')
    .eq('owner_id', user.id);

  const totalRewards = rewards?.reduce((sum, r) =>
    r.status === 'issued' ? sum + Number(r.amount_usd) : sum, 0
  ) || 0;

  const ownerName = userProfile?.name_first || user.user_metadata?.first_name || user.email?.split('@')[0] || 'Owner';
  const recentReferrals = (referrals || []).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-3">
          {t('welcome', { name: ownerName })}
        </h1>
        <p className="text-gray-600 font-light">
          {t('welcomeSubtitle')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            {t('stats.totalReferrals')}
          </div>
          <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
            {totalReferrals}
          </div>
          <div className="h-1 w-12 bg-[#C8A882] rounded-full" />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            {t('stats.successfulReferrals')}
          </div>
          <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
            {successfulReferrals}
          </div>
          <div className="h-1 w-12 bg-green-500 rounded-full" />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            {t('stats.rewardsEarned')}
          </div>
          <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
            ${totalRewards.toFixed(2)}
          </div>
          <div className="text-xs font-light text-gray-500 mt-1">USD - Food & Beverage</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#1A2332] to-[#2A3342] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pueblobonito-hero-01-658c8621d460f.jpg')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-light mb-4">{t('quickActions.title')}</h2>
          <p className="mb-8 text-white/80 font-light leading-relaxed max-w-2xl">
            {t('quickActions.description')}
          </p>
          <Link
            href={`/${locale}/dashboard/referrals/new`}
            className="inline-block px-8 py-3 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('quickActions.button')}
          </Link>
        </div>
      </div>

      {/* Recent Referrals */}
      {recentReferrals.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-light text-[#1A2332]">
              {t('recentReferrals')}
            </h2>
            <Link
              href={`/${locale}/dashboard/referrals`}
              className="text-sm text-[#C8A882] hover:text-[#B89872] transition-colors"
            >
              {t('viewAllReferrals')} →
            </Link>
          </div>
          <div className="space-y-3">
            {recentReferrals.map((referral: any) => (
              <div
                key={referral.id}
                className="flex items-center justify-between p-4 border border-[#C8A882]/20 rounded-lg"
              >
                <div>
                  <p className="font-medium text-[#1A2332]">
                    {referral.guest_first_name} {referral.guest_last_name}
                  </p>
                  <p className="text-sm text-[#1A2332]/60 font-light">
                    {referral.destination_current === 'los_cabos' ? 'Los Cabos' : 'Mazatlán'}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#C8A882]/10 text-[#C8A882] text-xs font-medium rounded-full capitalize">
                  {referral.status?.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
