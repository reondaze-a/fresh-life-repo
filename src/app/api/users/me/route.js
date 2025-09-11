// app/api/users/me/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/authServer";
import { toRes, sanitize } from "@/lib/apiResponse";
import { updateMeController } from "@/controllers/usersController";

export async function GET() {
  try {
    const { user } = await requireUser();
    const data = sanitize(user);
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
