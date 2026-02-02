'use client';

import { useEffect, useState } from 'react';
import { getOwnerDetail } from '@/features/admin/actions/adminActions';

type OwnerDetail = {
  owner: any;
  referrals: any[];
  rewards: any[];
};

export default function OwnerDetailModal({
  ownerId,
  onClose,
}: {
  ownerId: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<OwnerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getOwnerDetail(ownerId);

      if (result.error || !result.owner) {
        setError(result.error || 'Error al cargar detalle');
        setIsLoading(false);
        return;
      }

      setData({
        owner: result.owner,
        referrals: result.referrals || [],
        rewards: result.rewards || [],
      });
      setIsLoading(false);
    };

    fetchData();
  }, [ownerId]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[#1A2332]">
              Detalle del Propietario
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Cargando...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : data ? (
            <div className="space-y-8">
              {/* Owner Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-serif font-light text-[#1A2332] mb-4">
                  Información Personal
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nombre:</p>
                    <p className="font-medium text-gray-900">
                      {data.owner.first_name} {data.owner.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium text-gray-900">{data.owner.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teléfono:</p>
                    <p className="font-medium text-gray-900">{data.owner.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Destino Preferido:</p>
                    <p className="font-medium text-gray-900">{data.owner.preferred_destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fecha de Registro:</p>
                    <p className="font-medium text-gray-900">{formatDate(data.owner.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Estado:</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      data.owner.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {data.owner.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-blue-700">{data.owner.total_referrals}</p>
                  <p className="text-xs text-gray-600 mt-1">Referidos Totales</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-green-700">{data.owner.successful_referrals}</p>
                  <p className="text-xs text-gray-600 mt-1">Referidos Ganados</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-amber-700">
                    ${data.owner.total_rewards_earned.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Recompensas USD</p>
                </div>
              </div>

              {/* Referrals History */}
              <div>
                <h3 className="text-lg font-serif font-light text-[#1A2332] mb-4">
                  Historial de Referidos ({data.referrals.length})
                </h3>
                {data.referrals.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No hay referidos creados</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.referrals.map((referral: any) => {
                      const badge = getStatusBadge(referral.status);
                      return (
                        <div
                          key={referral.id}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {referral.guest_first_name} {referral.guest_last_name}
                              </p>
                              <p className="text-sm text-gray-600">{referral.guest_email}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {referral.destination} • {formatDate(referral.created_at)}
                              </p>
                            </div>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Rewards History */}
              <div>
                <h3 className="text-lg font-serif font-light text-[#1A2332] mb-4">
                  Historial de Recompensas ({data.rewards.length})
                </h3>
                {data.rewards.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No hay recompensas registradas</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.rewards.map((reward: any) => (
                      <div
                        key={reward.id}
                        className="bg-green-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {reward.description || 'Recompensa por referido exitoso'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(reward.created_at)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-700">
                              ${reward.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">{reward.currency}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
