import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get owner profile
  const adminClient = createAdminClient();
  const { data: owner } = await adminClient
    .from('owners')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
          Mi Cuenta
        </h1>
        <p className="text-gray-600 font-light">
          Gestiona tu información personal y preferencias.
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-serif font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
          Información Personal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-500 mb-2">
              Nombre
            </label>
            <div className="font-light text-gray-900 text-lg">
              {owner?.first_name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-500 mb-2">
              Apellido
            </label>
            <div className="font-light text-gray-900 text-lg">
              {owner?.last_name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-500 mb-2">
              Correo Electrónico
            </label>
            <div className="font-light text-gray-900 text-lg">
              {owner?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-500 mb-2">
              Teléfono
            </label>
            <div className="font-light text-gray-900 text-lg">
              {owner?.phone}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-500 mb-2">
              Destino Preferido
            </label>
            <div className="font-light text-gray-900 text-lg">
              {owner?.preferred_destination}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-500 mb-2">
              Estado de la Cuenta
            </label>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-light bg-green-100 text-green-800">
              {owner?.status === 'active' ? 'Activa' : owner?.status}
            </span>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-serif font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
          Estadísticas de Tu Cuenta
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
              {owner?.total_referrals || 0}
            </div>
            <div className="text-sm font-light text-gray-600">
              Referidos Totales
            </div>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
              {owner?.successful_referrals || 0}
            </div>
            <div className="text-sm font-light text-gray-600">
              Referidos Exitosos
            </div>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-serif font-light text-[#1A2332] mb-2">
              ${owner?.total_rewards_earned?.toFixed(2) || '0.00'}
            </div>
            <div className="text-sm font-light text-gray-600">
              Total Ganado (USD)
            </div>
          </div>
        </div>
      </div>

      {/* Member Since */}
      <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3342] rounded-lg shadow-lg p-8 text-white">
        <div className="text-sm font-light text-white/80 mb-2">
          Miembro del Programa de Referidos desde
        </div>
        <div className="text-2xl font-serif font-light">
          {owner?.created_at 
            ? new Date(owner.created_at).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Fecha no disponible'}
        </div>
      </div>
    </div>
  );
}
