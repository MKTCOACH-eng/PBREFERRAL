'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signOut } from '@/features/auth/actions/authActions';
import { useState } from 'react';

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('dashboard.nav');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Extract locale from pathname
  const locale = pathname?.split('/')[1] || 'es';

  const navItems = [
    { href: `/${locale}/dashboard`, label: t('overview') },
    { href: `/${locale}/dashboard/referrals/new`, label: t('newReferral') },
    { href: `/${locale}/dashboard/referrals`, label: t('myReferrals') },
    { href: `/${locale}/dashboard/rewards`, label: t('myRewards') },
    { href: `/${locale}/dashboard/account`, label: t('myAccount') },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await signOut();
    if (result.success) {
      router.push(`/${locale}/homeowner`);
    } else {
      setIsLoggingOut(false);
      alert('Error al cerrar sesión');
    }
  };

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
        
        {/* Logout Button */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full px-4 py-3 rounded-lg transition-all font-light text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </button>
        </div>
      </div>
    </nav>
  );
}
