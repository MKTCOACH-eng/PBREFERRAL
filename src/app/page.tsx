import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root to homeowner landing with default locale
  redirect('/en/homeowner');
}
