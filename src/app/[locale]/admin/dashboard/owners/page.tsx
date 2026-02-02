import { getAllOwners } from '@/features/admin/actions/adminActions';
import OwnersTable from '@/features/admin/components/OwnersTable';
import OwnersFilters from '@/features/admin/components/OwnersFilters';

export default async function AdminOwnersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    destination?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const result = await getAllOwners(params);

  if (result.error || !result.owners) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-red-600">Error: {result.error || 'No se pudieron cargar los propietarios'}</p>
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
            Propietarios
          </h1>
          <p className="text-gray-600">
            {result.owners.length} propietario{result.owners.length !== 1 ? 's' : ''} registrado{result.owners.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Filters */}
      <OwnersFilters />

      {/* Owners Table */}
      <OwnersTable owners={result.owners} />
    </div>
  );
}
