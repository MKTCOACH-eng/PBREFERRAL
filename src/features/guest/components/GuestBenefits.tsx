'use client';

import { useTranslations } from 'next-intl';

export default function GuestBenefits() {
  const t = useTranslations('guest.benefits');

  const benefits = [
    { key: 'luxury', icon: '✨' },
    { key: 'locations', icon: '🏖️' },
    { key: 'service', icon: '🎯' },
    { key: 'value', icon: '💎' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif font-light text-[#1A2332] mb-16 text-center">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ key, icon }) => (
            <div
              key={key}
              className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-serif font-light text-[#1A2332] mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-gray-600 font-light">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
