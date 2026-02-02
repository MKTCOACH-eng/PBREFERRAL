import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import AdminLoginForm from '@/features/admin/components/AdminLoginForm';

export default async function AdminLoginPage({
  params,
}: {
  params: { locale: string };
}) {
  // Check if already authenticated as admin
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // Check if user is admin
    const adminClient = createAdminClient();
    const { data: admin } = await adminClient
      .from('admins')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (admin) {
      redirect(`/${params.locale}/admin/dashboard`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A2332] via-[#2A3342] to-[#1A2332] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
            <h1 className="text-3xl font-serif font-light text-white mb-2">
              Pueblo Bonito
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8A882]">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Login Form */}
        <AdminLoginForm />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Pueblo Bonito Resorts
          </p>
        </div>
      </div>
    </div>
  );
}
