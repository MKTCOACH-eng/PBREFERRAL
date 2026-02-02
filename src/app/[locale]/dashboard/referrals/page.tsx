import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import ReferralRow from '@/features/dashboard/components/ReferralRow';
import ReferralFilters from '@/features/dashboard/components/ReferralFilters';

export default async function ReferralsPage({
  searchParams,
}: {
  searchParams: { status?: string; destination?: string; sortBy?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get owner profile
  const adminClient = createAdminClient();
  const { data: owner } = await adminClient
    .from('owners')
    .select('id')
    .eq('user_id', user.id)
    .single();

  // Build query with filters
  let query = adminClient
    .from('referrals')
    .select('*')
    .eq('owner_id', owner?.id || '');

  // Apply filters
  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status);
  }
  
  if (searchParams.destination && searchParams.destination !== 'all') {
    query = query.eq('destination', searchParams.destination);
  }

  // Apply sorting
  const sortBy = searchParams.sortBy || 'newest';
  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else if (sortBy === 'name') {
    query = query.order('guest_first_name', { ascending: true });
  }

  const { data: referrals } = await query;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
          Mis Referidos
        </h1>
        <p className="text-gray-600 font-light">
          Gestiona y da seguimiento a todos tus referidos.
        </p>
      </div>

      <ReferralFilters />

      {referrals && referrals.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-light text-gray-500 uppercase tracking-wider">
                    Invitado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-gray-500 uppercase tracking-wider">
                    Destino
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <ReferralRow key={referral.id} referral={referral} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-light text-gray-900 mb-2">
              Aún no tienes referidos
            </h3>
            <p className="text-gray-600 font-light mb-6">
              Comienza a compartir Pueblo Bonito con tus amigos y familiares.
            </p>
            <a
              href="/dashboard/referrals/new"
              className="inline-block px-6 py-3 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all"
            >
              Crear Tu Primer Referido
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
