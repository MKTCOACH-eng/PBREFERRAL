'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function DashboardNav() {
  const pathname = usePathname();
  const t = useTranslations('dashboard.nav');

  const navItems = [
    { href: '/dashboard', label: t('overview'), icon: '📊' },
    { href: '/dashboard/referrals/new', label: t('newReferral'), icon: '➕' },
    { href: '/dashboard/referrals', label: t('myReferrals'), icon: '👥' },
    { href: '/dashboard/rewards', label: t('myRewards'), icon: '🎁' },
    { href: '/dashboard/account', label: t('myAccount'), icon: '⚙️' },
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#C8A882] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
