import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import HomeownerHero from '@/features/auth/components/HomeownerHero';
import HomeownerLogin from '@/features/auth/components/HomeownerLogin';
import RequirementsSection from '@/shared/components/RequirementsSection';

export default function HomeownerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <HomeownerHero />
      <HomeownerLogin />
      <RequirementsSection />
    </main>
  );
}
