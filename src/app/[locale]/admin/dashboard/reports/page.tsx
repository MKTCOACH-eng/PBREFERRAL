import { getAllOwners, getAllReferrals, getAllVouchers } from '@/features/admin/actions/adminActions';
import ReportsExport from '@/features/admin/components/ReportsExport';
import ReportsCharts from '@/features/admin/components/ReportsCharts';

export default async function AdminReportsPage() {
  // Fetch all data for reports
  const [ownersResult, referralsResult, vouchersResult] = await Promise.all([
    getAllOwners(),
    getAllReferrals(),
    getAllVouchers(),
  ]);

  if (ownersResult.error || referralsResult.error || vouchersResult.error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-red-600">Error al cargar datos para reportes</p>
        </div>
      </div>
    );
  }

  const owners = ownersResult.owners || [];
  const referrals = referralsResult.referrals || [];
  const vouchers = vouchersResult.vouchers || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
          Reportes y Exportación
        </h1>
        <p className="text-gray-600">
          Descarga datos y visualiza métricas del programa
        </p>
      </div>

      {/* Export Section */}
      <ReportsExport 
        owners={owners}
        referrals={referrals}
        vouchers={vouchers}
      />

      {/* Charts Section */}
      <ReportsCharts 
        referrals={referrals}
        vouchers={vouchers}
      />
    </div>
  );
}
