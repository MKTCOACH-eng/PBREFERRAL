'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('common');

  // Close contact dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    }

    if (isContactOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isContactOpen]);

  return (
    <header className="bg-[#1A2332]/95 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg border-b border-[#C8A882]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <Image
                src="/Pueblo_Bonito_Beyond_Hospitality_RGB.png"
                alt="Pueblo Bonito"
                width={240}
                height={80}
                className="h-16 w-auto sm:h-20 brightness-0 invert"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <LanguageSwitcher />
            
            <div className="relative" ref={contactRef}>
              <button 
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="px-6 py-2 bg-[#C8A882] text-[#1A2332] text-sm font-medium uppercase tracking-wider hover:bg-[#A88B5F] transition-all duration-300"
              >
                {t('contact')}
              </button>

              {/* Contact Info Dropdown */}
              {isContactOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white text-[#1A2332] shadow-2xl border border-[#C8A882]/20 z-50">
            <div className="p-6">
              <h3 className="text-lg font-serif font-semibold text-[#1A2332] mb-4 border-b border-[#C8A882]/30 pb-2">
                {t('contact')}
              </h3>
              
              {/* Los Cabos */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#C8A882] uppercase tracking-wider mb-2">
                  Los Cabos
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">U.S.:</span>
                    <a href="tel:+18552877690" className="hover:text-[#C8A882] transition-colors">
                      +1-855-287-7690
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">México:</span>
                    <a href="tel:+526241430876" className="hover:text-[#C8A882] transition-colors">
                      +52 (624) 143-0876
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <a href="mailto:referral.program.cabo@pueblobonito.com" className="hover:text-[#C8A882] transition-colors">
                      referral.program.cabo@pueblobonito.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Mazatlán */}
              <div>
                <h4 className="text-sm font-semibold text-[#C8A882] uppercase tracking-wider mb-2">
                  Mazatlán
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <a href="tel:+526699164096" className="hover:text-[#C8A882] transition-colors">
                      +52 (669) 916-4096
                    </a>
                    <span className="text-gray-500">o ext. 4197</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <a href="mailto:referral.program.mazatlan@pueblobonito.com" className="hover:text-[#C8A882] transition-colors">
                      referral.program.mazatlan@pueblobonito.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <LanguageSwitcher />
              
              {/* Contact Info for Mobile */}
              <div className="bg-white/10 p-4 rounded">
                <h3 className="text-sm font-semibold text-[#C8A882] uppercase tracking-wider mb-3">
                  {t('contact')}
                </h3>
                
                {/* Los Cabos */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-white uppercase mb-2">
                    Los Cabos
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="text-white/70">U.S.:</span>{' '}
                      <a href="tel:+18552877690" className="hover:text-[#C8A882]">
                        +1-855-287-7690
                      </a>
                    </p>
                    <p>
                      <span className="text-white/70">México:</span>{' '}
                      <a href="tel:+526241430876" className="hover:text-[#C8A882]">
                        +52 (624) 143-0876
                      </a>
                    </p>
                    <p className="break-all">
                      <a href="mailto:referral.program.cabo@pueblobonito.com" className="hover:text-[#C8A882]">
                        referral.program.cabo@pueblobonito.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Mazatlán */}
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase mb-2">
                    Mazatlán
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="text-white/70">Phone:</span>{' '}
                      <a href="tel:+526699164096" className="hover:text-[#C8A882]">
                        +52 (669) 916-4096
                      </a>
                      <span className="text-white/50"> o ext. 4197</span>
                    </p>
                    <p className="break-all">
                      <a href="mailto:referral.program.mazatlan@pueblobonito.com" className="hover:text-[#C8A882]">
                        referral.program.mazatlan@pueblobonito.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
