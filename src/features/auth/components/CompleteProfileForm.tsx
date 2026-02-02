'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { completeOwnerProfile } from '../actions/authActions';
import { createClient } from '@/lib/supabase/client';

export default function CompleteProfileForm() {
  const t = useTranslations('homeowner.enrollment');
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    // Load user metadata if available
    const loadUserData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata) {
        setFormData({
          firstName: user.user_metadata.first_name || '',
          lastName: user.user_metadata.last_name || '',
          phone: user.user_metadata.phone || '',
        });
      }
    };
    
    loadUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formDataToSend = new FormData(e.currentTarget);
    
    try {
      const result = await completeOwnerProfile(formDataToSend);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to dashboard with locale
        const locale = pathname?.split('/')[1] || 'es';
        router.push(`/${locale}/dashboard`);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-[#C8A882]/20 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-light text-[#1A2332] mb-2">
          Complete Your Profile
        </h1>
        <p className="text-[#1A2332]/70 font-light">
          Welcome! Please complete your profile to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-[#1A2332] mb-2">
            {t('firstNameLabel')} *
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-[#1A2332] mb-2">
            {t('lastNameLabel')} *
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            placeholder="Doe"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#1A2332] mb-2">
            {t('phoneLabel')} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Preferred Destination (Optional) */}
        <div>
          <label htmlFor="preferred_destination" className="block text-sm font-medium text-[#1A2332] mb-2">
            Preferred Destination (Optional)
          </label>
          <select
            id="preferred_destination"
            name="preferred_destination"
            className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          >
            <option value="">Select a destination...</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Mazatlán">Mazatlán</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-[#C8A882] text-white rounded-lg hover:bg-[#A88B5F] transition-all font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Profile...' : t('submitButton')}
        </button>
      </form>
    </div>
  );
}
