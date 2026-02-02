'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function OwnersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'all');
  const [status, setStatus] = useState(searchParams.get('status') || 'all');

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (destination !== 'all') params.set('destination', destination);
    if (status !== 'all') params.set('status', status);

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    // Use current pathname instead of hardcoded route
    router.push(`${pathname}${newUrl}`);
  }, [search, destination, status, router, pathname]);

  const handleReset = () => {
    setSearch('');
    setDestination('all');
    setStatus('all');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent"
          />
        </div>

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
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {(search || destination !== 'all' || status !== 'all') && (
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="text-sm text-[#C8A882] hover:text-[#B89872] font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
