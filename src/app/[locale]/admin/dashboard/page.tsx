import { getAdminDashboardStats } from '@/features/admin/actions/adminActions';
import AdminStatsCards from '@/features/admin/components/AdminStatsCards';
import AdminRecentActivity from '@/features/admin/components/AdminRecentActivity';

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ team?: string }>;
}) {
  const searchParamsData = await searchParams;
  const result = await getAdminDashboardStats(searchParamsData.team);

  if (result.error || !result.stats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-red-600">Error: {result.error || 'No se pudieron cargar las estadísticas'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Vista general del programa de referidos
        </p>
      </div>

      {/* Stats Cards */}
      <AdminStatsCards stats={result.stats} />

      {/* Recent Activity */}
      <AdminRecentActivity />
    </div>
  );
}
