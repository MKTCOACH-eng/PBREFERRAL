import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function RewardsPage({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations('rewards');

  if (!user) {
    return null;
  }

  // Get owner profile
  const adminClient = createAdminClient();
  const { data: owner } = await adminClient
    .from('owners')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Get rewards
  const { data: rewards } = await adminClient
    .from('rewards')
    .select('*')
    .eq('owner_id', owner?.id || '')
    .order('created_at', { ascending: false });

  const totalEarned = rewards?.reduce((sum, reward) => 
    reward.status === 'paid' ? sum + Number(reward.amount) : sum, 0
  ) || 0;

  const pendingRewards = rewards?.filter(r => r.status === 'pending').length || 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
          {t('title')}
        </h1>
        <p className="text-gray-600 font-light">
          {t('subtitle')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#C8A882] to-[#B89872] rounded-lg shadow-lg p-8 text-white">
          <div className="text-sm font-light uppercase tracking-wider mb-3 text-white/80">
            {t('summary.totalEarned')}
          </div>
          <div className="text-5xl font-serif font-light mb-2">
            ${totalEarned.toFixed(2)}
          </div>
          <div className="text-sm font-light text-white/80">
            {t('summary.currency')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            {t('summary.pendingRewards')}
          </div>
          <div className="text-5xl font-serif font-light text-[#1A2332] mb-2">
            {pendingRewards}
          </div>
          <div className="text-sm font-light text-gray-500">
            {t('summary.inApproval')}
          </div>
        </div>
      </div>

      {/* Rewards List */}
      {rewards && rewards.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-serif font-light text-gray-900">
              {t('history.title')}
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {rewards.map((reward) => (
              <div key={reward.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-light text-gray-900 mb-1">
                      {reward.description || t('history.defaultDescription')}
                    </div>
                    <div className="text-sm font-light text-gray-500">
                      {new Date(reward.created_at).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-serif font-light text-[#1A2332]">
                        ${Number(reward.amount).toFixed(2)}
                      </div>
                      <div className="text-xs font-light text-gray-500">
                        {reward.currency}
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-light ${
                      reward.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : reward.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {reward.status === 'pending' ? t('history.statusPending') : 
                       reward.status === 'paid' ? t('history.statusPaid') : 
                       reward.status === 'approved' ? t('history.statusApproved') : reward.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-light text-gray-900 mb-2">
              {t('empty.title')}
            </h3>
            <p className="text-gray-600 font-light mb-6">
              {t('empty.description')}
            </p>
            <Link
              href={`/${params.locale}/dashboard/referrals/new`}
              className="inline-block px-6 py-3 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all"
            >
              {t('empty.button')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
