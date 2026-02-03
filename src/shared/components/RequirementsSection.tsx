'use client';

import { useTranslations } from 'next-intl';

export default function RequirementsSection() {
  const t = useTranslations('homeowner.requirements');

  return (
    <section id="requirements-section" className="py-16 bg-[#F8F6F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1A2332] mb-4">
            {t('title')}
          </h2>
        </div>

        {/* Requirements List */}
        <div className="bg-white rounded-lg shadow-lg border border-[#C8A882]/20 p-8 md:p-10">
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#1A2332] font-light">
                {t('ageRequirement')}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#1A2332] font-light">
                {t('marriedRequirement')}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#1A2332] font-light">
                {t('presentationRequirement')}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#1A2332] font-light">
                {t('idRequirement')}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#1A2332] font-light">
                {t('validFor')}
              </span>
            </li>
          </ul>

          {/* Important Notes */}
          <div className="border-t border-[#C8A882]/20 pt-8">
            <h3 className="text-xl font-serif font-light text-[#1A2332] mb-4">
              {t('notValidTitle')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-[#1A2332]/80 font-light text-sm">
                  {t('notValidSingleMen')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[#1A2332]/80 font-light text-sm">
                  {t('offerValidity')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[#1A2332]/80 font-light text-sm">
                  {t('reservations')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[#1A2332]/80 font-light text-sm">
                  {t('bookEarly')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
