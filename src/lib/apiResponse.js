// handlers for API responses
import { NextResponse } from "next/server";

function toRes(err) {
  const status = err?.status || 500;
  const message =
    status === 500
      ? "An internal server error has occured"
      : err.message;
  return NextResponse.json({ message }, { status });
}

// sanitize user object for response
const sanitize = (u) => ({
  _id: u._id,
  email: u.email,
  firstName: u.firstName,
  lastName: u.lastName,
  avatar: u.avatar,
  role: u.role,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

export { toRes, sanitize };
