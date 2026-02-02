'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function submitGuestInquiry(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destination: string;
  preferredDates?: string;
  comments?: string;
}) {
  try {
    const adminClient = createAdminClient();

    // Insert inquiry into opportunities table
    const { error: insertError } = await adminClient
      .from('opportunities')
      .insert({
        guest_first_name: data.firstName,
        guest_last_name: data.lastName,
        guest_email: data.email,
        guest_phone: data.phone,
        destination: data.destination,
        preferred_dates: data.preferredDates || null,
        comments: data.comments || null,
        source: 'guest_landing',
        status: 'new',
      });

    if (insertError) {
      console.error('Error inserting guest inquiry:', insertError);
      return { error: 'Error al enviar la solicitud. Por favor intenta de nuevo.' };
    }

    // TODO: Send email notification to sales team
    console.log('📧 Guest inquiry received:', data);

    revalidatePath('/guest');
    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error submitting guest inquiry:', error);
    return { error: 'Error inesperado. Por favor intenta de nuevo.' };
  }
}
