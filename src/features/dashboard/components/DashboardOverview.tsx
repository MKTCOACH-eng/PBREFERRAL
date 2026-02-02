'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface DashboardOverviewProps {
  ownerName: string;
  stats: {
    totalReferrals: number;
    successfulReferrals: number;
    rewardsEarned: number;
  };
  recentReferrals: any[];
}

export default function DashboardOverview({
  ownerName,
  stats,
  recentReferrals,
}: DashboardOverviewProps) {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
        <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
          {t('welcome', { name: ownerName })}
        </h1>
        <p className="text-[#1A2332]/70 font-light">
          Track your referrals and rewards all in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Referrals */}
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-light text-[#1A2332]/70 uppercase tracking-wider">
                {t('stats.totalReferrals')}
              </p>
              <p className="text-4xl font-serif font-light text-[#1A2332] mt-2">
                {stats.totalReferrals}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#C8A882]/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Successful Referrals */}
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-light text-[#1A2332]/70 uppercase tracking-wider">
                {t('stats.successfulReferrals')}
              </p>
              <p className="text-4xl font-serif font-light text-[#1A2332] mt-2">
                {stats.successfulReferrals}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Rewards Earned */}
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-light text-[#1A2332]/70 uppercase tracking-wider">
                {t('stats.rewardsEarned')}
              </p>
              <p className="text-4xl font-serif font-light text-[#1A2332] mt-2">
                ${stats.rewardsEarned}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#C8A882]/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
        <h2 className="text-xl font-serif font-light text-[#1A2332] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/referrals/new"
            className="flex items-center gap-4 p-4 border border-[#C8A882]/30 rounded-lg hover:bg-[#C8A882]/5 transition-all"
          >
            <div className="w-10 h-10 bg-[#C8A882] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#1A2332]">{t('createReferral')}</p>
              <p className="text-sm text-[#1A2332]/60 font-light">Submit a new guest referral</p>
            </div>
          </Link>

          <Link
            href="/dashboard/referrals"
            className="flex items-center gap-4 p-4 border border-[#C8A882]/30 rounded-lg hover:bg-[#C8A882]/5 transition-all"
          >
            <div className="w-10 h-10 bg-[#1A2332] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#1A2332]">View All Referrals</p>
              <p className="text-sm text-[#1A2332]/60 font-light">Track status and progress</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Referrals */}
      {recentReferrals.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
          <h2 className="text-xl font-serif font-light text-[#1A2332] mb-4">
            Recent Referrals
          </h2>
          <div className="space-y-3">
            {recentReferrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between p-4 border border-[#C8A882]/20 rounded-lg"
              >
                <div>
                  <p className="font-medium text-[#1A2332]">
                    {referral.guest_first_name} {referral.guest_last_name}
                  </p>
                  <p className="text-sm text-[#1A2332]/60 font-light">
                    {referral.destination}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#C8A882]/10 text-[#C8A882] text-xs font-medium rounded-full">
                  {referral.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
