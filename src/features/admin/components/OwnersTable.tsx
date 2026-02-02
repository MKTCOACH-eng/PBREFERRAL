'use client';

import { useState } from 'react';
import OwnerDetailModal from './OwnerDetailModal';

type Owner = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  preferred_destination: string;
  status: string;
  total_referrals: number;
  successful_referrals: number;
  total_rewards_earned: number;
  created_at: string;
};

export default function OwnersTable({ owners }: { owners: Owner[] }) {
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSuccessRate = (successful: number, total: number) => {
    if (total === 0) return '0%';
    return `${((successful / total) * 100).toFixed(0)}%`;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propietario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Éxito
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recompensas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {owners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron propietarios
                  </td>
                </tr>
              ) : (
                owners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {owner.first_name} {owner.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{owner.email}</p>
                        <p className="text-xs text-gray-400">{owner.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        owner.preferred_destination === 'Los Cabos'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-teal-100 text-teal-700'
                      }`}>
                        {owner.preferred_destination}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {owner.total_referrals}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-green-600">
                          {owner.successful_referrals}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getSuccessRate(owner.successful_referrals, owner.total_referrals)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">
                        ${owner.total_rewards_earned.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">USD</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {formatDate(owner.created_at)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        owner.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {owner.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOwner(owner)}
                        className="text-sm text-[#C8A882] hover:text-[#B89872] font-medium"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Owner Detail Modal */}
      {selectedOwner && (
        <OwnerDetailModal
          ownerId={selectedOwner.id}
          onClose={() => setSelectedOwner(null)}
        />
      )}
    </>
  );
}
