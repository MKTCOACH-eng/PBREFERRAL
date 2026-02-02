'use client';

import { useTranslations } from 'next-intl';
import PuebloBonitoLogo from '@/shared/components/PuebloBonitoLogo';

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
            backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2332]/95 via-[#2C3E50]/90 to-[#1A2332]/95"></div>
        {/* Elegant overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-12">
            <PuebloBonitoLogo />
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-px bg-[#C8A882]"></div>
              <div className="w-2 h-2 bg-[#C8A882] rotate-45"></div>
              <div className="w-12 h-px bg-[#C8A882]"></div>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold mb-6 leading-tight tracking-wide">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl mb-14 max-w-4xl mx-auto font-light leading-relaxed text-white/90">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={scrollToLogin}
              className="group px-10 py-4 bg-[#C8A882] text-[#1A2332] font-medium rounded-none hover:bg-[#A88B5F] transition-all duration-500 shadow-2xl hover:shadow-[#C8A882]/50 transform hover:scale-105 uppercase tracking-wider text-sm"
            >
              <span className="flex items-center gap-2">
                {t('ctaPrimary')}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button
              onClick={scrollToRequirements}
              className="px-10 py-4 bg-transparent border-2 border-[#C8A882] text-[#C8A882] font-medium rounded-none hover:bg-[#C8A882] hover:text-[#1A2332] transition-all duration-500 uppercase tracking-wider text-sm"
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
