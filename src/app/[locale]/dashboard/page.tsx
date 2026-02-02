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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-3">
          Bienvenido de vuelta, {owner?.first_name || 'Propietario'}
        </h1>
        <p className="text-gray-600 font-light">
          Aquí puedes gestionar tus referidos y ver tus recompensas.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            Total de Referidos
          </div>
          <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
            {owner?.total_referrals || 0}
          </div>
          <div className="h-1 w-12 bg-[#C8A882] rounded-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            Referidos Exitosos
          </div>
          <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
            {owner?.successful_referrals || 0}
          </div>
          <div className="h-1 w-12 bg-[#C8A882] rounded-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-light text-gray-500 uppercase tracking-wider mb-3">
            Recompensas Ganadas
          </div>
          <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
            ${owner?.total_rewards_earned?.toFixed(2) || '0.00'}
          </div>
          <div className="text-xs font-light text-gray-500 mt-1">USD en crédito F&B</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#1A2332] to-[#2A3342] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pueblobonito-hero-01-658c8621d460f.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-light mb-4">¿Listo para referir?</h2>
          <p className="mb-8 text-white/80 font-light leading-relaxed max-w-2xl">
            Comparte Pueblo Bonito con tus amigos y familiares y gana $200 USD en crédito F&B por cada referido exitoso.
          </p>
          <a
            href="/dashboard/referrals/new"
            className="inline-block px-8 py-3 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Crear Nuevo Referido
          </a>
        </div>
      </div>
    </div>
  );
}
