'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitGuestReferral } from '@/features/guest/actions/guestActions';

interface GuestRegistrationFormProps {
  ownerToken: string | null;
  ownerEmail: string | null;
}

export default function GuestRegistrationForm({
  ownerToken,
  ownerEmail,
}: GuestRegistrationFormProps) {
  const t = useTranslations('homeguest.form');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      destination: formData.get('destination') as string,
      consentTransactional: formData.get('consentTransactional') === 'on',
      consentMarketing: formData.get('consentMarketing') === 'on',
      ownerToken: ownerToken || undefined,
      ownerEmail: ownerEmail || undefined,
    };

    try {
      const result = await submitGuestReferral(data);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <section id="guest-registration-form" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#1A2332] mb-4">{t('successMessage')}</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="guest-registration-form" className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif text-[#1A2332] text-center mb-8">
          {t('title')}
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
                {t('firstNameLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                placeholder={t('firstNamePlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('lastNameLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                placeholder={t('lastNamePlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('phoneLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder={t('phonePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('emailLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('destinationLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              name="destination"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            >
              <option value="">{t('destinationLabel')}</option>
              <option value="los_cabos">{t('destinationLosCabos')}</option>
              <option value="mazatlan">{t('destinationMazatlan')}</option>
            </select>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consentTransactional"
                required
                className="mt-1 h-4 w-4 text-[#C8A882] border-gray-300 rounded focus:ring-[#C8A882]"
              />
              <span className="text-sm text-gray-600">{t('consentTransactional')}</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consentMarketing"
                className="mt-1 h-4 w-4 text-[#C8A882] border-gray-300 rounded focus:ring-[#C8A882]"
              />
              <span className="text-sm text-gray-600">{t('consentMarketing')}</span>
            </label>
          </div>

          {/* Hidden fields */}
          {ownerToken && <input type="hidden" name="ownerToken" value={ownerToken} />}
          {ownerEmail && <input type="hidden" name="ownerEmail" value={ownerEmail} />}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#C8A882] text-white font-medium text-lg rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? '...' : t('submitButton')}
          </button>
        </form>
      </div>
    </section>
  );
}
