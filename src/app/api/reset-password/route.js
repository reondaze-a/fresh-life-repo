import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findOne({
      resetToken: token,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Reset successful" }, // Still returns a successful response to safeguard response checking
        { status: 200 }
      );
    }

    if (Date.now() > user.resetTokenExpiry) {
      return NextResponse.json(
        { message: "Token expired" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return NextResponse.json(
      { message: "Reset password successful" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An unexpected error has occured" },
      { status: 500 }
    );
  }
}
