'use client';

import { useTranslations } from 'next-intl';

export default function GuestHero() {
  const t = useTranslations('homeguest.hero');
  const tHowItWorks = useTranslations('homeguest.howItWorks');

  const scrollToForm = () => {
    document.getElementById('guest-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Logo or Brand */}
          <div className="mb-8">
            <h2 className="text-2xl font-light tracking-wider">PUEBLO BONITO</h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mt-2"></div>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>

          {/* How It Works */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold mb-8">{tHowItWorks('title')}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <HowItWorksStep number="1" text={tHowItWorks('step1')} />
              <HowItWorksStep number="2" text={tHowItWorks('step2')} />
              <HowItWorksStep number="3" text={tHowItWorks('step3')} />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('ctaPrimary')}
          </button>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

function HowItWorksStep({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-2 border-white/30">
        {number}
      </div>
      <p className="text-lg">{text}</p>
    </div>
  );
}
