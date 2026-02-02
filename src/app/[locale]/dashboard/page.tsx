import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get owner profile using admin client
  const adminClient = createAdminClient();
  const { data: owner } = await adminClient
    .from('owners')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">
          Bienvenido de vuelta, {owner?.first_name || 'Propietario'}! 👋
        </h1>
        <p className="text-gray-600">
          Aquí puedes gestionar tus referidos y ver tus recompensas.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {owner?.total_referrals || 0}
          </div>
          <div className="text-sm text-gray-600">Total de Referidos</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {owner?.successful_referrals || 0}
          </div>
          <div className="text-sm text-gray-600">Referidos Exitosos</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${owner?.total_rewards_earned?.toFixed(2) || '0.00'} USD
          </div>
          <div className="text-sm text-gray-600">Recompensas Ganadas</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#C8A882] to-[#B89872] rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-serif mb-4">¿Listo para referir?</h2>
        <p className="mb-6 text-white/90">
          Comparte Pueblo Bonito con tus amigos y familiares y gana $200 USD en crédito F&B por cada referido exitoso.
        </p>
        <a
          href="/dashboard/referrals/new"
          className="inline-block px-6 py-3 bg-white text-[#C8A882] font-medium rounded-lg hover:bg-gray-100 transition-all shadow-md"
        >
          Crear Nuevo Referido
        </a>
      </div>
    </div>
  );
}
