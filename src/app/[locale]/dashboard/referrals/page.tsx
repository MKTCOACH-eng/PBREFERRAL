import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ReferralsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations('referrals');

  if (!user) return null;

  const adminClient = createAdminClient();

  const { data: referrals } = await adminClient
    .from('referrals')
    .select('*')
    .eq('owner_id', user.id)
    .order('submitted_at', { ascending: false });

  const statusConfig: Record<string, { label: string; labelEs: string; color: string }> = {
    new: { label: 'New', labelEs: 'Nuevo', color: 'bg-blue-100 text-blue-700' },
    contacted: { label: 'Contacted', labelEs: 'Contactado', color: 'bg-yellow-100 text-yellow-700' },
    qualified: { label: 'Qualified', labelEs: 'Calificado', color: 'bg-indigo-100 text-indigo-700' },
    visit_scheduled: { label: 'Visit Scheduled', labelEs: 'Visita Programada', color: 'bg-purple-100 text-purple-700' },
    closed_won: { label: 'Closed Won', labelEs: 'Cerrado Exitoso', color: 'bg-green-100 text-green-700' },
    closed_lost: { label: 'Closed Lost', labelEs: 'Cerrado Perdido', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-light text-[#1A2332]">
          {t('title')}
        </h1>
        <Link
          href={`/${locale}/dashboard/referrals/new`}
          className="px-6 py-2 bg-[#C8A882] text-white rounded-lg hover:bg-[#B89872] transition-all shadow-sm"
        >
          + {t('form.title')}
        </Link>
      </div>

      {(!referrals || referrals.length === 0) ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-[#C8A882]/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-500 font-light">{t('noReferrals')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F6F3]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.guest')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.destination')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.submitted')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.lastUpdate')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {referrals.map((referral: any) => {
                  const status = statusConfig[referral.status] || statusConfig['new'];
                  return (
                    <tr key={referral.id} className="hover:bg-[#F8F6F3]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#1A2332]">
                          {referral.guest_first_name} {referral.guest_last_name}
                        </div>
                        <div className="text-sm text-gray-500">{referral.guest_email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {referral.destination_current === 'los_cabos' ? 'Los Cabos' : 'Mazatlán'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${status.color}`}>
                          {locale === 'es' ? status.labelEs : status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(referral.submitted_at).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(referral.updated_at).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
