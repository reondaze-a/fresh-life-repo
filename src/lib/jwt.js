// ensure this module is only used on the server (prevents client import)
import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { cookies as readCookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function signToken(payload, expires = "7d") {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(secret);
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

// set/clear the auth cookie ON A RESPONSE (works in route handlers & middleware)
export function setAuthCookieOnResponse(res, token) {
  res.cookies.set("auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export function clearAuthCookieOnResponse(res) {
  res.cookies.set("auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}

// safe read helper for server contexts (route handlers or server components)
export async function readAuthCookie() {
  const cookies = await readCookies();
  return cookies.get("auth")?.value ?? null;
}

