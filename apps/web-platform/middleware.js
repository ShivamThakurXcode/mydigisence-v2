"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
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
]);
const ADMIN_PATHS = /^\/admin/;
function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('accessToken')?.value ?? req.headers.get('authorization')?.replace('Bearer ', '');
    // Public paths — always accessible
    if (PUBLIC_PATHS.has(pathname) || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
        return server_1.NextResponse.next();
    }
    // Allow profile, explore paths without auth
    if (pathname.match(/^\/@/) || pathname.startsWith('/explore') || pathname.startsWith('/cities')) {
        return server_1.NextResponse.next();
    }
    // Protected paths — redirect to login if no token
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('next', pathname);
        return server_1.NextResponse.redirect(loginUrl);
    }
    // Admin paths — additional check (full RBAC check is done in the page/API)
    if (ADMIN_PATHS.test(pathname)) {
        // Token exists — let the page handle admin role check
        return server_1.NextResponse.next();
    }
    return server_1.NextResponse.next();
}
exports.config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public|fonts|icons|images|logos).*)',
    ],
};
//# sourceMappingURL=middleware.js.map