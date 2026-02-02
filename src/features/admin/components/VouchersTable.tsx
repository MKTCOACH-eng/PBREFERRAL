'use client';

import { useState } from 'react';
import VoucherQRModal from './VoucherQRModal';
import { redeemVoucher } from '@/features/admin/actions/adminActions';

type Voucher = {
  id: string;
  voucher_code: string;
  guest_name: string;
  guest_email: string;
  amount: number;
  currency: string;
  destination: string;
  status: string;
  expires_at: string;
  redeemed_at: string | null;
  redeemed_by: string | null;
  created_at: string;
  owners: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
};

export default function VouchersTable({ vouchers }: { vouchers: Voucher[] }) {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { label: string; color: string } } = {
      pending: { label: 'Pendiente', color: 'bg-amber-100 text-amber-700' },
      redeemed: { label: 'Canjeado', color: 'bg-green-100 text-green-700' },
      expired: { label: 'Expirado', color: 'bg-gray-100 text-gray-700' },
      cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700' },
    };
    return badges[status] || badges.pending;
  };

  const handleRedeem = async (voucherId: string) => {
    if (!confirm('¿Confirmar que este voucher fue canjeado?')) return;

    setIsRedeeming(voucherId);
    const result = await redeemVoucher(voucherId);

    if (result.error) {
      alert(`Error: ${result.error}`);
      setIsRedeeming(null);
      return;
    }

    alert('Voucher marcado como canjeado');
    window.location.reload();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expira
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vouchers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron vouchers
                  </td>
                </tr>
              ) : (
                vouchers.map((voucher) => {
                  const badge = getStatusBadge(voucher.status);
                  const isExpired = new Date(voucher.expires_at) < new Date();
                  
                  return (
                    <tr key={voucher.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-mono text-sm font-semibold text-gray-900">
                          {voucher.voucher_code}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{voucher.guest_name}</p>
                          <p className="text-sm text-gray-500">{voucher.guest_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {voucher.owners ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {voucher.owners.first_name} {voucher.owners.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{voucher.owners.email}</p>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400">N/A</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-green-600">
                          ${voucher.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">{voucher.currency}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          voucher.destination === 'Los Cabos'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-teal-100 text-teal-700'
                        }`}>
                          {voucher.destination}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
                          {badge.label}
                        </span>
                        {voucher.redeemed_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(voucher.redeemed_at)}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className={`text-sm ${isExpired ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          {formatDate(voucher.expires_at)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setSelectedVoucher(voucher)}
                            className="text-sm text-[#C8A882] hover:text-[#B89872] font-medium"
                          >
                            Ver QR
                          </button>
                          {voucher.status === 'pending' && !isExpired && (
                            <button
                              onClick={() => handleRedeem(voucher.id)}
                              disabled={isRedeeming === voucher.id}
                              className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                            >
                              {isRedeeming === voucher.id ? 'Canjeando...' : 'Canjear'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voucher QR Modal */}
      {selectedVoucher && (
        <VoucherQRModal
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </>
  );
}
