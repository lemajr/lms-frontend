import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token'); // Get token from cookies
  const url = req.nextUrl.clone(); // Clone the URL for potential redirection

  console.log("Requested URL:", url.pathname); // Debugging: check the current URL

  // If no token is found and user is not on the login page, redirect to login
  if (!token && url.pathname !== '/login') {
    console.log("No token found, redirecting to login...");
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Continue to the requested page if the token is present or the user is on the login page
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Protect additional routes if needed
};
