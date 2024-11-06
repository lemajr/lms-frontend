import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); // Clone URL for redirection if needed
  
  // If the request is not for the /dashboard or /profile route, redirect to login
  if (!url.pathname.startsWith('/dashboard') && !url.pathname.startsWith('/profile')) {
    console.log("Redirecting to login ...");
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Continue to the requested page if the conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Specify routes to apply middleware
};
