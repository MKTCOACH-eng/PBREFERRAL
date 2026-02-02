'use client';

import { useState } from 'react';
import PuebloBonitoLogo from './PuebloBonitoLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('common');

  return (
    <header className="bg-[#1A2332] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <div className="flex items-center gap-3">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#C8A882] rounded-full"></div>
                  </div>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-2 bg-[#C8A882] top-0 left-1/2 origin-bottom"
                      style={{
                        transform: `translateX(-50%) rotate(${i * 45}deg)`,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-base font-light tracking-[0.2em] uppercase">
                  Pueblo Bonito
                </span>
              </div>
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
