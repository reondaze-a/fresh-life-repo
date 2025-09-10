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
    role: { type: String },
  },
  { timestamps: true }
);

// Find by email OR username, then compare password
UserSchema.statics.findUserByCredentials = async function (
  email,
  password
) {
  // Prefer direct email match when identifier looks like an email
  const user = await this.findOne(email).select("+password");
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error("Incorrect email or password");
  }

  return user; // password is selected here; don't send it back in responses
};

// Optional: auto-hash on save (only if you aren't hashing elsewhere)
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
