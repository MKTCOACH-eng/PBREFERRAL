'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function ProspectsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams?.get('search') || '');
  const [destination, setDestination] = useState(searchParams?.get('destination') || 'all');
  const [status, setStatus] = useState(searchParams?.get('status') || 'all');
  const [source, setSource] = useState(searchParams?.get('source') || 'all');

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    if (search) params.set('search', search);
    else params.delete('search');

    if (destination !== 'all') params.set('destination', destination);
    else params.delete('destination');

    if (status !== 'all') params.set('status', status);
    else params.delete('status');

    if (source !== 'all') params.set('source', source);
    else params.delete('source');

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(`${pathname}${newUrl}`);
  }, [search, destination, status, source, router, pathname, searchParams]);

  const handleClearFilters = () => {
    setSearch('');
    setDestination('all');
    setStatus('all');
    setSource('all');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-light text-gray-700 mb-2">
            Buscar Prospecto
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, email o teléfono..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent text-sm"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            Destino
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent text-sm"
          >
            <option value="all">Todos</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Mazatlán">Mazatlán</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent text-sm"
          >
            <option value="all">Todos</option>
            <option value="new">Nuevo</option>
            <option value="contacted">Contactado</option>
            <option value="interested">Interesado</option>
            <option value="won">Ganado</option>
            <option value="lost">Perdido</option>
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">
            Origen
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent text-sm"
          >
            <option value="all">Todos</option>
            <option value="referral">Referido</option>
            <option value="direct">Directo</option>
            <option value="pipedrive">Pipedrive</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(search || destination !== 'all' || status !== 'all' || source !== 'all') && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-[#C8A882] font-light"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
