'use client';

import { useState } from 'react';
import { sendProspectToPipedrive } from '@/features/admin/actions/pipedriveActions';
import ProspectDetailModal from './ProspectDetailModal';

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

export default function ProspectsTable({ prospects }: { prospects: Prospect[] }) {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [sendingToPipedrive, setSendingToPipedrive] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { label: 'Nuevo', color: 'bg-blue-100 text-blue-700' },
      contacted: { label: 'Contactado', color: 'bg-yellow-100 text-yellow-700' },
      interested: { label: 'Interesado', color: 'bg-purple-100 text-purple-700' },
      won: { label: 'Ganado', color: 'bg-green-100 text-green-700' },
      lost: { label: 'Perdido', color: 'bg-red-100 text-red-700' },
    };
    return badges[status as keyof typeof badges] || badges.new;
  };

  const getSourceBadge = (source: string) => {
    const badges = {
      referral: { label: 'Referido', color: 'bg-indigo-100 text-indigo-700' },
      direct: { label: 'Directo', color: 'bg-gray-100 text-gray-700' },
      pipedrive: { label: 'Pipedrive', color: 'bg-orange-100 text-orange-700' },
    };
    return badges[source as keyof typeof badges] || badges.direct;
  };

  const handleSendToPipedrive = async (prospect: Prospect) => {
    if (!confirm('¿Enviar este prospecto a Pipedrive?')) return;

    setSendingToPipedrive(prospect.id);
    const result = await sendProspectToPipedrive(prospect.id);
    setSendingToPipedrive(null);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert('Prospecto enviado a Pipedrive exitosamente');
    }
  };

  if (prospects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-serif font-light text-gray-900">
            No hay prospectos
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Los prospectos aparecerán aquí cuando los propietarios creen referidos
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prospecto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pipedrive
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prospects.map((prospect) => {
                const statusBadge = getStatusBadge(prospect.status);
                const sourceBadge = getSourceBadge(prospect.source);

                return (
                  <tr key={prospect.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {prospect.first_name} {prospect.last_name}
                        </div>
                        {prospect.owner && (
                          <div className="text-xs text-gray-500">
                            Ref: {prospect.owner.first_name} {prospect.owner.last_name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{prospect.email}</div>
                      <div className="text-xs text-gray-500">{prospect.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{prospect.destination}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${sourceBadge.color}`}>
                        {sourceBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {prospect.pipedrive_id ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Sincronizado
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No enviado</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProspect(prospect)}
                          className="text-gray-600 hover:text-[#C8A882] transition-colors"
                          title="Ver detalle"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {!prospect.pipedrive_id && (
                          <button
                            onClick={() => handleSendToPipedrive(prospect)}
                            disabled={sendingToPipedrive === prospect.id}
                            className="text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-50"
                            title="Enviar a Pipedrive"
                          >
                            {sendingToPipedrive === prospect.id ? (
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-medium text-gray-900">{prospects.length}</span> prospectos
            {' • '}
            <span className="text-green-600 font-medium">
              {prospects.filter(p => p.pipedrive_id).length}
            </span> sincronizados con Pipedrive
          </p>
        </div>
      </div>

      {/* Prospect Detail Modal */}
      {selectedProspect && (
        <ProspectDetailModal
          prospect={selectedProspect}
          onClose={() => setSelectedProspect(null)}
        />
      )}
    </>
  );
}
