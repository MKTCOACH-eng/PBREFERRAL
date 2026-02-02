import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import HomeownerHero from '@/features/auth/components/HomeownerHero';
import AuthForm from '@/features/auth/components/AuthForm';
import RewardHighlight from '@/shared/components/RewardHighlight';
import GuestBenefits from '@/shared/components/GuestBenefits';
import RequirementsSection from '@/shared/components/RequirementsSection';

export default async function HomeownerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F6F3]">
        <HomeownerHero />
        <RewardHighlight />
        <GuestBenefits />
        <AuthForm />
        <RequirementsSection />
      </main>
      <Footer />
    </>
  );
}
