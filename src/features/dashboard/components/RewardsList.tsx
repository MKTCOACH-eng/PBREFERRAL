'use client';

import { useTranslations } from 'next-intl';

interface Reward {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  referral: {
    guest_first_name: string;
    guest_last_name: string;
    destination: string;
  };
}

interface RewardsListProps {
  rewards: Reward[];
}

export default function RewardsList({ rewards }: RewardsListProps) {
  const t = useTranslations('rewards');

  const totalEarned = rewards
    .filter(r => r.status === 'issued')
    .reduce((sum, r) => sum + r.amount, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Total */}
      <div className="bg-gradient-to-br from-[#C8A882] to-[#A88B5F] rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-light uppercase tracking-wider opacity-90">
              {t('totalEarned')}
            </p>
            <p className="text-5xl font-serif font-light mt-2">
              ${totalEarned}
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20">
        <div className="p-6 border-b border-[#C8A882]/20">
          <h1 className="text-2xl font-serif font-light text-[#1A2332]">
            {t('title')}
          </h1>
        </div>

        {rewards.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-[#C8A882]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#1A2332]/60 font-light">
              {t('noRewards')}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F6F3]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1A2332]/70 uppercase tracking-wider">
                      {t('referralGuest')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1A2332]/70 uppercase tracking-wider">
                      {t('amount')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1A2332]/70 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1A2332]/70 uppercase tracking-wider">
                      {t('issuedDate')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C8A882]/20">
                  {rewards.map((reward) => (
                    <tr key={reward.id} className="hover:bg-[#C8A882]/5">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[#1A2332]">
                            {reward.referral.guest_first_name} {reward.referral.guest_last_name}
                          </p>
                          <p className="text-sm text-[#1A2332]/60 font-light">
                            {reward.referral.destination}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#1A2332] font-medium">
                        ${reward.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          reward.status === 'issued'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {reward.status === 'issued' ? t('statusIssued') : t('statusPending')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#1A2332]/70 font-light text-sm">
                        {formatDate(reward.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#C8A882]/20">
              {rewards.map((reward) => (
                <div key={reward.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-[#1A2332]">
                        {reward.referral.guest_first_name} {reward.referral.guest_last_name}
                      </p>
                      <p className="text-sm text-[#1A2332]/60 font-light">
                        {reward.referral.destination}
                      </p>
                    </div>
                    <p className="text-lg font-medium text-[#C8A882]">
                      ${reward.amount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reward.status === 'issued'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {reward.status === 'issued' ? t('statusIssued') : t('statusPending')}
                    </span>
                    <p className="text-[#1A2332]/70 font-light">
                      {formatDate(reward.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
