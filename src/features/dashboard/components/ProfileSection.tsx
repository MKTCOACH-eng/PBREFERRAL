'use client';

import { useTranslations } from 'next-intl';
import { signOut } from '@/features/auth/actions/authActions';
import { useRouter } from 'next/navigation';

interface ProfileSectionProps {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const t = useTranslations('account');
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#C8A882]/20 p-6">
      <h2 className="text-xl font-serif font-light text-[#1A2332] mb-4">
        {t('profile')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {t('firstName')}
          </label>
          <p className="text-[#1A2332] font-light">{user.firstName || '—'}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {t('lastName')}
          </label>
          <p className="text-[#1A2332] font-light">{user.lastName || '—'}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {t('email')}
          </label>
          <p className="text-[#1A2332] font-light">{user.email}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {t('phone')}
          </label>
          <p className="text-[#1A2332] font-light">{user.phone || '—'}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleSignOut}
          className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
        >
          {t('signOut')}
        </button>
      </div>
    </div>
  );
}
