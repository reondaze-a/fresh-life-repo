// src/controllers/users.js
import validator from "validator";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { sanitize } from "@/lib/apiResponse";

export async function updateMeController(userId, data) {
  const update = {};
  if (data.firstName !== undefined)
    update.firstName = String(data.firstName).trim();
  if (data.lastName !== undefined)
    update.lastName = String(data.lastName).trim();
  if (data.username !== undefined)
    update.username = String(data.username).trim().toLowerCase();
  if (data.avatar !== undefined)
    update.avatar = String(data.avatar).trim();
  if (data.email !== undefined) {
    const email = String(data.email).trim().toLowerCase();
    if (!validator.isEmail(email)) {
      const e = new Error("Invalid email address");
      e.status = 400;
      throw e;
    }
    update.email = email;
  }

  const doc = await User.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true, runValidators: true, context: "query" }
  ).select("-password");

  if (!doc) {
    const e = new Error("User not found");
    e.status = 404;
    throw e;
  }
  return sanitize(doc);
}

export async function changePasswordController(
  userId,
  { currentPassword, newPassword }
) {
  if (!newPassword || newPassword.length < 6) {
    const e = new Error("New password must be at least 6 characters");
    e.status = 400;
    throw e;
  }
  const user = await User.findById(userId).select("+password");
  if (!user) {
    const e = new Error("User not found");
    e.status = 404;
    throw e;
  }

  const ok = await bcrypt.compare(
    currentPassword || "",
    user.password
  );
  if (!ok) {
    const e = new Error("Current password is incorrect");
    e.status = 400;
    throw e;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return { ok: true };
}
