'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithFacebook } from '../actions/authActions';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const t = useTranslations('homeowner.auth');
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    destination: '',
    consentTransactional: false,
    consentMarketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    setIsSubmitting(true);
    setError('');

    try {
      const result = provider === 'google' 
        ? await signInWithGoogle()
        : await signInWithFacebook();
      
      if (result.error) {
        setError(result.error);
      }
      // Supabase will redirect automatically
    } catch (err) {
      setError(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (mode === 'signup') {
      // Validate consent
      if (!formData.consentTransactional) {
        setError(t('consentRequired'));
        setIsSubmitting(false);
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        setError(t('passwordMismatch'));
        setIsSubmitting(false);
        return;
      }

      try {
        const result = await signUpWithEmail({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          destination: formData.destination,
        });
        
        if (result.error) {
          setError(result.error);
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        setError(t('errorMessage'));
      }
    } else {
      // Sign in
      try {
        const result = await signInWithEmail(formData.email, formData.password);
        
        if (result.error) {
          setError(result.error);
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        setError(t('errorMessage'));
      }
    }

    setIsSubmitting(false);
  };

  return (
    <section id="auth-section" className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#1A2332] shadow-sm'
                : 'text-[#1A2332]/60 hover:text-[#1A2332]'
            }`}
          >
            {t('signUp')}
          </button>
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              mode === 'signin'
                ? 'bg-white text-[#1A2332] shadow-sm'
                : 'text-[#1A2332]/60 hover:text-[#1A2332]'
            }`}
          >
            {t('signIn')}
          </button>
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => handleSocialAuth('google')}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#C8A882] hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-[#1A2332] font-medium">{t('continueWithGoogle')}</span>
          </button>

          <button
            onClick={() => handleSocialAuth('facebook')}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#1565D8] transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-medium">{t('continueWithFacebook')}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[#1A2332]/60">{t('orContinueWith')}</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <>
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#1A2332] mb-2">
                    {t('firstName')} *
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
                    {t('lastName')} *
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
                  {t('phone')} *
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

              {/* Owner Destination */}
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-[#1A2332] mb-2">
                  {t('destination')} *
                </label>
                <select
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
                >
                  <option value="">{t('selectDestination')}</option>
                  <option value="los_cabos">Los Cabos</option>
                  <option value="mazatlan">Mazatlán</option>
                </select>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1A2332] mb-2">
              {t('email')} *
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1A2332] mb-2">
              {t('password')} *
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
            />
            {mode === 'signup' && (
              <p className="text-xs text-[#1A2332]/60 mt-1">{t('passwordHint')}</p>
            )}
          </div>

          {mode === 'signup' && (
            <>
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1A2332] mb-2">
                  {t('confirmPassword')} *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-[#C8A882]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
                />
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
                    {t('consentTransactional')} *
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
                    {t('consentMarketing')}
                  </label>
                </div>
              </div>

              {/* Privacy Policy & Terms */}
              <div className="text-xs text-[#1A2332]/60 text-center">
                {t('termsAgreement')}{' '}
                <a href="https://www.pueblobonito.com.mx/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="text-[#C8A882] hover:underline">
                  {t('privacyPolicy')}
                </a>
                {' '}{t('and')}{' '}
                <a href="https://www.pueblobonito.com.mx/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="text-[#C8A882] hover:underline">
                  {t('termsOfService')}
                </a>
              </div>
            </>
          )}

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
            {isSubmitting ? t('loading') : mode === 'signup' ? t('createAccount') : t('signInButton')}
          </button>

          {mode === 'signin' && (
            <div className="text-center">
              <a href="#" className="text-sm text-[#C8A882] hover:underline">
                {t('forgotPassword')}
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
