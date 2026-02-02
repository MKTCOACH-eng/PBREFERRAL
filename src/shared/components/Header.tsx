'use client';

import { useState } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('common');

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
                className="h-16 w-auto sm:h-20"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <LanguageSwitcher />
            
            <a
              href="tel:800-966-0606"
              className="text-sm font-light hover:text-[#C8A882] transition-colors"
            >
              800-966-0606
            </a>
            
            <button className="px-6 py-2 bg-[#C8A882] text-[#1A2332] text-sm font-medium uppercase tracking-wider hover:bg-[#A88B5F] transition-all duration-300">
              {t('contact')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <LanguageSwitcher />
              <a
                href="tel:800-966-0606"
                className="text-sm font-light hover:text-[#C8A882] transition-colors"
              >
                800-966-0606
              </a>
              <button className="px-6 py-2 bg-[#C8A882] text-[#1A2332] text-sm font-medium uppercase tracking-wider hover:bg-[#A88B5F] transition-all duration-300 w-full">
                {t('contact')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
