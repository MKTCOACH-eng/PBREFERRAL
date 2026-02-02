'use server';

import { createAdminClient } from '@/lib/supabase/admin';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    // Using Supabase Edge Function or external email service
    // For now, we'll log it (you can integrate with SendGrid, Resend, etc.)
    console.log('📧 Email to send:', { to, subject });
    
    // TODO: Integrate with actual email service
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@pueblobonito.com',
    //   to,
    //   subject,
    //   html,
    // });
    
    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

export function generateReferralConfirmationEmail(
  ownerName: string,
  guestName: string,
  destination: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1A2332; color: white; padding: 30px; text-align: center; }
        .content { background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .button { 
          display: inline-block; 
          background-color: #C8A882; 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
        .highlight { background-color: #C8A882; color: white; padding: 2px 8px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Referido Creado Exitosamente!</h1>
        </div>
        <div class="content">
          <p>Hola <strong>${ownerName}</strong>,</p>
          
          <p>¡Gracias por referir a un nuevo invitado a Pueblo Bonito!</p>
          
          <h3>Detalles del Referido:</h3>
          <ul>
            <li><strong>Invitado:</strong> ${guestName}</li>
            <li><strong>Destino:</strong> ${destination}</li>
            <li><strong>Estado:</strong> <span class="highlight">Pendiente</span></li>
          </ul>
          
          <p>Nuestro equipo se pondrá en contacto con tu invitado en las próximas 24-48 horas.</p>
          
          <p><strong>Recuerda:</strong> Recibirás tu bono de <span class="highlight">$200 USD en crédito F&B</span> una vez que tu invitado complete su estadía.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/referrals" class="button">
            Ver Mis Referidos
          </a>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Pueblo Bonito Golf & Spa Resorts. Todos los derechos reservados.</p>
          <p>Este es un correo automático, por favor no responder.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateGuestWelcomeEmail(
  guestName: string,
  ownerName: string,
  destination: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1A2332; color: white; padding: 30px; text-align: center; }
        .content { background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .offer-box { 
          background-color: #C8A882; 
          color: white; 
          padding: 20px; 
          border-radius: 8px; 
          text-align: center; 
          margin: 20px 0;
        }
        .offer-box h2 { margin: 0 0 10px 0; font-size: 28px; }
        .button { 
          display: inline-block; 
          background-color: #1A2332; 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Bienvenido a Pueblo Bonito!</h1>
        </div>
        <div class="content">
          <p>Hola <strong>${guestName}</strong>,</p>
          
          <p>${ownerName} te ha referido para disfrutar de una experiencia única en Pueblo Bonito Golf & Spa Resorts.</p>
          
          <div class="offer-box">
            <h2>OFERTA EXCLUSIVA</h2>
            <p><strong>7 NOCHES por solo $630 USD</strong></p>
            <p>o</p>
            <p><strong>3 NOCHES por solo $270 USD</strong></p>
            <p style="font-size: 14px; margin-top: 10px;">*Opción all-inclusive disponible</p>
          </div>
          
          <h3>Tu destino: ${destination}</h3>
          
          <p>Nuestro equipo de concierge se pondrá en contacto contigo en las próximas 24-48 horas para:</p>
          <ul>
            <li>Confirmar las fechas de tu estadía</li>
            <li>Explicarte los detalles de la oferta</li>
            <li>Responder todas tus preguntas</li>
            <li>Ayudarte con tu reservación</li>
          </ul>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/homeguest" class="button">
            Conoce Más Sobre Pueblo Bonito
          </a>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Si tienes alguna pregunta inmediata, no dudes en contactarnos.
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Pueblo Bonito Golf & Spa Resorts. Todos los derechos reservados.</p>
          <p>Los Cabos: +52 624 142 9797 | Mazatlán: +52 669 989 8900</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
