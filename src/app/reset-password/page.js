// app/forgot/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import FormWrapper from "@/components/Forms/FormWrapper";
import FormField from "@/components/Forms/FormField";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    useErrorTimeOut,
  } = useFormAndValidation();

  const token = searchParams.get("token"); // token from links

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // auto-clear general error after 4s
  useErrorTimeOut(error, setError);

  async function onSubmit(e) {
    const { password } = values;
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await resetPassword({ token, password });
      resetForm();
      setSent(true);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    // disables direct access to route
    return (
      <div className="mx-auto max-w-md p-6 min-h-svh text-white">
        <h1 className="text-zinc-300 text-3xl font-bold">Error.</h1>
        <p className="text-zinc-300 mb-6">
          Invalid or missing reset link.
        </p>
        <Link
          href="/forgot"
          className="inline-block rounded-lg bg-white text-black px-4 py-2 font-semibold hover:bg-zinc-200 transition"
        >
          Resend link
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-md p-6 min-h-svh text-white">
        <h1 className="mb-2 text-3xl font-bold">
          Password has been reset!
        </h1>
        <p className="text-zinc-300 mb-6">
          You can go back and login with your new password.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg bg-white text-black px-4 py-2 font-semibold hover:bg-zinc-200 transition"
        >
          Back to login
        </Link>
      </div>
    );
  }

  const disabled = loading || !isValid;

  return (
    <FormWrapper
      title="Reset your password"
      onSubmit={onSubmit}
      error={error}
      disabled={disabled}
      submitLabel={loading ? "Resetting..." : "Reset password"}
    >
      <FormField
        label="New password"
        name="password"
        type="password"
        value={values.password || ""}
        onChange={handleChange}
        error={errors.password}
        required
        autoComplete="current-password"
        placeholder="••••••••"
      />
      <FormField
        label="Confirm new password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword || ""}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        autoComplete="current-password"
        placeholder="••••••••"
      />
      <p className="text-sm text-zinc-400">
        Enter your new password.
      </p>
    </FormWrapper>
  );
}
