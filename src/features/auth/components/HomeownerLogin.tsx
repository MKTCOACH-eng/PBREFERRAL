'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { sendMagicLink } from '@/features/auth/services/authService';

export default function HomeownerLogin() {
  const t = useTranslations('homeowner.login');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await sendMagicLink(email);
      setMessage({ type: 'success', text: t('successMessage') });
      setEmail('');
    } catch (error) {
      setMessage({ type: 'error', text: t('errorMessage') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F6F3]">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-2xl p-10 sm:p-12 border-t-4 border-[#C8A882]">
          {/* Title with Pueblo Bonito styling */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#1A2332] mb-3">
              {t('title')}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#C8A882]"></div>
              <div className="w-1.5 h-1.5 bg-[#C8A882] rotate-45"></div>
              <div className="w-8 h-px bg-[#C8A882]"></div>
            </div>
            <p className="text-[#6B7280] text-sm font-light">
              Enter your email to receive a secure sign-in link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A2332] mb-3 uppercase tracking-wider">
                {t('emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                required
                className="w-full px-5 py-4 border-2 border-[#E5E7EB] rounded-none focus:ring-0 focus:border-[#C8A882] transition-all duration-300 text-[#1A2332] placeholder:text-[#9CA3AF]"
              />
            </div>

            {message && (
              <div
                className={`p-5 border-l-4 ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
                    : 'bg-red-50 text-red-800 border-red-500'
                }`}
              >
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-[#C8A882] text-[#1A2332] font-normal rounded-none hover:bg-[#A88B5F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg uppercase tracking-widest text-xs"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                t('sendMagicLink')
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#E5E7EB] text-center">
            <p className="text-sm text-[#6B7280] italic">
              New owner? The link will create your account automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
