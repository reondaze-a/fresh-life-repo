import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // delete by name (sets Set-Cookie with expiration in the past)
  cookies().delete("auth");
  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed" },
    { status: 405 }
  );
}
