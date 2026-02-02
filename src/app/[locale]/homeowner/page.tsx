import HomeownerHero from '@/features/auth/components/HomeownerHero';
import HomeownerLogin from '@/features/auth/components/HomeownerLogin';
import RequirementsSection from '@/shared/components/RequirementsSection';

export default async function HomeownerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // Await the params promise
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <HomeownerHero />
      <HomeownerLogin />
      <RequirementsSection />
    </main>
  );
}
