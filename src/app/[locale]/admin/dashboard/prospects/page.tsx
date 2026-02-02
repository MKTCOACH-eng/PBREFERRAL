import { getAllProspects } from '@/features/admin/actions/pipedriveActions';
import ProspectsTable from '@/features/admin/components/ProspectsTable';
import ProspectsFilters from '@/features/admin/components/ProspectsFilters';

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    destination?: string;
    status?: string;
    source?: string;
    team?: string;
  }>;
}) {
  const searchParamsData = await searchParams;
  const result = await getAllProspects({
    search: searchParamsData.search,
    destination: searchParamsData.destination,
    status: searchParamsData.status,
    source: searchParamsData.source,
    team: searchParamsData.team,
  });

  if (result.error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-red-600">Error: {result.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
          Prospectos (Guests)
        </h1>
        <p className="text-gray-600">
          Gestión de prospectos y sincronización con Pipedrive
        </p>
      </div>

      {/* Filters */}
      <ProspectsFilters />

      {/* Prospects Table */}
      <ProspectsTable prospects={result.prospects || []} />
    </div>
  );
}
