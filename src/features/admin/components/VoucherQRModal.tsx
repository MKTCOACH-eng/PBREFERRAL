'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

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
};

export default function VoucherQRModal({
  voucher,
  onClose,
}: {
  voucher: Voucher;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      // Generate QR code
      const qrData = JSON.stringify({
        code: voucher.voucher_code,
        guest: voucher.guest_name,
        amount: voucher.amount,
        currency: voucher.currency,
        destination: voucher.destination,
        expires: voucher.expires_at,
      });

      QRCode.toCanvas(
        canvasRef.current,
        qrData,
        {
          width: 300,
          margin: 2,
          color: {
            dark: '#1A2332',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) {
            console.error('Error generating QR:', error);
          } else {
            setQrGenerated(true);
          }
        }
      );
    }
  }, [voucher]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `voucher-${voucher.voucher_code}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { label: string; color: string } } = {
      pending: { label: 'Pendiente', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      redeemed: { label: 'Canjeado ✓', color: 'bg-green-100 text-green-700 border-green-200' },
      expired: { label: 'Expirado', color: 'bg-gray-100 text-gray-700 border-gray-200' },
      cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700 border-red-200' },
    };
    return badges[status] || badges.pending;
  };

  const badge = getStatusBadge(voucher.status);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[#1A2332]">
              Voucher QR Code
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
          {/* Voucher Card */}
          <div className="bg-gradient-to-br from-[#1A2332] via-[#2A3342] to-[#1A2332] rounded-xl p-8 text-white mb-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A882]/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C8A882]/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-light mb-1">Pueblo Bonito</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A882]">
                  Golf & Spa Resorts
                </p>
              </div>

              {/* Amount */}
              <div className="text-center mb-6">
                <p className="text-5xl font-serif font-light text-[#C8A882] mb-2">
                  ${voucher.amount.toFixed(0)}
                </p>
                <p className="text-sm text-white/70">
                  {voucher.currency} Food & Beverage Bonus
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <canvas ref={canvasRef} />
                </div>
              </div>

              {/* Voucher Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Código:</span>
                  <span className="font-mono font-semibold">{voucher.voucher_code}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Guest:</span>
                  <span className="font-medium">{voucher.guest_name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Destino:</span>
                  <span className="font-medium">{voucher.destination}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Válido hasta:</span>
                  <span className="font-medium">{formatDate(voucher.expires_at)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/70">Estado:</span>
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={!qrGenerated}
              className="flex-1 px-6 py-3 bg-[#C8A882] text-white font-medium rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar QR
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
            >
              Cerrar
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Instrucciones de uso:
                </p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Descarga el QR en formato PNG</li>
                  <li>• Envía al guest por email o WhatsApp</li>
                  <li>• El guest presenta el QR en el resort</li>
                  <li>• Escanea el QR y marca como "Canjeado"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
