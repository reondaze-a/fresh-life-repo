// app/api/users/me/password/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/authServer";
import { toRes } from "@/lib/apiResponse";
import { changePasswordController } from "@/controllers/users";

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
