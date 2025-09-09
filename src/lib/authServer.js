// src/lib/authServer.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;
  console.log(token);
  if (!token) {
    console.log(token);
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    console.log("JWT verification failed");
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  await connectToDB();
  const user = await User.findById(payload._id).select("-password");
  if (!user) {
    console.log(token);
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
  return { user, userId: user._id.toString() };
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
}
