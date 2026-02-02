'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ReferralData {
  guest_first_name: string;
  guest_last_name: string;
  destination: string;
  owners: {
    first_name: string;
    last_name: string;
  };
}

export default function GuestHero({ referralData }: { referralData: ReferralData | null }) {
  const t = useTranslations('guest.hero');

  const scrollToActions = () => {
    document.getElementById('guest-actions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const guestName = referralData 
    ? `${referralData.guest_first_name} ${referralData.guest_last_name}`
    : null;
  
  const ownerName = referralData?.owners
    ? `${referralData.owners.first_name} ${referralData.owners.last_name}`
    : null;

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/pueblobonito-hero-01-658c8621d460f.jpg"
          alt="Pueblo Bonito Resort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {guestName ? (
          <>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-6">
              ¡Hola {guestName}!
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-white/90">
              {ownerName} te ha referido para disfrutar de Pueblo Bonito
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-white/90">
              {t('subtitle')}
            </p>
          </>
        )}
        
        {/* Special Offer Badge */}
        <div className="inline-block bg-[#C8A882] px-8 py-4 rounded-lg mb-8 shadow-2xl">
          <p className="text-sm font-light uppercase tracking-wider mb-1">
            {t('offer')}
          </p>
          <p className="text-3xl font-serif font-light">
            7 Noches por $630 USD
          </p>
        </div>

        <div>
          <button
            onClick={scrollToActions}
            className="px-10 py-4 bg-white text-[#1A2332] font-light rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            {guestName ? 'Ver Mi Oferta' : t('ctaButton')}
          </button>
        </div>
      </div>
    </section>
  );
}
