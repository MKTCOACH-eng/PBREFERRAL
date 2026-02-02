'use client';

import { useState } from 'react';
import ReferralDetailModal from './ReferralDetailModal';

type Referral = {
  id: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  destination: string;
  status: string;
  created_at: string;
  guest_viewed_at: string | null;
  guest_accepted_at: string | null;
  updated_at: string;
  owners: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
};

export default function ReferralsTable({ referrals }: { referrals: Referral[] }) {
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { label: string; color: string } } = {
      pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' },
      contacted: { label: 'Contactado', color: 'bg-blue-100 text-blue-700' },
      interested: { label: 'Interesado', color: 'bg-indigo-100 text-indigo-700' },
      won: { label: 'Ganado', color: 'bg-green-100 text-green-700' },
      lost: { label: 'Perdido', color: 'bg-red-100 text-red-700' },
    };
    return badges[status] || badges.pending;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {referrals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron referidos
                  </td>
                </tr>
              ) : (
                referrals.map((referral) => {
                  const badge = getStatusBadge(referral.status);
                  return (
                    <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {referral.guest_first_name} {referral.guest_last_name}
                          </p>
                          <p className="text-sm text-gray-500">{referral.guest_email}</p>
                          <p className="text-xs text-gray-400">{referral.guest_phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {referral.owners ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {referral.owners.first_name} {referral.owners.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{referral.owners.email}</p>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400">N/A</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          referral.destination === 'Los Cabos'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-teal-100 text-teal-700'
                        }`}>
                          {referral.destination}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {formatDate(referral.created_at)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {referral.guest_viewed_at ? (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-green-600">Visto</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">No visto</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedReferral(referral)}
                          className="text-sm text-[#C8A882] hover:text-[#B89872] font-medium"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral Detail Modal */}
      {selectedReferral && (
        <ReferralDetailModal
          referralId={selectedReferral.id}
          onClose={() => setSelectedReferral(null)}
        />
      )}
    </>
  );
}
