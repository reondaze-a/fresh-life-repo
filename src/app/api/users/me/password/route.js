// app/api/users/me/password/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/authServer";
import { changePasswordController } from "@/controllers/users";

function toRes(err) {
  const status = err?.status || 500;
  const message =
    status === 500
      ? "An internal server error has occured"
      : err.message;
  return NextResponse.json({ message }, { status });
}

export async function POST(req) {
  try {
    const { userId } = await requireUser();
    const { currentPassword, newPassword } = await req.json();
    const result = await changePasswordController(userId, {
      currentPassword,
      newPassword,
    });
    return NextResponse.json(result);
  } catch (err) {
    return toRes(err);
  }
}
