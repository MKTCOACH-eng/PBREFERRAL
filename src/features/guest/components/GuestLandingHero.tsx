'use client';

import { useTranslations } from 'next-intl';

export default function GuestLandingHero() {
  const t = useTranslations('homeguest');

  const scrollToForm = () => {
    document.getElementById('guest-registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/pueblo-bonito-sunset-beach-golf-and-spa-resort-hero.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2332]/70 via-[#1A2332]/60 to-[#1A2332]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 font-light mb-10 leading-relaxed max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mb-10">
          <h3 className="text-xl text-[#C8A882] font-serif mb-6">
            {t('howItWorks.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center text-white">
                <div className="w-12 h-12 rounded-full bg-[#C8A882] flex items-center justify-center text-xl font-serif mb-3">
                  {step}
                </div>
                <p className="text-sm font-light text-white/90">
                  {t(`howItWorks.step${step}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToForm}
          className="px-10 py-4 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {t('hero.ctaPrimary')}
        </button>
      </div>
    </section>
  );
}
