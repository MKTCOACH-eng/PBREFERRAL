'use client';

import { useTranslations } from 'next-intl';

export default function RewardHighlight() {
  const t = useTranslations('homeowner');

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#1A2332] via-[#2A3342] to-[#1A2332] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[#C8A882]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C8A882]/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Box */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#C8A882] to-[#A88B5F] rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-tr-full"></div>
            
            <div className="relative text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-sm font-medium tracking-wide uppercase">{t('rewardHighlight.badge')}</span>
              </div>

              {/* Main Title */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                $200 <span className="text-3xl md:text-4xl font-light">USD</span>
              </h2>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl font-light mb-6 tracking-wide">
                {t('rewardHighlight.subtitle')}
              </p>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-16 h-px bg-white/50"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-16 h-px bg-white/50"></div>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12 text-white/95">
                {t('rewardHighlight.description')}
              </p>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium mb-2 uppercase tracking-wider">{t('rewardHighlight.step')} 1</div>
                    <p className="font-light">{t('rewardHighlight.step1')}</p>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium mb-2 uppercase tracking-wider">{t('rewardHighlight.step')} 2</div>
                    <p className="font-light">{t('rewardHighlight.step2')}</p>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium mb-2 uppercase tracking-wider">{t('rewardHighlight.step')} 3</div>
                    <p className="font-light">{t('rewardHighlight.step3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
