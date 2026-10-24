import { NextResponse, type NextRequest } from 'next/server';

const TOKEN_NAME = 'njack_admin_token';
const ADMIN_ROOT = '/council-terminal';
const ADMIN_LOGIN = '/council-terminal/login';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The old public path must not hint that an admin area exists.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.rewrite(new URL('/_not-found', req.url), { status: 404 });
  }

  // Everything below guards the admin area only; any other path passes through.
  if (pathname !== ADMIN_ROOT && !pathname.startsWith(`${ADMIN_ROOT}/`)) {
    return NextResponse.next();
  }

  if (pathname === ADMIN_LOGIN) return NextResponse.next();

  // Presence check only: middleware runs on the edge where jsonwebtoken cannot.
  // Real signature verification happens in the dashboard layout and every API handler.
  if (!req.cookies.get(TOKEN_NAME)?.value) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, req.url));
  }

  return NextResponse.next();
}

// Must be static literals — Next.js reads this at build time and cannot
// evaluate variables or template strings here.
export const config = {
  matcher: ['/admin', '/admin/:path*', '/council-terminal', '/council-terminal/:path*'],
};
