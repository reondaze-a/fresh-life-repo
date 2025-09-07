// app/register/page.jsx
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/profile"; // where to go after register
  const isModal = searchParams.get("modal") === "1"; // if used as intercepted modal

  const { register, authLoading } = useAuth();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  // local confirm password + validation
  const [confirm, setConfirm] = useState("");
  const confirmError = useMemo(() => {
    if (!values.password || !confirm) return "";
    return values.password !== confirm
      ? "Passwords do not match"
      : "";
  }, [values.password, confirm]);

  // general error message
  const [error, setError] = useState("");
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(t);
  }, [error]);

  const disabled = authLoading || !isValid || !!confirmError;

  async function handleSubmit(e) {
    e.preventDefault();
    if (confirmError) return;

    const payload = {
      firstName: values.firstName?.trim(),
      lastName: values.lastName?.trim(),
      email: values.email?.trim(),
      password: values.password,
      username: values.username?.trim() || undefined,
      avatar: values.avatar?.trim() || undefined, // URL string (optional)
    };

    try {
      await register(payload); // sets cookie server-side, hydrates user in context
      resetForm();
      setConfirm("");

      if (isModal) router.back();
      else router.replace(from);
    } catch (err) {
      setError(
        err?.message || "Registration failed. Please try again."
      );
    }
  }

  const inputBase = [
    "w-full rounded-lg px-3 py-2 outline-none",
    "bg-black text-white placeholder:text-zinc-500",
    "focus:ring-2 focus:ring-orange-500",
  ].join(" ");

  const borderOk = "border border-zinc-700";
  const borderErr = "border border-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-md p-6 animate-appear"
    >
      <h1 className="mb-4 text-3xl font-bold">Create your account</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* First Name */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            First name
          </span>
          <input
            name="firstName"
            type="text"
            required
            value={values.firstName || ""}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.firstName ? borderErr : borderOk
            }`}
            placeholder="Jane"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName}
            </p>
          )}
        </label>

        {/* Last Name */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Last name
          </span>
          <input
            name="lastName"
            type="text"
            required
            value={values.lastName || ""}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.lastName ? borderErr : borderOk
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName}
            </p>
          )}
        </label>

        {/* Username (optional) */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Username (optional)
          </span>
          <input
            name="username"
            type="text"
            value={values.username || ""}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.username ? borderErr : borderOk
            }`}
            placeholder="janedoe"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username}
            </p>
          )}
        </label>

        {/* Email */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Email
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email || ""}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.email ? borderErr : borderOk
            }`}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </label>

        {/* Password */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Password
          </span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={values.password || ""}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.password || confirmError ? borderErr : borderOk
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </label>

        {/* Confirm Password (client-only check) */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Confirm password
          </span>
          <input
            name="confirmPassword"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`${inputBase} ${
              confirmError ? borderErr : borderOk
            }`}
            placeholder="••••••••"
          />
          {confirmError && (
            <p className="mt-1 text-sm text-red-500">
              {confirmError}
            </p>
          )}
        </label>

        {/* Avatar URL (optional) */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Avatar URL (optional)
          </span>
          <input
            name="avatar"
            type="url"
            value={values.avatar || ""}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.avatar ? borderErr : borderOk
            }`}
            placeholder="https://example.com/me.jpg"
          />
          {errors.avatar && (
            <p className="mt-1 text-sm text-red-500">
              {errors.avatar}
            </p>
          )}
        </label>

        {/* General error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-red-500"
            aria-live="polite"
          >
            {error}
          </motion.p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={disabled}
          className={[
            "inline-block w-full rounded-lg px-4 py-2 font-semibold transition active:scale-[0.98]",
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-zinc-200",
          ].join(" ")}
        >
          {authLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
