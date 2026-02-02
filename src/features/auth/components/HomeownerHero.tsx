'use client';

import { useTranslations } from 'next-intl';

export default function HomeownerHero() {
  const t = useTranslations('homeowner.hero');

  const scrollToLogin = () => {
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToRequirements = () => {
    const requirementsSection = document.getElementById('requirements-section');
    if (requirementsSection) {
      requirementsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/pueblobonito-hero-01-658c8621d460f.jpg"
          alt="Pueblo Bonito Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/80 via-[#1A2332]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToLogin}
            className="px-8 py-4 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('ctaPrimary')}
          </button>
          <button
            onClick={scrollToRequirements}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/30"
          >
            {t('ctaSecondary')}
          </button>
        </div>
      </div>
    </section>
  );
}
