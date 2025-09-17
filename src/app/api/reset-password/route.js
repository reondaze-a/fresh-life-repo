import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { message: "Please enter a new password" },
        { status: 400 }
      );
    }

    await connectToDB();
  } catch (err) {}
}
