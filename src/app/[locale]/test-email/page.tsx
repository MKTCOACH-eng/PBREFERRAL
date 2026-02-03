import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import EmailList from '@/features/test/components/EmailList';

export default async function TestEmailPage() {
  // Get the most recent referral with token
  const adminClient = createAdminClient();
  const { data: rawReferrals } = await adminClient
    .from('referrals')
    .select(`
      id,
      guest_first_name,
      guest_last_name,
      guest_email,
      destination,
      guest_token,
      guest_token_expires_at,
      created_at,
      owners:owner_id (
        first_name,
        last_name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  // Transform owners from array to object
  const referrals = rawReferrals?.map(ref => ({
    ...ref,
    owners: Array.isArray(ref.owners) ? ref.owners[0] || null : ref.owners
  })) || [];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-4">
            📧 Emails Simulados - Links de Guest
          </h1>
          <p className="text-gray-600 mb-6">
            Aquí puedes ver y copiar los links únicos generados para cada referido.
          </p>
          <Link 
            href="/es/homeowner"
            className="text-[#C8A882] hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>

        {referrals && referrals.length > 0 ? (
          <EmailList referrals={referrals} baseUrl={baseUrl} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">
              No hay referidos creados todavía.
            </p>
            <Link
              href="/es/dashboard/referrals/new"
              className="inline-block px-6 py-3 bg-[#C8A882] text-white rounded-lg hover:bg-[#B89872] transition-all"
            >
              Crear Primer Referido
            </Link>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-serif font-light text-[#1A2332] mb-3">
            💡 Cómo Usar Esta Página
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Crea un referido nuevo en el dashboard</li>
            <li>Recarga esta página para ver el email simulado</li>
            <li>Copia el link único o abre directo</li>
            <li>Prueba el flujo del guest (acepta oferta o solicita info)</li>
            <li>Verifica que se actualiza el estado en el dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
