import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';

export default async function TestEmailPage() {
  // Get the most recent referral with token
  const adminClient = createAdminClient();
  const { data: referrals } = await adminClient
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
          <div className="space-y-6">
            {referrals.map((referral) => {
              const guestLink = `${baseUrl}/es/guest?ref=${referral.guest_token}`;
              const guestName = `${referral.guest_first_name} ${referral.guest_last_name}`;
              const ownerName = referral.owners 
                ? `${referral.owners.first_name} ${referral.owners.last_name}`
                : 'Owner';
              
              const expiresAt = new Date(referral.guest_token_expires_at);
              const isExpired = expiresAt < new Date();

              return (
                <div 
                  key={referral.id} 
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                    isExpired ? 'border-red-500' : 'border-green-500'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-serif font-light text-[#1A2332] mb-1">
                          Email para: {guestName}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {referral.guest_email}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        isExpired 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {isExpired ? 'Expirado' : 'Válido'}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>De:</strong> {ownerName}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Destino:</strong> {referral.destination}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Creado:</strong> {new Date(referral.created_at).toLocaleString('es-MX')}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Expira:</strong> {expiresAt.toLocaleString('es-MX')}
                      </p>
                    </div>

                    {/* Email Preview */}
                    <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3342] p-6 rounded-lg text-white mb-4">
                      <h3 className="text-lg font-serif mb-2">
                        🏖️ ¡Bienvenido a Pueblo Bonito! Oferta Exclusiva
                      </h3>
                      <p className="text-sm text-white/90 mb-4">
                        Hola <strong>{guestName}</strong>,<br/>
                        {ownerName} te ha referido para disfrutar de una experiencia única en Pueblo Bonito.
                      </p>
                      <div className="bg-[#C8A882] p-4 rounded text-center mb-4">
                        <p className="font-serif text-xl">7 NOCHES por $630 USD</p>
                        <p className="text-sm">en {referral.destination}</p>
                      </div>
                      <p className="text-sm text-white/90">
                        Haz clic en el botón para ver todos los detalles de tu oferta exclusiva:
                      </p>
                    </div>

                    {/* Link to Copy */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Link único del guest:
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={guestLink}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
                          onClick={(e) => e.currentTarget.select()}
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(guestLink);
                            alert('✓ Link copiado al portapapeles');
                          }}
                          className="px-4 py-2 bg-[#C8A882] text-white rounded hover:bg-[#B89872] transition-all text-sm"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-3">
                      <a
                        href={guestLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-[#1A2332] text-white text-center rounded hover:bg-[#2A3342] transition-all"
                      >
                        → Abrir Link del Guest
                      </a>
                      <button
                        onClick={() => {
                          const emailContent = `
To: ${referral.guest_email}
Subject: 🏖️ ¡Bienvenido a Pueblo Bonito! Oferta Exclusiva

Hola ${guestName},

${ownerName} te ha referido para disfrutar de una experiencia única en Pueblo Bonito Golf & Spa Resorts.

OFERTA EXCLUSIVA:
7 NOCHES por solo $630 USD
en ${referral.destination}

Haz clic aquí para ver tu oferta:
${guestLink}

¡Esperamos verte pronto!
Equipo Pueblo Bonito
                          `.trim();
                          
                          navigator.clipboard.writeText(emailContent);
                          alert('✓ Contenido del email copiado');
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
                      >
                        📋 Copiar Email
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
