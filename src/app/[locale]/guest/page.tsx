import { getTranslations } from 'next-intl/server';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import GuestHero from '@/features/guest/components/GuestHero';
import GuestOffers from '@/features/guest/components/GuestOffers';
import GuestDestinations from '@/features/guest/components/GuestDestinations';
import GuestBenefits from '@/features/guest/components/GuestBenefits';
import GuestGallery from '@/features/guest/components/GuestGallery';
import GuestContactForm from '@/features/guest/components/GuestContactForm';

export default async function GuestPage() {
  const t = await getTranslations('guest');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <GuestHero />
      <GuestOffers />
      <GuestDestinations />
      <GuestBenefits />
      <GuestGallery />
      <GuestContactForm />
      <Footer />
    </main>
  );
}
