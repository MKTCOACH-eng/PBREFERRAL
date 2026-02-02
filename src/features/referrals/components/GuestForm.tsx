'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { submitGuestReferral } from '@/features/referrals/services/referralService';
import type { Destination } from '@/shared/types/database.types';

interface GuestFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  destination: Destination;
  consentTransactional: boolean;
  consentMarketing: boolean;
}

export default function GuestForm() {
  const t = useTranslations('homeguest.form');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState<GuestFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    destination: 'los_cabos',
    consentTransactional: false,
    consentMarketing: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentTransactional) {
      setMessage({ 
        type: 'error', 
        text: 'You must consent to receive transactional communications.' 
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await submitGuestReferral({
        ...formData,
        shareToken: token || undefined,
      });
      
      setMessage({ type: 'success', text: t('successMessage') });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        destination: 'los_cabos',
        consentTransactional: false,
        consentMarketing: false,
      });
    } catch (error) {
      setMessage({ type: 'error', text: t('errorMessage') });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section id="guest-form-section" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Complete the form below to begin your exclusive experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('firstNameLabel')} *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('firstNamePlaceholder')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('lastNameLabel')} *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('lastNamePlaceholder')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('phoneLabel')} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('phonePlaceholder')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('emailLabel')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('emailPlaceholder')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                {t('destinationLabel')} *
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="los_cabos">{t('destinationLosCabos')}</option>
                <option value="mazatlan">{t('destinationMazatlan')}</option>
              </select>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consentTransactional"
                  name="consentTransactional"
                  checked={formData.consentTransactional}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="consentTransactional" className="ml-3 text-sm text-gray-700">
                  {t('consentTransactional')} *
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consentMarketing"
                  name="consentMarketing"
                  checked={formData.consentMarketing}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="consentMarketing" className="ml-3 text-sm text-gray-700">
                  {t('consentMarketing')}
                </label>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                t('submitButton')
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
