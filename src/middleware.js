import { authClient } from '@/lib/client/auth-client';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // hanya jalankan middleware untuk /dashboard,
    // tapi skip file statis biar ga error
    '/applicant/:path*',
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
