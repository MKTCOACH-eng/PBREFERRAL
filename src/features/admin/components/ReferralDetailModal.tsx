'use client';

import { useState } from 'react';
import { updateReferralStatus } from '@/features/admin/actions/adminActions';

export default function ReferralDetailModal({
  referralId,
  onClose,
}: {
  referralId: string;
  onClose: () => void;
}) {
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateStatus = async () => {
    if (!newStatus) return;

    setIsUpdating(true);
    setError('');
    setSuccess('');

    const result = await updateReferralStatus(referralId, newStatus);

    if (result.error) {
      setError(result.error);
      setIsUpdating(false);
      return;
    }

    setSuccess('Estado actualizado correctamente');
    setIsUpdating(false);
    
    // Close after 1 second
    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 1000);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'contacted', label: 'Contactado', color: 'bg-blue-100 text-blue-700' },
    { value: 'interested', label: 'Interesado', color: 'bg-indigo-100 text-indigo-700' },
    { value: 'won', label: 'Ganado', color: 'bg-green-100 text-green-700' },
    { value: 'lost', label: 'Perdido', color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[#1A2332]">
              Actualizar Estado del Referido
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
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              ID: <span className="font-mono text-xs">{referralId}</span>
            </p>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Seleccionar nuevo estado:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setNewStatus(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      newStatus === option.value
                        ? 'border-[#C8A882] bg-[#C8A882]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${option.color}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleUpdateStatus}
                disabled={!newStatus || isUpdating}
                className="flex-1 px-6 py-3 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Actualizando...' : 'Actualizar Estado'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
