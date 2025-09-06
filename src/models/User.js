import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    username: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

// Reuse model if it already exists (dev HMR)
export const User = mongoose.models.User || mongoose.model("User", UserSchema);

