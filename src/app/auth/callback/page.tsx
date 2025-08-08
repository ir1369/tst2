'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      // Save the token to localStorage
      localStorage.setItem('auth_token', token);
      
      // Redirect to the home page. The AuthProvider will pick up the token
      // and update the user state.
      router.push('/');
    } else if (error) {
      // Handle potential errors passed from the server
      console.error('OAuth Error:', error);
      router.push(`/login?error=${encodeURIComponent(error)}`);
    } else {
      // No token or error, redirect to login
      router.push('/login?error=Invalid_callback');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <h1 className="text-2xl font-semibold text-gray-700 mt-4">ورود شما در حال نهایی شدن است</h1>
        <p className="text-gray-500 mt-2">لطفا منتظر بمانید...</p>
      </div>
    </div>
  );
}