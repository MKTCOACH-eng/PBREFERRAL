'use client';

import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import AuthModal from '@/features/auth/components/AuthModal';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('common');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#1A2332]/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://www.pueblobonito.com.mx/" target="_blank" rel="noopener noreferrer">
              <img 
                src="/logo.svg" 
                alt="Pueblo Bonito" 
                className="h-16 w-auto sm:h-20 md:h-24 brightness-0 invert"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Access Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {t('access')}
            </button>

            {/* Contact Dropdown */}
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="text-white hover:text-[#C8A882] transition-colors duration-200 font-light flex items-center space-x-1"
              >
                <span>{t('contact')}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#C8A882]/20 overflow-hidden">
                  <div className="p-6 space-y-4">
                    {/* Los Cabos */}
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="font-serif text-lg text-[#1A2332] mb-2">Los Cabos</h3>
                      <div className="space-y-1 text-sm text-[#1A2332]/70">
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          +52 (624) 142 9898
                        </p>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          referrals@pueblobonito.com
                        </p>
                      </div>
                    </div>

                    {/* Mazatlán */}
                    <div>
                      <h3 className="font-serif text-lg text-[#1A2332] mb-2">Mazatlán</h3>
                      <div className="space-y-1 text-sm text-[#1A2332]/70">
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          +52 (669) 989 8900
                        </p>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#C8A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          referrals@pueblobonito.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#C8A882] transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="space-y-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full px-4 py-2 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all"
              >
                {t('access')}
              </button>
              <div className="text-white">
                <p className="font-serif text-sm mb-2">Los Cabos</p>
                <p className="text-sm text-white/70">+52 (624) 142 9898</p>
                <p className="text-sm text-white/70">referrals@pueblobonito.com</p>
              </div>
              <div className="text-white">
                <p className="font-serif text-sm mb-2">Mazatlán</p>
                <p className="text-sm text-white/70">+52 (669) 989 8900</p>
                <p className="text-sm text-white/70">referrals@pueblobonito.com</p>
              </div>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
