'use client';

import { useTranslations } from 'next-intl';

export default function RequirementsSection() {
  const t = useTranslations('homeowner.requirements');

  return (
    <section id="requirements-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {t('subtitle')}
          </p>

          <div className="space-y-4 mb-8">
            <RequirementItem icon="✓" text={t('ageRequirement')} />
            <RequirementItem icon="✓" text={t('marriedRequirement')} />
            <RequirementItem icon="✓" text={t('presentationRequirement')} />
            <RequirementItem icon="✓" text={t('idRequirement')} />
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">{t('validForTitle')}</h3>
            <p className="text-gray-700">{t('validFor')}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3">{t('notValidTitle')}</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('notValidSingleMen')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('offerValidity')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('reservations')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('bookEarly')}</span>
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
    <div className="flex items-start">
      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
        {icon}
      </span>
      <p className="text-gray-700 flex-1">{text}</p>
    </div>
  );
}
