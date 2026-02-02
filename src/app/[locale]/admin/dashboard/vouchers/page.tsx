import { getAllVouchers } from '@/features/admin/actions/adminActions';
import VouchersTable from '@/features/admin/components/VouchersTable';
import VouchersFilters from '@/features/admin/components/VouchersFilters';

export default async function AdminVouchersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    destination?: string;
  }>;
}) {
  const params = await searchParams;
  const result = await getAllVouchers(params);

  if (result.error || !result.vouchers) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-red-600">Error: {result.error || 'No se pudieron cargar los vouchers'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
            Vouchers ($200 F&B Bonus)
          </h1>
          <p className="text-gray-600">
            {result.vouchers.length} voucher{result.vouchers.length !== 1 ? 's' : ''} generado{result.vouchers.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">
              Generar Vouchers para Referidos Ganados
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Los vouchers con QR se generan automáticamente cuando marcas un referido como "Ganado".
              Cada voucher tiene un código único y expira en 90 días.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <VouchersFilters />

      {/* Vouchers Table */}
      <VouchersTable vouchers={result.vouchers} />
    </div>
  );
}
