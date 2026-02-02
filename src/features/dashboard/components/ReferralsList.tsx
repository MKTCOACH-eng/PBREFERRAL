'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Referral {
  id: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  destination: string;
  stage: string;
  created_at: string;
  updated_at: string;
}

interface ReferralsListProps {
  referrals: Referral[];
}

export default function ReferralsList({ referrals }: ReferralsListProps) {
  const t = useTranslations('referrals.list');
  const tStatus = useTranslations('referrals.status');
  const [filter, setFilter] = useState<string>('all');

  const filteredReferrals = filter === 'all' 
    ? referrals 
    : referrals.filter(r => r.stage === filter);

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'qualified':
        return 'bg-purple-100 text-purple-700';
      case 'visit_scheduled':
        return 'bg-indigo-100 text-indigo-700';
      case 'closed_won':
        return 'bg-green-100 text-green-700';
      case 'closed_lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-[#1A2332]">
            {t('title')}
          </h1>
          <p className="text-[#1A2332]/70 font-light mt-1">
            Track and manage your referrals
          </p>
        </div>
        <Link
          href="/dashboard/referrals/new"
          className="px-6 py-3 bg-[#C8A882] text-white rounded-lg hover:bg-[#A88B5F] transition-all font-medium uppercase tracking-wider text-sm"
        >
          + New Referral
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-light transition-all ${
              filter === 'all'
                ? 'bg-[#C8A882] text-white'
                : 'bg-gray-100 text-[#1A2332] hover:bg-gray-200'
            }`}
          >
            All ({referrals.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg text-sm font-light transition-all ${
              filter === 'new'
                ? 'bg-[#C8A882] text-white'
                : 'bg-gray-100 text-[#1A2332] hover:bg-gray-200'
            }`}
          >
            New ({referrals.filter(r => r.stage === 'new').length})
          </button>
          <button
            onClick={() => setFilter('closed_won')}
            className={`px-4 py-2 rounded-lg text-sm font-light transition-all ${
              filter === 'closed_won'
                ? 'bg-[#C8A882] text-white'
                : 'bg-gray-100 text-[#1A2332] hover:bg-gray-200'
            }`}
          >
            Successful ({referrals.filter(r => r.stage === 'closed_won').length})
          </button>
        </div>
      </div>

      {/* Referrals List */}
      {filteredReferrals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-12 text-center">
          <svg className="w-16 h-16 text-[#C8A882]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-[#1A2332]/60 font-light">
            {t('noReferrals')}
          </p>
          <Link
            href="/dashboard/referrals/new"
            className="inline-block mt-4 px-6 py-2 bg-[#C8A882] text-white rounded-lg hover:bg-[#A88B5F] transition-all font-medium text-sm"
          >
            Create Your First Referral
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A2332] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    {t('guestName')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    {t('destination')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    {t('status')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    {t('submittedDate')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    {t('lastUpdate')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C8A882]/20">
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-[#C8A882]/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#1A2332]">
                          {referral.guest_first_name} {referral.guest_last_name}
                        </p>
                        <p className="text-sm text-[#1A2332]/60 font-light">
                          {referral.guest_email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#1A2332] font-light">
                      {referral.destination}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.stage)}`}>
                        {tStatus(referral.stage)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#1A2332]/70 font-light text-sm">
                      {formatDate(referral.created_at)}
                    </td>
                    <td className="px-6 py-4 text-[#1A2332]/70 font-light text-sm">
                      {formatDate(referral.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-[#C8A882]/20">
            {filteredReferrals.map((referral) => (
              <div key={referral.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-[#1A2332]">
                      {referral.guest_first_name} {referral.guest_last_name}
                    </p>
                    <p className="text-sm text-[#1A2332]/60 font-light">
                      {referral.guest_email}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.stage)}`}>
                    {tStatus(referral.stage)}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-[#1A2332]/70 font-light">
                    <span className="font-medium">Destination:</span> {referral.destination}
                  </p>
                  <p className="text-[#1A2332]/70 font-light">
                    <span className="font-medium">Submitted:</span> {formatDate(referral.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
