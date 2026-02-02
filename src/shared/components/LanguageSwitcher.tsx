'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('es')}
        className={`text-sm font-light tracking-wide transition-colors ${
          locale === 'es'
            ? 'text-[#C8A882] font-medium'
            : 'text-white/70 hover:text-white'
        }`}
      >
        ES
      </button>
      <span className="text-white/50">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`text-sm font-light tracking-wide transition-colors ${
          locale === 'en'
            ? 'text-[#C8A882] font-medium'
            : 'text-white/70 hover:text-white'
        }`}
      >
        English
      </button>
    </div>
  );
}
