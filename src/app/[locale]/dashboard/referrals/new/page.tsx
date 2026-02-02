import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import NewReferralForm from '@/features/dashboard/components/NewReferralForm';

export default async function NewReferralPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations('referrals.create');

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
          {t('title')}
        </h1>
        <p className="text-gray-600 font-light">
          {t('subtitle')}
        </p>
      </div>

      <NewReferralForm />
    </div>
  );
}
