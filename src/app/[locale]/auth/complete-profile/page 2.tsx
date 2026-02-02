import CompleteProfileForm from '@/features/auth/components/CompleteProfileForm';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';

export default async function CompleteProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F6F3] py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompleteProfileForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
