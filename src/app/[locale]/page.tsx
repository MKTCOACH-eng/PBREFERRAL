import { redirect } from 'next/navigation';

export default async function RootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Redirect to homeowner page by default
  redirect(`/${locale}/homeowner`);
}
