import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to /dashboard
  redirect('/dashboard');

  return null; // This component won't render because of the redirect.
}
