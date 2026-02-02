import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/homeowner`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ¡Autenticación Exitosa! 🎉
              </h1>
              <p className="text-gray-600">
                El Magic Link funcionó correctamente
              </p>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Información del Usuario
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    User ID:
                  </span>
                  <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Última autenticación:
                  </span>
                  <p className="text-gray-900">
                    {new Date(user.last_sign_in_at || '').toLocaleString(
                      locale
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📋 Próximos Pasos
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>
                    <strong>Autenticación:</strong> Funcionando correctamente
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">⏳</span>
                  <span>
                    <strong>Dashboard de Owner:</strong> En desarrollo
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">⏳</span>
                  <span>
                    <strong>Portal Interno:</strong> Pendiente
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">⏳</span>
                  <span>
                    <strong>Portal de Admin:</strong> Pendiente
                  </span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <form action="/api/auth/signout" method="post" className="flex-1">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </form>
              <a
                href={`/${locale}/homeowner`}
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors text-center"
              >
                Volver al Inicio
              </a>
            </div>
          </div>

          {/* Technical Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              ℹ️ Información Técnica
            </h3>
            <p className="text-sm text-blue-800">
              Esta es una página temporal para verificar que la autenticación
              con Magic Link está funcionando correctamente. El dashboard
              completo se implementará en las siguientes fases del MVP.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
