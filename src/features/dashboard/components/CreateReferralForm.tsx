'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createReferral } from '../actions/referralActions';

export default function CreateReferralForm() {
  const t = useTranslations('referrals.create');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createReferral(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard/referrals');
        }, 2000);
      }
    } catch (err) {
      setError(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
          {t('successMessage')}
        </h2>
        <p className="text-[#1A2332]/70 font-light">
          Redirecting to your referrals...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
          {t('title')}
        </h1>
        <p className="text-[#1A2332]/70 font-light">
          Share your guest's information to start the referral process
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Guest Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="guest_first_name" className="block text-sm font-medium text-[#1A2332] mb-2">
              {t('guestFirstName')} *
            </label>
            <input
              type="text"
              id="guest_first_name"
              name="guest_first_name"
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="guest_last_name" className="block text-sm font-medium text-[#1A2332] mb-2">
              {t('guestLastName')} *
            </label>
            <input
              type="text"
              id="guest_last_name"
              name="guest_last_name"
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="guest_email" className="block text-sm font-medium text-[#1A2332] mb-2">
              {t('guestEmail')} *
            </label>
            <input
              type="email"
              id="guest_email"
              name="guest_email"
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label htmlFor="guest_phone" className="block text-sm font-medium text-[#1A2332] mb-2">
              {t('guestPhone')} *
            </label>
            <input
              type="tel"
              id="guest_phone"
              name="guest_phone"
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-[#1A2332] mb-2">
            {t('destination')} *
          </label>
          <select
            id="destination"
            name="destination"
            required
            className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          >
            <option value="">Select destination...</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Mazatlán">Mazatlán</option>
          </select>
        </div>

        {/* Consent Reminder */}
        <div className="bg-[#C8A882]/5 border border-[#C8A882]/20 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-[#C8A882] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-[#1A2332]/80 font-light">
              {t('consentReminder')}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-[#C8A882]/30 text-[#1A2332] rounded-lg hover:bg-[#C8A882]/5 transition-all font-light"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#C8A882] text-white rounded-lg hover:bg-[#A88B5F] transition-all font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : t('submitButton')}
          </button>
        </div>
      </form>
    </div>
  );
}
