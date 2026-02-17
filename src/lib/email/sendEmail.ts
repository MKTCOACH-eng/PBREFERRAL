// Email utility functions

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    // TODO: Integrate with actual email service (Resend, SendGrid, etc.)
    // For now, log the email
    console.log('📧 Email queued:', { to, subject, timestamp: new Date().toISOString() });

    // Example integration with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Pueblo Bonito Referrals <noreply@pueblobonito.com>',
    //   to, subject, html,
    // });

    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// ===== EMAIL TEMPLATES (Spec-compliant EN/ES) =====

const baseStyle = `
  body { font-family: 'Georgia', serif; line-height: 1.8; color: #1A2332; margin: 0; padding: 0; background-color: #F8F6F3; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
  .header { background: linear-gradient(135deg, #1A2332 0%, #2A3442 100%); padding: 40px 30px; text-align: center; }
  .header h1 { color: #C8A882; font-size: 24px; font-weight: 300; margin: 0; letter-spacing: 1px; }
  .header p { color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 8px; }
  .content { padding: 40px 30px; }
  .content p { margin-bottom: 16px; font-size: 16px; }
  .highlight { background: #C8A882; color: #ffffff; padding: 3px 10px; border-radius: 4px; font-weight: 600; }
  .cta { display: inline-block; background: #C8A882; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 20px 0; }
  .footer { background: #1A2332; color: rgba(255,255,255,0.6); padding: 24px 30px; text-align: center; font-size: 12px; }
  .footer a { color: #C8A882; text-decoration: none; }
`;

function wrapEmail(content: string): string {
  return `<!DOCTYPE html><html><head><style>${baseStyle}</style></head><body><div class="container">${content}</div></body></html>`;
}

const footerHTML = (year: number) => `
  <div class="footer">
    <p>© ${year} Pueblo Bonito Golf & Spa Resorts</p>
    <p>Los Cabos: +52 (624) 142 9898 | Mazatlán: +52 (669) 989 8900</p>
    <p><a href="https://www.pueblobonito.com.mx/politica-de-privacidad">Privacy Policy</a> · <a href="https://www.pueblobonito.com.mx/terminos-y-condiciones">Terms</a></p>
  </div>
`;

// 9.1 Guest Confirmation (EN)
export function generateGuestConfirmationEN(guestName: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>PUEBLO BONITO</h1>
      <p>Referral Program</p>
    </div>
    <div class="content">
      <p>Hello ${guestName},</p>
      <p>Thank you for your interest in Pueblo Bonito. We've received your information and our team will contact you shortly.</p>
      <p>Warm regards,<br/>Pueblo Bonito Team</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.1 Guest Confirmation (ES)
export function generateGuestConfirmationES(guestName: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>PUEBLO BONITO</h1>
      <p>Programa de Referidos</p>
    </div>
    <div class="content">
      <p>Hola ${guestName},</p>
      <p>Gracias por tu interés en Pueblo Bonito. Hemos recibido tu información y nuestro equipo te contactará pronto.</p>
      <p>Saludos cordiales,<br/>Equipo Pueblo Bonito</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.2 Owner Confirmation (EN)
export function generateOwnerConfirmationEN(ownerName: string, guestName: string, destination: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>PUEBLO BONITO</h1>
      <p>Referral Program</p>
    </div>
    <div class="content">
      <p>Hello ${ownerName},</p>
      <p>We've received your referral for ${guestName} (${destination}). Our team has been notified and will follow up. You will receive updates as it progresses.</p>
      <p>Pueblo Bonito Referral Program</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.2 Owner Confirmation (ES)
export function generateOwnerConfirmationES(ownerName: string, guestName: string, destination: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>PUEBLO BONITO</h1>
      <p>Programa de Referidos</p>
    </div>
    <div class="content">
      <p>Hola ${ownerName},</p>
      <p>Hemos recibido tu referido ${guestName} (${destination}). Nuestro equipo ya fue notificado y te compartiremos actualizaciones conforme avance.</p>
      <p>Programa de Referidos Pueblo Bonito</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.3 Internal Team Notification (EN)
export function generateInternalNotificationEN(vars: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  ownerEmail: string;
  destination: string;
}): string {
  return wrapEmail(`
    <div class="header">
      <h1>New Referral Assigned – ${vars.destination}</h1>
    </div>
    <div class="content">
      <p>New referral received.</p>
      <p><strong>Guest:</strong> ${vars.guestName}<br/>
      <strong>Email:</strong> ${vars.guestEmail}<br/>
      <strong>Phone:</strong> ${vars.guestPhone}<br/>
      <strong>Referred by:</strong> ${vars.ownerEmail}<br/>
      <strong>Destination:</strong> ${vars.destination}</p>
      <p>Please follow up according to the referral process.</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.4 Owner Stage Update (EN)
export function generateOwnerStageUpdateEN(ownerName: string, guestName: string, stage: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>PUEBLO BONITO</h1>
      <p>Referral Update</p>
    </div>
    <div class="content">
      <p>Hello ${ownerName},</p>
      <p>Your referral ${guestName} is now in stage: <span class="highlight">${stage}</span>.</p>
      <p>Thank you for being part of Pueblo Bonito.</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.4 Owner Stage Update (ES)
export function generateOwnerStageUpdateES(ownerName: string, guestName: string, stage: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>PUEBLO BONITO</h1>
      <p>Actualización de Referido</p>
    </div>
    <div class="content">
      <p>Hola ${ownerName},</p>
      <p>Tu referido ${guestName} ahora está en la etapa: <span class="highlight">${stage}</span>.</p>
      <p>Gracias por ser parte de Pueblo Bonito.</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.5 Owner Closed Won / Reward (EN)
export function generateOwnerClosedWonEN(ownerName: string, guestName: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>🎉 Congratulations!</h1>
      <p>Your referral was successful</p>
    </div>
    <div class="content">
      <p>Congratulations ${ownerName},</p>
      <p>Your referral ${guestName} was successfully completed. You have earned a <span class="highlight">$200 Food & Beverage credit</span>. Our team will contact you with the next steps.</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// 9.5 Owner Closed Won / Reward (ES)
export function generateOwnerClosedWonES(ownerName: string, guestName: string): string {
  return wrapEmail(`
    <div class="header">
      <h1>🎉 ¡Felicidades!</h1>
      <p>Tu referido fue exitoso</p>
    </div>
    <div class="content">
      <p>¡Felicidades ${ownerName}!</p>
      <p>Tu referido ${guestName} se completó con éxito. Has obtenido un <span class="highlight">crédito de $200 USD en Alimentos y Bebidas</span>. Nuestro equipo te contactará con los siguientes pasos.</p>
    </div>
    ${footerHTML(new Date().getFullYear())}
  `);
}

// Legacy exports for backwards compatibility
export function generateReferralConfirmationEmail(
  ownerName: string,
  guestName: string,
  destination: string
): string {
  return generateOwnerConfirmationEN(ownerName, guestName, destination);
}

export function generateGuestWelcomeEmail(
  guestName: string,
  ownerName: string,
  destination: string,
  guestLink: string
): string {
  return generateGuestConfirmationEN(guestName);
}
