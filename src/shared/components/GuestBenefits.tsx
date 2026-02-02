'use client';

import { useTranslations } from 'next-intl';

export default function GuestBenefits() {
  const t = useTranslations('homeowner.guestBenefits');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1A2332] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#1A2332]/70 font-light max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* 7 Nights Package */}
          <div className="relative bg-gradient-to-br from-[#C8A882] to-[#A88B5F] rounded-2xl p-8 text-white shadow-xl">
            <div className="absolute top-4 right-4">
              <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">7</div>
              <div className="text-xl font-light mb-6">{t('nights')}</div>
              <div className="border-t border-white/30 pt-6 mb-6">
                <div className="text-sm font-light mb-2">{t('forOnly')}</div>
                <div className="text-4xl font-bold">$630 <span className="text-xl font-light">USD</span></div>
                <div className="text-xs mt-2 font-light">$12,600 MXN</div>
              </div>
              <div className="text-sm text-white/80 font-light">
                {t('roomOnly')}
              </div>
            </div>
          </div>

          {/* 3 Nights Package */}
          <div className="relative bg-gradient-to-br from-[#1A2332] to-[#2A3342] rounded-2xl p-8 text-white shadow-xl">
            <div className="absolute top-4 right-4">
              <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">3</div>
              <div className="text-xl font-light mb-6">{t('nights')}</div>
              <div className="border-t border-white/30 pt-6 mb-6">
                <div className="text-sm font-light mb-2">{t('forOnly')}</div>
                <div className="text-4xl font-bold">$270 <span className="text-xl font-light">USD</span></div>
                <div className="text-xs mt-2 font-light">$5,400 MXN</div>
              </div>
              <div className="text-sm text-white/80 font-light">
                {t('roomOnly')}
              </div>
            </div>
          </div>
        </div>

        {/* All-Inclusive Add-on */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#F8F6F3] to-white rounded-xl p-8 border-2 border-[#C8A882]/20 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C8A882]/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-4">
                {t('allInclusiveTitle')}
              </h3>
              <p className="text-[#1A2332]/70 mb-6 font-light">
                {t('allInclusiveDescription')}
              </p>
              <div className="inline-block bg-white rounded-lg px-8 py-4 shadow-md">
                <div className="text-3xl font-bold text-[#C8A882]">
                  $64 <span className="text-lg font-light text-[#1A2332]">USD</span>
                  <span className="text-sm font-light text-[#1A2332]/70"> / {t('perPersonPerDay')}</span>
                </div>
                <div className="text-sm text-[#1A2332]/60 mt-2">
                  $1,000 MXN / {t('perPersonPerDay')}
                </div>
                <div className="text-xs text-[#1A2332]/50 mt-2 font-light">
                  {t('minimum3Days')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#1A2332]/60 italic font-light">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
