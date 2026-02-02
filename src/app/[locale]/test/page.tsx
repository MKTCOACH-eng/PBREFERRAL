export default async function TestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold">Test Page - {locale}</h1>
      <p>If you see this, routing is working!</p>
    </div>
  );
}
