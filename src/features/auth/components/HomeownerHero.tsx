'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AuthModal from './AuthModal';

export default function HomeownerHero() {
  const t = useTranslations('homeowner.hero');
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/pueblobonito-hero-01-658c8621d460f.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/95 via-[#1A2332]/85 to-[#1A2332]/75"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-light mb-8 leading-relaxed max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full sm:w-auto px-8 py-4 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('ctaPrimary')}
              </button>
              <a
                href="#requirements"
                className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}
