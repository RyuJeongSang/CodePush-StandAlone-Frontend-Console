import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // 등록 페이지는 항상 접근 가능
    if (request.nextUrl.pathname === '/register') {
        return NextResponse.next();
    }

    // 쿠키에서 서버 URL과 토큰 확인
    const serverUrl = request.cookies.get('serverUrl')?.value;
    const token = request.cookies.get('token')?.value;

    // 서버 URL이나 토큰이 없으면 등록 페이지로 리디렉션
    if (!serverUrl || !token) {
        return NextResponse.redirect(new URL('/register', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|register).*)',
    ],
};