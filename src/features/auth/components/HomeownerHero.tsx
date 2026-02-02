'use client';

import { useTranslations } from 'next-intl';

export default function HomeownerHero() {
  const t = useTranslations('homeowner.hero');

  const scrollToLogin = () => {
    document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRequirements = () => {
    document.getElementById('requirements-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A2332] via-[#2C3E50] to-[#1A2332] text-white min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/pueblobonito-hero-01-658c8621d460f.jpg')`,
          }}
        ></div>
        {/* Overlay más transparente para ver mejor la foto */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2332]/70 via-[#1A2332]/60 to-[#2C3E50]/65"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="text-center">
          {/* Decorative element */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-[#C8A882]"></div>
              <div className="w-2 h-2 bg-[#C8A882] rotate-45"></div>
              <div className="w-12 h-px bg-[#C8A882]"></div>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal mb-8 leading-tight tracking-wide">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl mb-14 max-w-4xl mx-auto font-light leading-relaxed text-white/90">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={scrollToLogin}
              className="group px-8 py-3 bg-[#C8A882] text-[#1A2332] font-normal rounded-none hover:bg-[#A88B5F] transition-all duration-300 shadow-lg uppercase tracking-widest text-xs"
            >
              <span className="flex items-center gap-2">
                {t('ctaPrimary')}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button
              onClick={scrollToRequirements}
              className="px-8 py-3 bg-transparent border border-[#C8A882] text-[#C8A882] font-light rounded-none hover:bg-[#C8A882] hover:text-[#1A2332] transition-all duration-300 uppercase tracking-widest text-xs"
            >
              {t('ctaSecondary')}
            </button>
          </div>
        </div>
      </div>

      {/* Elegant bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent"></div>
    </section>
  );
}
