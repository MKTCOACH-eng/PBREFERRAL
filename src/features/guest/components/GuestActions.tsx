'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { acceptReferralOffer, requestMoreInfo } from '../actions/guestActions';

interface ReferralData {
  guest_first_name: string;
  guest_accepted_at: string | null;
  destination: string;
}

export default function GuestActions({ 
  referralData, 
  token 
}: { 
  referralData: ReferralData | null; 
  token?: string;
}) {
  const t = useTranslations('guest.contactForm');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<'accepted' | 'info' | null>(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');

  if (!referralData || !token) {
    // Si no hay token, mostrar mensaje genérico
    return (
      <section id="guest-actions" className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3342]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-2xl p-12">
            <h2 className="text-3xl font-serif font-light text-[#1A2332] mb-4">
              ¿Interesado en Pueblo Bonito?
            </h2>
            <p className="text-gray-600 font-light mb-6">
              Contacta directamente a nuestro equipo de ventas para más información sobre nuestras ofertas exclusivas.
            </p>
            <a
              href="mailto:sales@pueblobonito.com"
              className="inline-block px-8 py-4 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all shadow-lg"
            >
              Contactar Ventas
            </a>
          </div>
        </div>
      </section>
    );
  }

  const handleAccept = async () => {
    setIsLoading(true);
    const result = await acceptReferralOffer(token);
    setIsLoading(false);
    
    if (result.success) {
      setSuccess('accepted');
    } else {
      alert(result.error || 'Error al aceptar la oferta');
    }
  };

  const handleRequestInfo = async () => {
    setIsLoading(true);
    const result = await requestMoreInfo(token, message);
    setIsLoading(false);
    
    if (result.success) {
      setSuccess('info');
    } else {
      alert(result.error || 'Error al enviar solicitud');
    }
  };

  if (success) {
    return (
      <section id="guest-actions" className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3342]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-light text-[#1A2332] mb-4">
              {success === 'accepted' ? '¡Excelente Decisión!' : '¡Solicitud Enviada!'}
            </h3>
            <p className="text-gray-600 font-light text-lg mb-6">
              {success === 'accepted' 
                ? 'Nuestro equipo de concierge te contactará en las próximas 24 horas para coordinar todos los detalles de tu estadía.'
                : 'Uno de nuestros especialistas se pondrá en contacto contigo pronto para responder todas tus preguntas.'
              }
            </p>
            <p className="text-sm text-gray-500">
              Te enviaremos un email de confirmación a tu correo electrónico.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // If already accepted
  if (referralData.guest_accepted_at) {
    return (
      <section id="guest-actions" className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3342]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
            <h3 className="text-3xl font-serif font-light text-[#1A2332] mb-4">
              Ya Aceptaste Esta Oferta
            </h3>
            <p className="text-gray-600 font-light text-lg">
              Nuestro equipo ya está procesando tu solicitud y te contactaremos pronto.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="guest-actions" className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3342]">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-light text-white mb-4">
            ¿Listo para Vivir la Experiencia?
          </h2>
          <p className="text-xl font-light text-white/90">
            Confirma tu interés y nuestro equipo te contactará
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          {!showMessageForm ? (
            <div className="space-y-6">
              {/* Offer Summary */}
              <div className="bg-[#C8A882] text-white p-6 rounded-lg text-center">
                <h3 className="text-2xl font-serif font-light mb-2">Tu Oferta Exclusiva</h3>
                <p className="text-3xl font-serif font-light">7 Noches por $630 USD</p>
                <p className="text-sm mt-2">en {referralData.destination}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAccept}
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-[#1A2332] text-white font-light rounded-lg hover:bg-[#2A3342] transition-all disabled:opacity-50 shadow-lg text-lg"
                >
                  {isLoading ? 'Procesando...' : '✓ Acepto la Oferta'}
                </button>

                <button
                  onClick={() => setShowMessageForm(true)}
                  className="w-full px-8 py-4 bg-white text-[#1A2332] border-2 border-[#1A2332] font-light rounded-lg hover:bg-gray-50 transition-all text-lg"
                >
                  ¿ Quiero Más Información
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Al aceptar, autorizas que nuestro equipo se ponga en contacto contigo
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-light text-[#1A2332] text-center">
                ¿Qué te gustaría saber?
              </h3>
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Escribe tus preguntas o comentarios aquí..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowMessageForm(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-light rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRequestInfo}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-[#C8A882] text-white font-light rounded-lg hover:bg-[#B89872] transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
