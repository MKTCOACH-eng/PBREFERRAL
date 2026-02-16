import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import GuestLandingHero from '@/features/guest/components/GuestLandingHero';
import GuestRegistrationForm from '@/features/guest/components/GuestRegistrationForm';
import RequirementsSection from '@/shared/components/RequirementsSection';

export default async function HomeGuestPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; owner?: string }>;
}) {
  const params = await searchParams;
  const ownerToken = params.token || null;
  const ownerEmail = params.owner || null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F6F3]">
        <GuestLandingHero />
        <GuestRegistrationForm ownerToken={ownerToken} ownerEmail={ownerEmail} />
        <RequirementsSection />
      </main>
      <Footer />
    </>
  );
}
