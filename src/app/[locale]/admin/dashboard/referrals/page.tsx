import { getAllReferrals } from '@/features/admin/actions/adminActions';
import ReferralsTable from '@/features/admin/components/ReferralsTable';
import ReferralsFilters from '@/features/admin/components/ReferralsFilters';

export default async function AdminReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    destination?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}) {
  const params = await searchParams;
  const result = await getAllReferrals(params);

  if (result.error || !result.referrals) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-red-600">Error: {result.error || 'No se pudieron cargar los referidos'}</p>
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
            Referidos
          </h1>
          <p className="text-gray-600">
            {result.referrals.length} referido{result.referrals.length !== 1 ? 's' : ''} en total
          </p>
        </div>
      </div>

      {/* Filters */}
      <ReferralsFilters />

      {/* Referrals Table */}
      <ReferralsTable referrals={result.referrals} />
    </div>
  );
}
