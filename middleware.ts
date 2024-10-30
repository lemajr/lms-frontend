import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('access_token'); // Get token cookie
  const roleCookie = req.cookies.get('role'); // Get role cookie
  const url = req.nextUrl.clone(); // Clone URL for redirection if needed

  const token = tokenCookie ? tokenCookie.value : null; // Access cookie value or set to null
  const role = roleCookie ? roleCookie.value : null;

  console.log("Requested URL:", url.pathname); // Debugging: check the current URL

  // Redirect to login if no token and not on the login page
  if (!token && url.pathname !== '/login') {
    console.log("No token found, redirecting to login...");
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect users to their respective dashboards based on their roles
  if (role === 'student' && !url.pathname.startsWith('/dashboard/student')) {
    console.log("Redirecting student to student dashboard...");
    url.pathname = '/dashboard/student';
    return NextResponse.redirect(url);
  }

  if (role === 'admin' && !url.pathname.startsWith('/dashboard/admin')) {
    console.log("Redirecting admin to admin dashboard...");
    url.pathname = '/dashboard/admin';
    return NextResponse.redirect(url);
  }

  if (role === 'lecturer' && !url.pathname.startsWith('/dashboard/lecturer')) {
    console.log("Redirecting lecturer to lecturer dashboard...");
    url.pathname = '/dashboard/lecturer';
    return NextResponse.redirect(url);
  }

  // Continue to the requested page if token and role are valid and match the path
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Specify routes to apply middleware
};
