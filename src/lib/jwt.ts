// NEW: ensure this module is only used on the server (prevents client import)
import "server-only";

import { SignJWT, jwtVerify } from "jose";
// CHANGED: don't rely on cookies().set directly here; we'll set cookies on a NextResponse
import { NextResponse } from "next/server";
// CHANGED: we still allow reading cookies server-side (read-only in server components)
import { cookies as readCookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function signToken(payload: object, expires = "7d") {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(secret);
}

export async function verifyToken<T = unknown>(
  token: string
): Promise<T> {
  const { payload } = await jwtVerify(token, secret);
  return payload as T;
}

// CHANGED: instead of cookies().set() here, expose helpers that
// set/clear the auth cookie ON A RESPONSE (works in route handlers & middleware).
export function setAuthCookieOnResponse(
  res: NextResponse,
  token: string
) {
  res.cookies.set("auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res; // optional chaining convenience
}

export function clearAuthCookieOnResponse(res: NextResponse) {
  res.cookies.set("auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}

// CHANGED: keep a safe read helper for server contexts (route handlers or server components)
// Note: in server components this is read-only (no .set()).
export async function readAuthCookie() {
  const cookies = await readCookies();
  return cookies.get("auth")?.value ?? null;
}
