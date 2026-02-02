'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { signOut } from '@/features/auth/actions/authActions';
import { useState } from 'react';

type Admin = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  team: string;
};

export default function AdminHeader({ admin }: { admin: Admin }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Get current team filter from URL or default to admin's team
  const currentTeam = searchParams?.get('team') || admin.team;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await signOut();
    if (result.success) {
      router.push('/es/admin/login');
      router.refresh();
    } else {
      setIsLoggingOut(false);
      alert('Error al cerrar sesión');
    }
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      super_admin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700' },
      team_admin: { label: 'Team Admin', color: 'bg-blue-100 text-blue-700' },
      sales_rep: { label: 'Sales Rep', color: 'bg-green-100 text-green-700' },
    };
    return badges[role as keyof typeof badges] || badges.sales_rep;
  };

  const getTeamBadge = (team: string) => {
    const badges = {
      'Los Cabos': { label: 'Los Cabos', color: 'bg-amber-100 text-amber-700' },
      'Mazatlán': { label: 'Mazatlán', color: 'bg-teal-100 text-teal-700' },
      'Both': { label: 'Ambos Equipos', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[team as keyof typeof badges] || badges.Both;
  };

  const roleBadge = getRoleBadge(admin.role);
  const teamBadge = getTeamBadge(currentTeam);

  const handleTeamChange = (team: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (team === admin.team) {
      params.delete('team');
    } else {
      params.set('team', team);
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-light text-[#1A2332]">
                Pueblo Bonito
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A882]">
                Admin Portal
              </p>
            </div>

            {/* Team Filter (only for super_admin) */}
            {admin.role === 'super_admin' && (
              <div className="flex items-center gap-2 pl-6 border-l border-gray-200">
                <span className="text-xs text-gray-500 font-medium">Equipo:</span>
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleTeamChange('Both')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                      currentTeam === 'Both'
                        ? 'bg-white text-[#C8A882] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Ambos
                  </button>
                  <button
                    onClick={() => handleTeamChange('Los Cabos')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                      currentTeam === 'Los Cabos'
                        ? 'bg-white text-[#C8A882] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Cabos
                  </button>
                  <button
                    onClick={() => handleTeamChange('Mazatlán')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                      currentTeam === 'Mazatlán'
                        ? 'bg-white text-[#C8A882] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mazatlán
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Admin Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium text-gray-900">
                {admin.first_name} {admin.last_name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${teamBadge.color}`}>
                  {teamBadge.label}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
