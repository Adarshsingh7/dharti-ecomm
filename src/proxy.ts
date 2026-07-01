import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'amba_super_secret_key_123!';
const key = new TextEncoder().encode(secretKey);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes EXCEPT /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, key);
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
