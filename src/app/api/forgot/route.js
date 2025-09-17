import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Please enter an email address" },
        { status: 400 }
      );
    }

    await connectToDB();

    const emailLower = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailLower });

    if (!user) {
      return NextResponse.json(
        { message: "Request sent" },
        { status: 200 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expire = new Date(Date.now() + 1000 * 60 * 10); // 10 min

    user.resetToken = token;
    user.resetTokenExpiry = expire;

    await user.save();

    return NextResponse.json(
      { message: "Request sent" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An unexpected error has occured." },
      { status: 500 }
    );
  }
}
