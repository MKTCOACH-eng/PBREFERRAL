import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardNav from '@/features/dashboard/components/DashboardNav';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to homeowner if not authenticated
  if (!user) {
    redirect('/homeowner');
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3">
              <DashboardNav />
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
