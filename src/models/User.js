import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Must be a valid URL",
      },
    },
    role: { type: String, default: "member" },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

// Find by email, then compare password
UserSchema.statics.findUserByCredentials = async function (
  email,
  password
) {
  const login = String(email || "")
    .trim()
    .toLowerCase();

  const user = await this.findOne({ email: login }).select(
    "+password"
  );
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error("Incorrect email or password");
  }

  return user; // password is selected here; don't send it back in responses
};

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
