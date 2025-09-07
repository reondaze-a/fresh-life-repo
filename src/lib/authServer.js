// src/lib/authServer.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function requireUser() {
  const token = cookies().get("auth")?.value;
  if (!token)
    throw Object.assign(new Error("Unauthorized"), { status: 401 });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  await connectToDB();
  const user = await User.findById(payload._id).select("-password");
  if (!user)
    throw Object.assign(new Error("Unauthorized"), { status: 401 });

  return { user, userId: user._id.toString() };
}
