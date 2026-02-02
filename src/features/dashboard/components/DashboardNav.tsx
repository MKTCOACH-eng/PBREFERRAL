'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function DashboardNav() {
  const pathname = usePathname();
  const t = useTranslations('dashboard.nav');

  const navItems = [
    { href: '/dashboard', label: t('overview') },
    { href: '/dashboard/referrals/new', label: t('newReferral') },
    { href: '/dashboard/referrals', label: t('myReferrals') },
    { href: '/dashboard/rewards', label: t('myRewards') },
    { href: '/dashboard/account', label: t('myAccount') },
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-serif text-gray-900">Panel de Control</h2>
      </div>
      <div className="p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition-all font-light ${
                  isActive
                    ? 'bg-[#C8A882] text-white'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#C8A882]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
