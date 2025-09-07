// app/api/users/me/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/authServer";
import {
  getMeController,
  updateMeController,
} from "@/controllers/users";

function toRes(err) {
  const status = err?.status || 500;
  const message =
    status === 500
      ? "An internal server error has occured"
      : err.message;
  return NextResponse.json({ message }, { status });
}

export async function GET() {
  try {
    const { user } = await requireUser();
    const data = await getMeController(user);
    return NextResponse.json({ user: data });
  } catch (err) {
    return toRes(err);
  }
}

export async function PATCH(req) {
  try {
    const { userId } = await requireUser();
    const body = await req.json();
    const updated = await updateMeController(userId, body);
    return NextResponse.json({ user: updated });
  } catch (err) {
    return toRes(err);
  }
}
