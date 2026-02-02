import { createClient } from '@/lib/supabase/server';
import NewReferralForm from '@/features/dashboard/components/NewReferralForm';

export default async function NewReferralPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
          Crear Nuevo Referido
        </h1>
        <p className="text-gray-600 font-light">
          Comparte los detalles de tu invitado y nuestro equipo se encargará del resto.
        </p>
      </div>

      <NewReferralForm />
    </div>
  );
}
