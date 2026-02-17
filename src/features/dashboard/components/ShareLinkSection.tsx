'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ShareLinkSectionProps {
  shareUrl: string;
  clicks: number;
  referrals: number;
}

export default function ShareLinkSection({ shareUrl, clicks, referrals }: ShareLinkSectionProps) {
  const t = useTranslations('shareLink');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
      <h2 className="text-xl font-serif font-light text-[#1A2332] mb-2">
        {t('title')}
      </h2>
      <p className="text-sm text-gray-500 font-light mb-4">
        {t('description')}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 px-4 py-3 bg-[#F8F6F3] border border-[#C8A882]/20 rounded-lg text-sm text-[#1A2332] font-mono"
        />
        <button
          onClick={handleCopy}
          className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-[#C8A882] text-white hover:bg-[#B89872]'
          }`}
        >
          {copied ? t('copied') : t('copyButton')}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F8F6F3] rounded-lg p-4 text-center">
          <p className="text-2xl font-serif text-[#1A2332]">{clicks}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{t('clicks')}</p>
        </div>
        <div className="bg-[#F8F6F3] rounded-lg p-4 text-center">
          <p className="text-2xl font-serif text-[#1A2332]">{referrals}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{t('referrals')}</p>
        </div>
      </div>
    </div>
  );
}
