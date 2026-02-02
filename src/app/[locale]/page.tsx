import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to homeowner landing by default
  redirect('/homeowner');
}
