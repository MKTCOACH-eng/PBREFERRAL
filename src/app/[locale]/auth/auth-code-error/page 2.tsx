import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import Link from 'next/link';

export default async function AuthCodeErrorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F6F3] py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg border border-[#C8A882]/20 p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-serif font-light text-[#1A2332] mb-2">
              Authentication Error
            </h1>
            
            <p className="text-[#1A2332]/70 font-light mb-6">
              There was an error signing you in. The link may have expired or is invalid.
            </p>
            
            <Link
              href="/homeowner"
              className="inline-block px-6 py-3 bg-[#C8A882] text-white rounded-lg hover:bg-[#A88B5F] transition-all font-medium uppercase tracking-wider"
            >
              Try Again
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
