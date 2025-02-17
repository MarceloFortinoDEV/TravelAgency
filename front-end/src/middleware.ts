import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const publicRoutes = [
    { path: '/login', authenticated: 'redirect' },
    { path: '/register', authenticated: 'redirect' }
] as const;

const roleAdminRoutes = [
    '/dashboard/users'
] as const;

const REDIRECT_NOT_AUTHENTICATE = '/login';

interface userData {
    name: string
    email: string
    role: string
}

export default async function Middleware(request: NextRequest) {
    
    const path = request.nextUrl.pathname;

    const publicRoute = publicRoutes.find(route => route.path === path);

    const roleAdminRoute = roleAdminRoutes.find(route => route === path);

    const token = request.cookies.get('session');

    if (!token && publicRoute) {
        return NextResponse.next();
    }

    if (token && roleAdminRoute) {
        const decodedToken = jwt.decode(token.value) as userData;

        const role = decodedToken?.role as string;

        if (role === 'ADMINISTRATOR') {
            return NextResponse.next()
        }

        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_NOT_AUTHENTICATE

        return NextResponse.redirect(redirectUrl)
    }

    if (!token && !publicRoute) { 
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_NOT_AUTHENTICATE

        return NextResponse.redirect(redirectUrl);
    }

    if (token && publicRoute && publicRoute.authenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/dashboard'

        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}