'use client';

import { useTranslations } from 'next-intl';

export default function GuestOffers() {
  const t = useTranslations('guest.offers');

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-light text-[#1A2332] mb-4">
            {t('title')}
          </h2>
          <p className="text-xl font-light text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 7 Nights Offer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3342] text-white p-6">
              <h3 className="text-2xl font-serif font-light mb-2">
                {t('offer7nights.title')}
              </h3>
              <p className="text-4xl font-serif font-light text-[#C8A882]">
                {t('offer7nights.price')}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 font-light mb-6">
                {t('offer7nights.description')}
              </p>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-[#C8A882] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-light text-gray-700">
                      {t(`offer7nights.features.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 Nights Offer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-[#C8A882] to-[#B89872] text-white p-6">
              <h3 className="text-2xl font-serif font-light mb-2">
                {t('offer3nights.title')}
              </h3>
              <p className="text-4xl font-serif font-light">
                {t('offer3nights.price')}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 font-light mb-6">
                {t('offer3nights.description')}
              </p>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-[#C8A882] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-light text-gray-700">
                      {t(`offer3nights.features.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* All-Inclusive Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <h3 className="text-3xl font-serif font-light text-[#1A2332] mb-4 text-center">
            {t('allInclusive.title')}
          </h3>
          <p className="text-center text-gray-600 font-light mb-8">
            {t('allInclusive.description')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <svg className="w-6 h-6 text-[#C8A882] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light text-gray-700">
                  {t(`allInclusive.features.${i}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
