'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function VouchersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [destination, setDestination] = useState(searchParams.get('destination') || 'all');
  const [status, setStatus] = useState(searchParams.get('status') || 'all');

  useEffect(() => {
    const params = new URLSearchParams();
    if (destination !== 'all') params.set('destination', destination);
    if (status !== 'all') params.set('status', status);

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    // Use current pathname instead of hardcoded route
    router.push(`${pathname}${newUrl}`);
  }, [destination, status, router, pathname]);

  const handleReset = () => {
    setDestination('all');
    setStatus('all');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Destination Filter */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            Destino
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Mazatlán">Mazatlán</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="redeemed">Canjeados</option>
            <option value="expired">Expirados</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          {(destination !== 'all' || status !== 'all') && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-[#C8A882] hover:text-[#B89872] font-medium border border-[#C8A882] rounded-lg hover:bg-[#C8A882]/5 transition-all"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
