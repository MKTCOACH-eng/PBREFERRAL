'use client';

type Referral = any;
type Voucher = any;

export default function ReportsCharts({
  referrals,
  vouchers,
}: {
  referrals: Referral[];
  vouchers: Voucher[];
}) {
  // Calculate stats by destination
  const statsByDestination = {
    'Los Cabos': {
      referrals: referrals.filter((r: any) => r.destination === 'Los Cabos').length,
      won: referrals.filter((r: any) => r.destination === 'Los Cabos' && r.status === 'won').length,
      vouchers: vouchers.filter((v: any) => v.destination === 'Los Cabos').length,
    },
    'Mazatlán': {
      referrals: referrals.filter((r: any) => r.destination === 'Mazatlán').length,
      won: referrals.filter((r: any) => r.destination === 'Mazatlán' && r.status === 'won').length,
      vouchers: vouchers.filter((v: any) => v.destination === 'Mazatlán').length,
    },
  };

  // Calculate stats by status
  const statsByStatus = {
    pending: referrals.filter((r: any) => r.status === 'pending').length,
    contacted: referrals.filter((r: any) => r.status === 'contacted').length,
    interested: referrals.filter((r: any) => r.status === 'interested').length,
    won: referrals.filter((r: any) => r.status === 'won').length,
    lost: referrals.filter((r: any) => r.status === 'lost').length,
  };

  const totalReferrals = referrals.length;
  const maxValue = Math.max(...Object.values(statsByStatus));

  return (
    <div className="space-y-6">
      {/* Stats by Destination */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-serif font-light text-[#1A2332] mb-6">
          Rendimiento por Destino
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Los Cabos */}
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
            <h3 className="text-xl font-serif font-light text-amber-900 mb-4">
              Los Cabos
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Total Referidos:</span>
                <span className="text-2xl font-semibold text-amber-700">
                  {statsByDestination['Los Cabos'].referrals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Ganados:</span>
                <span className="text-2xl font-semibold text-green-600">
                  {statsByDestination['Los Cabos'].won}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Vouchers:</span>
                <span className="text-2xl font-semibold text-amber-700">
                  {statsByDestination['Los Cabos'].vouchers}
                </span>
              </div>
              <div className="pt-2 border-t border-amber-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Tasa de Conversión:</span>
                  <span className="text-lg font-semibold text-amber-900">
                    {statsByDestination['Los Cabos'].referrals > 0
                      ? ((statsByDestination['Los Cabos'].won / statsByDestination['Los Cabos'].referrals) * 100).toFixed(1)
                      : '0'}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mazatlán */}
          <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
            <h3 className="text-xl font-serif font-light text-teal-900 mb-4">
              Mazatlán
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Total Referidos:</span>
                <span className="text-2xl font-semibold text-teal-700">
                  {statsByDestination['Mazatlán'].referrals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Ganados:</span>
                <span className="text-2xl font-semibold text-green-600">
                  {statsByDestination['Mazatlán'].won}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Vouchers:</span>
                <span className="text-2xl font-semibold text-teal-700">
                  {statsByDestination['Mazatlán'].vouchers}
                </span>
              </div>
              <div className="pt-2 border-t border-teal-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Tasa de Conversión:</span>
                  <span className="text-lg font-semibold text-teal-900">
                    {statsByDestination['Mazatlán'].referrals > 0
                      ? ((statsByDestination['Mazatlán'].won / statsByDestination['Mazatlán'].referrals) * 100).toFixed(1)
                      : '0'}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats by Status (Bar Chart) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-serif font-light text-[#1A2332] mb-6">
          Distribución por Estado
        </h2>

        <div className="space-y-4">
          {Object.entries(statsByStatus).map(([status, count]) => {
            const percentage = totalReferrals > 0 ? (count / totalReferrals) * 100 : 0;
            const barWidth = maxValue > 0 ? (count / maxValue) * 100 : 0;
            
            const statusConfig: { [key: string]: { label: string; color: string } } = {
              pending: { label: 'Pendiente', color: 'bg-yellow-500' },
              contacted: { label: 'Contactado', color: 'bg-blue-500' },
              interested: { label: 'Interesado', color: 'bg-indigo-500' },
              won: { label: 'Ganado', color: 'bg-green-500' },
              lost: { label: 'Perdido', color: 'bg-red-500' },
            };

            const config = statusConfig[status];

            return (
              <div key={status}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{config.label}</span>
                  <span className="text-sm text-gray-600">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${config.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
