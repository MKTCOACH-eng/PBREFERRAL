'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function GuestDestinations() {
  const t = useTranslations('guest.destinations');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-light text-[#1A2332] mb-4">
            {t('title')}
          </h2>
          <p className="text-xl font-light text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Los Cabos */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="/pueblobonito-hero-01-658c8621d460f.jpg"
                alt="Los Cabos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-3xl font-serif font-light text-white">
                  {t('losCabos.name')}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 font-light mb-6">
                {t('losCabos.description')}
              </p>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-[#C8A882] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-light text-gray-700">
                      {t(`losCabos.highlights.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mazatlán */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="/pueblobonito-hero-01-658c8621d460f.jpg"
                alt="Mazatlán"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-3xl font-serif font-light text-white">
                  {t('mazatlan.name')}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 font-light mb-6">
                {t('mazatlan.description')}
              </p>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-[#C8A882] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-light text-gray-700">
                      {t(`mazatlan.highlights.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
