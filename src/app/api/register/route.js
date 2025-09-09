// app/api/register/route.js
export const runtime = "nodejs";

import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/authServer";
import { sanitize } from "@/lib/apiResponse";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req) {
  try {
    const { email, password, firstName, lastName, username, avatar } =
      await req.json();

    await connectToDB();

    // Basic input validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: "Please enter all required fields" },
        { status: 400 }
      );
    }
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase().trim();
    const usernameLower = username?.toLowerCase().trim();

    // Pre-check for duplicates (also catch E11000 below just in case)
    if (await User.exists({ email: emailLower })) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    if (
      usernameLower &&
      (await User.exists({ username: usernameLower }))
    ) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    let doc;
    try {
      doc = await User.create({
        email: emailLower,
        password: hash,
        firstName,
        lastName,
        username: usernameLower || undefined,
        avatar,
      });
    } catch (err) {
      if (err?.code === 11000) {
        const message = err.keyPattern?.email
          ? "Email already exists"
          : err.keyPattern?.username
          ? "Username already exists"
          : "Duplicate key";
        return NextResponse.json({ message }, { status: 409 });
      }
      throw err;
    }

    // Sign JWT and set cookie (same as login)
    const token = jwt.sign({ _id: doc._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    await setAuthCookie(token);

    // Return sanitized user and 201 Created
    return NextResponse.json(
      {
        ok: true,
        user: sanitize(doc),
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An internal server error has occured" },
      { status: 500 }
    );
  }
}
