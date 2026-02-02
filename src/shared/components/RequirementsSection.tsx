'use client';

import { useTranslations } from 'next-intl';

export default function RequirementsSection() {
  const t = useTranslations('homeowner.requirements');

  return (
    <section id="requirements-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Elegant Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#1A2332] mb-4">
            {t('title')}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-px bg-[#C8A882]"></div>
            <div className="w-1.5 h-1.5 bg-[#C8A882] rotate-45"></div>
            <div className="w-12 h-px bg-[#C8A882]"></div>
          </div>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-[#F8F6F3] shadow-xl p-10 sm:p-12 border-t-4 border-[#C8A882]">
          {/* Requirements Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <RequirementItem icon="✓" text={t('ageRequirement')} />
            <RequirementItem icon="✓" text={t('marriedRequirement')} />
            <RequirementItem icon="✓" text={t('presentationRequirement')} />
            <RequirementItem icon="✓" text={t('idRequirement')} />
          </div>

          {/* Valid For Section */}
          <div className="border-t-2 border-[#C8A882] pt-8 mb-8">
            <h3 className="text-xl font-serif font-semibold text-[#1A2332] mb-4 uppercase tracking-wider">
              {t('validForTitle')}
            </h3>
            <p className="text-[#2C3E50] leading-relaxed">{t('validFor')}</p>
          </div>

          {/* Important Notes */}
          <div className="bg-white border-l-4 border-[#C8A882] p-8 shadow-md">
            <h3 className="text-xl font-serif font-semibold text-[#1A2332] mb-5 uppercase tracking-wider">
              {t('notValidTitle')}
            </h3>
            <ul className="space-y-3 text-[#2C3E50]">
              <li className="flex items-start">
                <span className="text-[#C8A882] mr-3 text-xl">•</span>
                <span className="leading-relaxed">{t('notValidSingleMen')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C8A882] mr-3 text-xl">•</span>
                <span className="leading-relaxed">{t('offerValidity')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C8A882] mr-3 text-xl">•</span>
                <span className="leading-relaxed">{t('reservations')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C8A882] mr-3 text-xl">•</span>
                <span className="leading-relaxed">{t('bookEarly')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequirementItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start bg-white p-5 shadow-sm border-l-4 border-[#C8A882]">
      <span className="flex-shrink-0 w-8 h-8 bg-[#C8A882] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
        {icon}
      </span>
      <p className="text-[#2C3E50] flex-1 leading-relaxed pt-1">{text}</p>
    </div>
  );
}
