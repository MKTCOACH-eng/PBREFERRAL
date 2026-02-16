import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getTranslations } from 'next-intl/server';

export default async function RewardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations('rewards');

  if (!user) return null;

  const adminClient = createAdminClient();

  // Get rewards with referral info
  const { data: rewards } = await adminClient
    .from('rewards')
    .select(`
      *,
      referrals:referral_id (
        guest_first_name,
        guest_last_name,
        destination_current
      )
    `)
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  const totalPending = rewards?.filter(r => r.status === 'pending').reduce((sum, r) => sum + Number(r.amount_usd), 0) || 0;
  const totalIssued = rewards?.filter(r => r.status === 'issued').reduce((sum, r) => sum + Number(r.amount_usd), 0) || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-light text-[#1A2332]">
        {t('title')}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
          <p className="text-sm font-light text-gray-500 uppercase tracking-wider mb-2">
            {t('pending')}
          </p>
          <p className="text-3xl font-serif text-[#C8A882]">${totalPending.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
          <p className="text-sm font-light text-gray-500 uppercase tracking-wider mb-2">
            {t('issued')}
          </p>
          <p className="text-3xl font-serif text-green-600">${totalIssued.toFixed(2)}</p>
        </div>
      </div>

      {/* Rewards List */}
      {(!rewards || rewards.length === 0) ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-[#C8A882]/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-light">{t('noRewards')}</p>
          <p className="text-sm text-gray-400 mt-2">{t('noRewardsHint')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F6F3]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.guest')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.amount')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.type')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.date')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rewards.map((reward: any) => {
                  const referral = Array.isArray(reward.referrals) ? reward.referrals[0] : reward.referrals;
                  return (
                    <tr key={reward.id} className="hover:bg-[#F8F6F3]/50">
                      <td className="px-6 py-4 font-medium text-[#1A2332]">
                        {referral?.guest_first_name} {referral?.guest_last_name}
                      </td>
                      <td className="px-6 py-4 text-[#C8A882] font-semibold">${Number(reward.amount_usd).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reward.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          reward.status === 'issued'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {reward.status === 'issued'
                            ? (locale === 'es' ? 'Emitido' : 'Issued')
                            : (locale === 'es' ? 'Pendiente' : 'Pending')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(reward.created_at).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
