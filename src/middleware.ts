import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {

    if (!req.nextauth.token) {
        console.log("No token found. Redirecting to login.");
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/umkm/:path*"],
};
