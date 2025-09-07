// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth")?.value; // adjust cookie name if different
  const { pathname, search } = req.nextUrl;

  // Define protected URL prefixes (subtrees)
  const protectedPrefixes = ["/profile", "/dashboard", "/settings"];
  const isProtected = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  // Not logged in → send to login with ?from=<original path+query>
  if (!token && isProtected) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname + (search || ""));
    return NextResponse.redirect(url);
  }

  // Optional: if logged in, keep users away from /login and /register
  const isAuthPage = pathname === "/login" || pathname === "/register";
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Only run on these paths (keeps assets/API untouched unless listed)
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
