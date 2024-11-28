import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    if(req.nextUrl.pathname.startsWith('/dashboard')) {
        if(!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    if(req.nextUrl.pathname == "/auth/login") {
        if(token) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard','/auth/login']
}