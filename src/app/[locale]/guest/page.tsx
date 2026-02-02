import { getTranslations } from 'next-intl/server';
import { getReferralByToken } from '@/features/guest/actions/guestActions';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import GuestHero from '@/features/guest/components/GuestHero';
import GuestOffers from '@/features/guest/components/GuestOffers';
import GuestDestinations from '@/features/guest/components/GuestDestinations';
import GuestBenefits from '@/features/guest/components/GuestBenefits';
import GuestActions from '@/features/guest/components/GuestActions';
import GuestContact from '@/features/guest/components/GuestContact';

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
      <GuestActions referralData={referralData} token={token} />
      <GuestContact />
      <Footer />
    </main>
  );
}
