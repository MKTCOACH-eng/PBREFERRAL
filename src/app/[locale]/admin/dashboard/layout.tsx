import { redirect } from 'next/navigation';
import { getAdminProfile } from '@/features/admin/actions/adminActions';
import AdminNav from '@/features/admin/components/AdminNav';
import AdminHeader from '@/features/admin/components/AdminHeader';

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const result = await getAdminProfile();

  if (result.error || !result.admin) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader admin={result.admin} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <AdminNav admin={result.admin} />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
