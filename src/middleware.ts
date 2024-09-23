import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
    const isApiRequest = req.nextUrl.pathname.startsWith('/api');

    console.log("Is API Request:", isApiRequest);
    console.log("Request Method:", req.method);
    console.log("Token:", req.nextauth.token);

    if (isApiRequest && req.method !== 'GET' && !req.nextauth.token) {
        console.log("No token found. Redirecting to login.");
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.rewrite(url);
    }

    console.log("Request allowed.");
    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/umkm/:path*"],
};
