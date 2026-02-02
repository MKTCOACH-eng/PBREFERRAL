'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createReferral } from '@/features/auth/actions/authActions';

export default function NewReferralForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+52');
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('referrals.form');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const phoneNumber = formData.get('guestPhone') as string;
    const fullPhone = `${countryCode}${phoneNumber}`;
    
    const data = {
      guestFirstName: formData.get('guestFirstName') as string,
      guestLastName: formData.get('guestLastName') as string,
      guestEmail: formData.get('guestEmail') as string,
      guestPhone: fullPhone,
      destination: formData.get('destination') as string,
      specialRequests: formData.get('specialRequests') as string,
    };

    const result = await createReferral(data);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
      const locale = pathname?.split('/')[1] || 'es';
      setTimeout(() => router.push(`/${locale}/dashboard/referrals`), 2000);
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-light text-gray-900 mb-2">
            {t('successTitle')}
          </h2>
          <p className="text-gray-600 font-light">
            {t('successMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-700 mb-2">
              {t('guestFirstName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guestFirstName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
              placeholder={t('firstNamePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2">
              {t('guestLastName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guestLastName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
              placeholder={t('lastNamePlaceholder')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            {t('guestEmail')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="guestEmail"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
            placeholder={t('emailPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            {t('guestPhone')} <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-32 px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent text-sm font-light"
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+52">🇲🇽 +52</option>
              <option value="+1">🇨🇦 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+39">🇮🇹 +39</option>
            </select>
            <input
              type="tel"
              name="guestPhone"
              required
              placeholder={t('phonePlaceholder')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            {t('destination')} <span className="text-red-500">*</span>
          </label>
          <select
            name="destination"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
          >
            <option value="">{t('selectDestination')}</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Mazatlán">Mazatlán</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            {t('specialRequests')}
          </label>
          <textarea
            name="specialRequests"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
            placeholder={t('specialRequestsPlaceholder')}
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? t('submitting') : t('submitButton')}
          </button>
        </div>
      </form>
    </div>
  );
}
