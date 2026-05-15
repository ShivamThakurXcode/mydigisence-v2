import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = new Set([
  '/',
  '/login',
  '/signup',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/pricing',
  '/features',
  '/contact',
  '/blog',
  '/help',
  '/explore',
  '/browse',
  '/search',
])

const ADMIN_PATHS = /^\/admin/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('accessToken')?.value ?? req.headers.get('authorization')?.replace('Bearer ', '')

  // Public paths — always accessible
  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Allow profile, explore paths without auth
  if (pathname.match(/^\/@/) || pathname.startsWith('/explore') || pathname.startsWith('/cities')) {
    return NextResponse.next()
  }

  // Protected paths — redirect to login if no token
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin paths — additional check (full RBAC check is done in the page/API)
  if (ADMIN_PATHS.test(pathname)) {
    // Token exists — let the page handle admin role check
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|fonts|icons|images|logos).*)',
  ],
}
