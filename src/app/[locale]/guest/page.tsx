import { redirect } from 'next/navigation';

// Legacy /guest route - redirect to /homeguest
export default async function GuestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string; token?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const token = sp.ref || sp.token || '';

  // Redirect to new homeguest route
  redirect(`/${locale}/homeguest${token ? `?token=${token}` : ''}`);
}
