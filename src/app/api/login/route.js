// app/api/login/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/authServer";
import { sanitize } from "@/lib/apiResponse";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";
import { set } from "mongoose";


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

    await setAuthCookie(token);

    // You usually don't need to return the token if it's in a cookie:
    return NextResponse.json({
      ok: true,
      user: sanitize(user), // return sanitized user object
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Incorrect email/username or password" },
      { status: 401 }
    );
  }
}
