'use client';

import { useState } from 'react';
import { deleteReferral } from '@/features/auth/actions/authActions';
import EditReferralModal from './EditReferralModal';

interface Referral {
  id: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  destination: string;
  special_requests: string | null;
  status: string;
  created_at: string;
}

export default function ReferralRow({ referral }: { referral: Referral }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este referido? Esta acción no se puede deshacer.')) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteReferral(referral.id);
    
    if (result.error) {
      alert(result.error);
      setIsDeleting(false);
    }
    // No need to setIsDeleting(false) on success, page will revalidate
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div className="font-light text-gray-900">
            {referral.guest_first_name} {referral.guest_last_name}
          </div>
          <div className="text-sm font-light text-gray-500">
            {referral.guest_email}
          </div>
        </td>
        <td className="px-6 py-4 font-light text-gray-900">
          {referral.destination}
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-light ${
            referral.status === 'completed' 
              ? 'bg-green-100 text-green-800'
              : referral.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {referral.status === 'pending' ? 'Pendiente' : 
             referral.status === 'completed' ? 'Completado' : referral.status}
          </span>
        </td>
        <td className="px-6 py-4 font-light text-gray-500 text-sm">
          {new Date(referral.created_at).toLocaleDateString('es-MX')}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 text-[#C8A882] hover:bg-[#C8A882] hover:text-white rounded-lg transition-all"
              title="Editar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            {referral.status === 'pending' && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Eliminar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </td>
      </tr>

      {showEditModal && (
        <EditReferralModal
          referral={referral}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
