'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReferralFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [status, setStatus] = useState(searchParams.get('status') || 'all');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (destination !== 'all') params.set('destination', destination);
    if (sortBy !== 'newest') params.set('sortBy', sortBy);
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [status, destination, sortBy, router]);

  const handleReset = () => {
    setStatus('all');
    setDestination('all');
    setSortBy('newest');
  };

  const hasActiveFilters = status !== 'all' || destination !== 'all' || sortBy !== 'newest';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-light text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="contacted">Contactado</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-light text-gray-700 mb-2">
            Destino
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
          >
            <option value="all">Todos los destinos</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Mazatlán">Mazatlán</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-light text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="name">Nombre (A-Z)</option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-[#C8A882] hover:text-[#B89872] font-light transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-light">
            <span>Filtros activos:</span>
            {status !== 'all' && (
              <span className="px-3 py-1 bg-[#C8A882] bg-opacity-10 text-[#C8A882] rounded-full">
                Estado: {status}
              </span>
            )}
            {destination !== 'all' && (
              <span className="px-3 py-1 bg-[#C8A882] bg-opacity-10 text-[#C8A882] rounded-full">
                Destino: {destination}
              </span>
            )}
            {sortBy !== 'newest' && (
              <span className="px-3 py-1 bg-[#C8A882] bg-opacity-10 text-[#C8A882] rounded-full">
                Orden: {sortBy === 'oldest' ? 'Más antiguos' : 'Nombre'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
