'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function GuestContact() {
  const t = useTranslations('guest.contact');
  const [showContacts, setShowContacts] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Elegant Card Container */}
        <div className="bg-gradient-to-br from-white to-[#F8F6F3] rounded-sm shadow-2xl border border-gray-100/50 overflow-hidden">
          {/* Header Section */}
          <div className="text-center px-8 py-16 relative">
            {/* Decorative top border */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent"></div>
            
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8A882] font-light mb-6">
              {t('eyebrow')}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A2332] mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto mb-10">
              {t('subtitle')}
            </p>

            {/* CTA Button - More Elegant */}
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#C8A882] text-white text-base font-light tracking-wide uppercase rounded-sm hover:bg-[#B89872] transition-all shadow-md hover:shadow-lg duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{t('ctaButton')}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 relative z-10 ${showContacts ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>

          {/* Contact Information - Slides down */}
          <div 
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              showContacts ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-8 pb-12">
              {/* Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {/* Los Cabos - Reservations */}
                <div className="group relative">
                  {/* Decorative corner accent */}
                  <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-[#C8A882]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-[#C8A882]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-sm border border-gray-100 hover:border-[#C8A882]/30 transition-all duration-300 hover:shadow-lg">
                    <div className="mb-6 pb-4 border-b border-gray-100">
                      <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                        {t('cabos.title')}
                      </h3>
                      <p className="text-xs text-[#C8A882] uppercase tracking-[0.2em]">
                        {t('cabos.location')}
                      </p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#C8A882]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5 font-light">
                            {t('phoneLabel')}
                          </p>
                          <a 
                            href="tel:+526241455400" 
                            className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light tracking-wide"
                          >
                            +52 (624) 145-5400
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#C8A882]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5 font-light">
                            {t('emailLabel')}
                          </p>
                          <a 
                            href="mailto:info@pueblobonito.com" 
                            className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light break-all"
                          >
                            info@pueblobonito.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mazatlán - Reservations */}
                <div className="group relative">
                  {/* Decorative corner accent */}
                  <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-[#C8A882]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-[#C8A882]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-sm border border-gray-100 hover:border-[#C8A882]/30 transition-all duration-300 hover:shadow-lg">
                    <div className="mb-6 pb-4 border-b border-gray-100">
                      <h3 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
                        {t('mazatlan.title')}
                      </h3>
                      <p className="text-xs text-[#C8A882] uppercase tracking-[0.2em]">
                        {t('mazatlan.location')}
                      </p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#C8A882]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5 font-light">
                            {t('phoneLabel')}
                          </p>
                          <a 
                            href="tel:+526699898900" 
                            className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light tracking-wide"
                          >
                            +52 (669) 989-8900
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#C8A882]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5 font-light">
                            {t('emailLabel')}
                          </p>
                          <a 
                            href="mailto:info@pueblobonito.com" 
                            className="text-lg text-[#1A2332] hover:text-[#C8A882] transition-colors font-light break-all"
                          >
                            info@pueblobonito.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#F8F6F3] rounded-full">
                  <svg className="w-4 h-4 text-[#C8A882]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600 font-light">
                    {t('hours')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
