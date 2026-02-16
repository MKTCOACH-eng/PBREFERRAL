'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createReferral } from '@/features/auth/actions/authActions';

export default function NewReferralForm() {
  const t = useTranslations('referrals');
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createReferral({
        guestFirstName: formData.get('guestFirstName') as string,
        guestLastName: formData.get('guestLastName') as string,
        guestEmail: formData.get('guestEmail') as string,
        guestPhone: formData.get('guestPhone') as string,
        destination: formData.get('destination') as string,
        consentTransactional: true,
        consentMarketing: formData.get('consentMarketing') === 'on',
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/${locale}/dashboard/referrals`);
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-green-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-[#1A2332] mb-2">{t('form.successTitle')}</h3>
        <p className="text-gray-600 font-light">{t('form.successMessage')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-8">
      <h2 className="text-2xl font-serif font-light text-[#1A2332] mb-6">
        {t('form.title')}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('form.guestFirstName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guestFirstName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('form.guestLastName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guestLastName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.guestEmail')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="guestEmail"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.guestPhone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="guestPhone"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.destination')} <span className="text-red-500">*</span>
          </label>
          <select
            name="destination"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          >
            <option value="">—</option>
            <option value="los_cabos">Los Cabos</option>
            <option value="mazatlan">Mazatlán</option>
          </select>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consentMarketing"
              className="mt-1 h-4 w-4 text-[#C8A882] border-gray-300 rounded focus:ring-[#C8A882]"
            />
            <span className="text-sm text-gray-600">
              {t('form.consentMarketing')}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#C8A882] text-white font-medium text-lg rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? '...' : t('form.submitButton')}
        </button>
      </form>
    </div>
  );
}
