import GuestHero from '@/features/referrals/components/GuestHero';
import GuestForm from '@/features/referrals/components/GuestForm';
import RequirementsSection from '@/shared/components/RequirementsSection';

export default async function HomeGuestPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  await searchParams; // Await the searchParams promise
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <GuestHero />
      <GuestForm />
      <RequirementsSection />
    </main>
  );
}
