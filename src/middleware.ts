import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

}