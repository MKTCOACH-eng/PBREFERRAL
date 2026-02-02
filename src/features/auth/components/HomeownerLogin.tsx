'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { sendMagicLink } from '../actions/authActions';

export default function HomeownerLogin() {
  const t = useTranslations('homeowner.login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    destination: '',
    consentTransactional: false,
    consentMarketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    // Validate consent
    if (!formData.consentTransactional) {
      setError('You must consent to receive transactional messages');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendMagicLink(
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.phone
      );
      
      if (result.error) {
        setError(t('errorMessage'));
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="login-section" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
            Check Your Email
          </h2>
          <p className="text-[#1A2332]/70 font-light">
            {t('successMessage')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="login-section" className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#1A2332] mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#1A2332] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1A2332] mb-2">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1A2332] mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
          </div>

          {/* Owner Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-[#1A2332] mb-2">
              Owner Destination *
            </label>
            <select
              id="destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            >
              <option value="">Select your destination...</option>
              <option value="los_cabos">Los Cabos</option>
              <option value="mazatlan">Mazatlán</option>
            </select>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="consentTransactional"
                checked={formData.consentTransactional}
                onChange={(e) => setFormData({ ...formData, consentTransactional: e.target.checked })}
                required
                className="mt-1 h-4 w-4 text-[#C8A882] focus:ring-[#C8A882] border-gray-300 rounded"
              />
              <label htmlFor="consentTransactional" className="ml-3 text-sm text-[#1A2332]/70">
                By checking this box, I consent to receive transactional messages related to my account, orders, or services I have requested. These messages may include appointment reminders, order confirmations, and other important updates. *
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="consentMarketing"
                checked={formData.consentMarketing}
                onChange={(e) => setFormData({ ...formData, consentMarketing: e.target.checked })}
                className="mt-1 h-4 w-4 text-[#C8A882] focus:ring-[#C8A882] border-gray-300 rounded"
              />
              <label htmlFor="consentMarketing" className="ml-3 text-sm text-[#1A2332]/70">
                By checking this box, I consent to receive marketing and promotional messages, including special offers, discounts, new product updates among others. Message frequency may vary. Message & Data rates may apply.
              </label>
            </div>
          </div>

          {/* Privacy Policy & Terms */}
          <div className="text-xs text-[#1A2332]/60 text-center">
            By submitting this form, you agree to our{' '}
            <a href="https://www.pueblobonito.com.mx/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="text-[#C8A882] hover:underline">
              Privacy Policy
            </a>
            {' '}and{' '}
            <a href="https://www.pueblobonito.com.mx/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="text-[#C8A882] hover:underline">
              Terms of Service
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Activate My Referral Program'}
          </button>
        </form>
      </div>
    </section>
  );
}
