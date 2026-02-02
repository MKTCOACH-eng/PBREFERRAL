'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function GuestContact() {
  const t = useTranslations('guest.contact');
  const [showContacts, setShowContacts] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F6F3]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A2332] mb-6">
          {t('title')}
        </h2>
        <p className="text-xl font-light text-gray-600 mb-12">
          {t('subtitle')}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="inline-flex items-center gap-3 px-12 py-4 bg-[#C8A882] text-white text-lg font-light rounded-sm hover:bg-[#B89872] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
        >
          {t('ctaButton')}
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${showContacts ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Contact Information - Slides down */}
        <div 
          className={`overflow-hidden transition-all duration-500 ${
            showContacts ? 'max-h-[600px] opacity-100 mt-12' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Los Cabos - Reservations */}
            <div className="bg-white rounded-sm shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                  {t('cabos.title')}
                </h3>
                <p className="text-sm text-[#C8A882] uppercase tracking-wide">
                  {t('cabos.location')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('phoneLabel')}
                    </p>
                    <a 
                      href="tel:+526241455400" 
                      className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light"
                    >
                      +52 (624) 145-5400
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('emailLabel')}
                    </p>
                    <a 
                      href="mailto:info@pueblobonito.com" 
                      className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light"
                    >
                      info@pueblobonito.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mazatlán - Reservations */}
            <div className="bg-white rounded-sm shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                  {t('mazatlan.title')}
                </h3>
                <p className="text-sm text-[#C8A882] uppercase tracking-wide">
                  {t('mazatlan.location')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('phoneLabel')}
                    </p>
                    <a 
                      href="tel:+526699898900" 
                      className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light"
                    >
                      +52 (669) 989-8900
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('emailLabel')}
                    </p>
                    <a 
                      href="mailto:info@pueblobonito.com" 
                      className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light"
                    >
                      info@pueblobonito.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-light">
              {t('hours')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
