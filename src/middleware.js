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
    // '/admin/:path*',
    // '/applicant/:path*',
    // '/((?!api|_next/|favicon.ico|sign-in|sign-up|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)',
  ],
};

