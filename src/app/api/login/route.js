// app/api/login/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();
    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Email/Username and password are required" },
        { status: 400 }
      );
    }

    await connectToDB();
    const user = await User.findUserByCredentials(
      identifier,
      password
    );

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    cookies().set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });

    // You usually don't need to return the token if it's in a cookie:
    return NextResponse.json({
      ok: true,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Incorrect email/username or password" },
      { status: 401 }
    );
  }
}
