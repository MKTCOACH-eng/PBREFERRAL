'use client';

type Stats = {
  totalOwners: number;
  totalReferrals: number;
  referralsByStatus: {
    pending: number;
    contacted: number;
    interested: number;
    won: number;
    lost: number;
  };
  vouchersByStatus: {
    pending: number;
    redeemed: number;
    expired: number;
  };
  conversionRate: string;
};

export default function AdminStatsCards({ stats }: { stats: Stats }) {
  const cards = [
    {
      title: 'Total Propietarios',
      value: stats.totalOwners,
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Referidos',
      value: stats.totalReferrals,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Referidos Ganados',
      value: stats.referralsByStatus.won,
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
    },
    {
      title: 'Tasa de Conversión',
      value: `${stats.conversionRate}%`,
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              {card.icon}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {card.title}
          </h3>
          <p className="text-3xl font-serif font-light text-[#1A2332]">
            {card.value}
          </p>
        </div>
      ))}

      {/* Referrals by Status Breakdown */}
      <div className="md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-serif font-light text-[#1A2332] mb-4">
          Estado de Referidos
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-semibold text-yellow-700">{stats.referralsByStatus.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pendientes</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-semibold text-blue-700">{stats.referralsByStatus.contacted}</p>
            <p className="text-xs text-gray-600 mt-1">Contactados</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <p className="text-2xl font-semibold text-indigo-700">{stats.referralsByStatus.interested}</p>
            <p className="text-xs text-gray-600 mt-1">Interesados</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-semibold text-green-700">{stats.referralsByStatus.won}</p>
            <p className="text-xs text-gray-600 mt-1">Ganados</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-semibold text-red-700">{stats.referralsByStatus.lost}</p>
            <p className="text-xs text-gray-600 mt-1">Perdidos</p>
          </div>
        </div>
      </div>

      {/* Vouchers Breakdown */}
      <div className="md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-serif font-light text-[#1A2332] mb-4">
          Estado de Vouchers ($200 Bonus)
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-2xl font-semibold text-amber-700">{stats.vouchersByStatus.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pendientes</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-semibold text-green-700">{stats.vouchersByStatus.redeemed}</p>
            <p className="text-xs text-gray-600 mt-1">Canjeados</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-semibold text-gray-700">{stats.vouchersByStatus.expired}</p>
            <p className="text-xs text-gray-600 mt-1">Expirados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
