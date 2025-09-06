// app/login/page.jsx
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // read ?from=/some/path (fallback to home)
  const from = searchParams.get("from") || "/";
  // optional: if you show this in an intercepted modal, pass ?modal=1 and we’ll router.back() after success
  const isModal = searchParams.get("modal") === "1";

  const { login, authLoading } = useAuth();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [error, setError] = useState("");

  // auto-clear general error after 4s
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(t);
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { identifier, password } = values;

    try {
      await login({ identifier, password });
      setError("");
      resetForm();
      if (isModal) {
        router.back();
      } else {
        router.replace(from);
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
      // console.error(err); // optional
    }
  }

  const disabled = !isValid || authLoading;

  return (
    <div className="mx-auto max-w-md p-6 animate-appear">
      <h1 className="mb-4 text-3xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Username / Email */}
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">
            Username / Email
          </span>
          <input
            name="identifier"
            type="text"
            value={values.identifier || ""}
            onChange={handleChange}
            required
            autoComplete="username email"
            placeholder="you@example.com"
            className={[
              "w-full rounded-lg px-3 py-2 outline-none",
              "bg-black text-white placeholder:text-zinc-500",
              "focus:ring-2 focus:ring-orange-500",
              errors.identifier || error
                ? "border border-red-500"
                : "border border-zinc-700",
            ].join(" ")}
          />
          {errors.identifier && (
            <p className="mt-1 text-sm text-red-500">
              {errors.identifier}
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
            value={values.password || ""}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={[
              "w-full rounded-lg px-3 py-2 outline-none",
              "bg-black text-white placeholder:text-zinc-500",
              "focus:ring-2 focus:ring-orange-500",
              errors.password || error
                ? "border border-red-500"
                : "border border-zinc-700",
            ].join(" ")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
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
          {authLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* Extra links */}
      <div className="mt-6 text-center text-sm text-zinc-400">
        <p>
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-orange-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
        <p className="mt-2">
          <Link
            href="/forgot"
            className="text-orange-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
}
