'use client';

import { useTranslations } from 'next-intl';

export default function RewardHighlight() {
  const t = useTranslations('homeowner');

  return (
    <section className="py-16 bg-gradient-to-br from-[#C8A882] to-[#A88B5F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Earn $200 USD
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light mb-6 text-white/90">
            Food & Beverage Credit
          </p>

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg font-light leading-relaxed text-white/90 mb-8">
              For every referral that becomes a Pueblo Bonito Owner, you'll receive a <strong className="font-medium">$200 USD credit</strong> to enjoy at any of our resort restaurants and bars. Share the experience, earn rewards, and create more memories at Pueblo Bonito.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-white/40"></div>
              <div className="w-2 h-2 bg-white/40 rotate-45"></div>
              <div className="w-12 h-px bg-white/40"></div>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-serif mb-2">1</div>
                <p className="text-sm font-light">Refer friends & family</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-serif mb-2">2</div>
                <p className="text-sm font-light">They become owners</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-serif mb-2">3</div>
                <p className="text-sm font-light">You earn $200 F&B credit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
