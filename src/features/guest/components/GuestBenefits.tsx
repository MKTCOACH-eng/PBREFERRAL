'use client';

import { useTranslations } from 'next-intl';

export default function GuestBenefits() {
  const t = useTranslations('guest.benefits');

  const benefits = [
    { 
      key: 'luxury',
      icon: (
        <svg className="w-12 h-12 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    { 
      key: 'locations',
      icon: (
        <svg className="w-12 h-12 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      key: 'service',
      icon: (
        <svg className="w-12 h-12 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      key: 'value',
      icon: (
        <svg className="w-12 h-12 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with subtle line */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8A882] font-light mb-4">
              {t('subtitle')}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A2332] mb-6">
              {t('title')}
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C8A882] to-transparent mx-auto"></div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {benefits.map(({ key, icon }) => (
            <div
              key={key}
              className="group relative bg-white rounded-sm p-10 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100/50 overflow-hidden"
            >
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C8A882]/0 to-[#C8A882]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {icon}
                </div>
                <h3 className="text-xl font-serif font-light text-[#1A2332] mb-4 tracking-wide">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-[15px]">
                  {t(`${key}.description`)}
                </p>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C8A882]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Awards Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100">
            <svg className="w-5 h-5 text-[#C8A882]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-sm text-gray-600 font-light">
              {t('awards')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
