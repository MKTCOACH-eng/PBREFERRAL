import { getTranslations } from 'next-intl/server';
import { getReferralByToken } from '@/features/guest/actions/guestActions';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import GuestHero from '@/features/guest/components/GuestHero';
import GuestOffers from '@/features/guest/components/GuestOffers';
import GuestDestinations from '@/features/guest/components/GuestDestinations';
import GuestBenefits from '@/features/guest/components/GuestBenefits';
import GuestGallery from '@/features/guest/components/GuestGallery';
import GuestActions from '@/features/guest/components/GuestActions';

export default async function GuestPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const t = await getTranslations('guest');
  const params = await searchParams;
  const token = params.ref;

  // If there's a token, fetch the referral data
  let referralData = null;
  if (token) {
    const result = await getReferralByToken(token);
    if (result.success && result.referral) {
      referralData = result.referral;
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <GuestHero referralData={referralData} />
      <GuestOffers />
      <GuestDestinations />
      <GuestBenefits />
      <GuestGallery />
      <GuestActions referralData={referralData} token={token} />
      <Footer />
    </main>
  );
}
