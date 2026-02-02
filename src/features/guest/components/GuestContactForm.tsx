'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitGuestInquiry } from '../actions/guestActions';

export default function GuestContactForm() {
  const t = useTranslations('guest.contactForm');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+52');
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!consent) {
      setError('Por favor acepta recibir comunicaciones');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const phoneNumber = formData.get('phone') as string;
    const fullPhone = `${countryCode}${phoneNumber}`;
    
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: fullPhone,
      destination: formData.get('destination') as string,
      preferredDates: formData.get('preferredDates') as string,
      comments: formData.get('comments') as string,
    };

    const result = await submitGuestInquiry(data);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <section id="contact-form" className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3342]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-light text-[#1A2332] mb-4">
              {t('successTitle')}
            </h3>
            <p className="text-gray-600 font-light text-lg">
              {t('successMessage')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3342]">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-light text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl font-light text-white/90">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  {t('firstName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">
                  {t('lastName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                {t('email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                {t('phone')} <span className="text-red-500">*</span>
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
                </select>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                {t('preferredDestination')} <span className="text-red-500">*</span>
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
                {t('preferredDates')}
              </label>
              <input
                type="text"
                name="preferredDates"
                placeholder="Ej: Mayo 2026"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                {t('comments')}
              </label>
              <textarea
                name="comments"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 mr-3"
              />
              <label className="text-sm font-light text-gray-600">
                {t('consent')} <span className="text-red-500">*</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? t('submitting') : t('submitButton')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
