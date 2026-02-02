'use client';

type Owner = any;
type Referral = any;
type Voucher = any;

export default function ReportsExport({
  owners,
  referrals,
  vouchers,
}: {
  owners: Owner[];
  referrals: Referral[];
  vouchers: Voucher[];
}) {
  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => {
        const value = row[h] || '';
        // Escape commas and quotes
        return typeof value === 'string' && value.includes(',') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportOwners = () => {
    const data = owners.map(o => ({
      email: o.email,
      first_name: o.first_name,
      last_name: o.last_name,
      phone: o.phone,
      preferred_destination: o.preferred_destination,
      status: o.status,
      total_referrals: o.total_referrals,
      successful_referrals: o.successful_referrals,
      total_rewards_earned: o.total_rewards_earned,
      created_at: new Date(o.created_at).toISOString(),
    }));

    exportToCSV(
      data,
      'owners-export',
      ['email', 'first_name', 'last_name', 'phone', 'preferred_destination', 'status', 'total_referrals', 'successful_referrals', 'total_rewards_earned', 'created_at']
    );
  };

  const handleExportReferrals = () => {
    const data = referrals.map((r: any) => ({
      guest_first_name: r.guest_first_name,
      guest_last_name: r.guest_last_name,
      guest_email: r.guest_email,
      guest_phone: r.guest_phone,
      destination: r.destination,
      status: r.status,
      owner_email: r.owners?.email || '',
      owner_name: r.owners ? `${r.owners.first_name} ${r.owners.last_name}` : '',
      created_at: new Date(r.created_at).toISOString(),
      guest_viewed_at: r.guest_viewed_at ? new Date(r.guest_viewed_at).toISOString() : '',
      guest_accepted_at: r.guest_accepted_at ? new Date(r.guest_accepted_at).toISOString() : '',
    }));

    exportToCSV(
      data,
      'referrals-export',
      ['guest_first_name', 'guest_last_name', 'guest_email', 'guest_phone', 'destination', 'status', 'owner_email', 'owner_name', 'created_at', 'guest_viewed_at', 'guest_accepted_at']
    );
  };

  const handleExportVouchers = () => {
    const data = vouchers.map((v: any) => ({
      voucher_code: v.voucher_code,
      guest_name: v.guest_name,
      guest_email: v.guest_email,
      amount: v.amount,
      currency: v.currency,
      destination: v.destination,
      status: v.status,
      expires_at: new Date(v.expires_at).toISOString(),
      redeemed_at: v.redeemed_at ? new Date(v.redeemed_at).toISOString() : '',
      redeemed_by: v.redeemed_by || '',
      created_at: new Date(v.created_at).toISOString(),
    }));

    exportToCSV(
      data,
      'vouchers-export',
      ['voucher_code', 'guest_name', 'guest_email', 'amount', 'currency', 'destination', 'status', 'expires_at', 'redeemed_at', 'redeemed_by', 'created_at']
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-serif font-light text-[#1A2332] mb-4">
        Exportar Datos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Export Owners */}
        <button
          onClick={handleExportOwners}
          className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[#C8A882] hover:bg-[#C8A882]/5 transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900">Propietarios</p>
            <p className="text-sm text-gray-500">{owners.length} registros</p>
          </div>
        </button>

        {/* Export Referrals */}
        <button
          onClick={handleExportReferrals}
          className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[#C8A882] hover:bg-[#C8A882]/5 transition-all group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900">Referidos</p>
            <p className="text-sm text-gray-500">{referrals.length} registros</p>
          </div>
        </button>

        {/* Export Vouchers */}
        <button
          onClick={handleExportVouchers}
          className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[#C8A882] hover:bg-[#C8A882]/5 transition-all group"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900">Vouchers</p>
            <p className="text-sm text-gray-500">{vouchers.length} registros</p>
          </div>
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Los archivos se descargarán en formato CSV compatible con Excel y Google Sheets
      </p>
    </div>
  );
}
