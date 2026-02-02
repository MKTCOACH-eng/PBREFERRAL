'use client';

import { useState } from 'react';
import { sendProspectToPipedrive } from '@/features/admin/actions/pipedriveActions';

type Prospect = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  destination: string;
  status: string;
  source: string;
  pipedrive_id?: string;
  pipedrive_synced_at?: string;
  created_at: string;
  last_contact_at?: string;
  referral_id?: string;
  owner?: {
    first_name: string;
    last_name: string;
  };
};

export default function ProspectDetailModal({
  prospect,
  onClose,
}: {
  prospect: Prospect;
  onClose: () => void;
}) {
  const [isSending, setIsSending] = useState(false);

  const handleSendToPipedrive = async () => {
    if (!confirm('¿Enviar este prospecto a Pipedrive?')) return;

    setIsSending(true);
    const result = await sendProspectToPipedrive(prospect.id);
    setIsSending(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert('Prospecto enviado a Pipedrive exitosamente');
      onClose();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-serif font-light text-[#1A2332]">
            Detalle del Prospecto
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

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nombre</label>
              <p className="text-sm font-medium text-gray-900">{prospect.first_name}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Apellido</label>
              <p className="text-sm font-medium text-gray-900">{prospect.last_name}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <p className="text-sm text-gray-900">{prospect.email}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Teléfono</label>
              <p className="text-sm text-gray-900">{prospect.phone}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Destino</label>
              <p className="text-sm text-gray-900">{prospect.destination}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Estado</label>
              <p className="text-sm text-gray-900">{prospect.status}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Origen</label>
              <p className="text-sm text-gray-900">{prospect.source}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Fecha de Creación</label>
              <p className="text-sm text-gray-900">
                {new Date(prospect.created_at).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>

          {/* Owner Info (if referral) */}
          {prospect.owner && (
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-xs text-gray-500 mb-2">Referido por</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900">
                  {prospect.owner.first_name} {prospect.owner.last_name}
                </p>
              </div>
            </div>
          )}

          {/* Pipedrive Status */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-xs text-gray-500 mb-2">Estado Pipedrive</label>
            {prospect.pipedrive_id ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Sincronizado con Pipedrive</span>
                </div>
                <p className="text-xs text-green-600">
                  ID: {prospect.pipedrive_id}
                </p>
                {prospect.pipedrive_synced_at && (
                  <p className="text-xs text-green-600 mt-1">
                    Sincronizado: {new Date(prospect.pipedrive_synced_at).toLocaleString('es-MX')}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-700">
                  Este prospecto aún no ha sido enviado a Pipedrive
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-light"
          >
            Cerrar
          </button>

          {!prospect.pipedrive_id && (
            <button
              onClick={handleSendToPipedrive}
              disabled={isSending}
              className="px-6 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar a Pipedrive
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
