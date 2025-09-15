// app/forgot/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FormWrapper from "@/components/Forms/FormWrapper";
import FormField from "@/components/Forms/FormField";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

export default function ForgotPage() {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    errorTimeOut,
  } = useFormAndValidation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // auto-clear general error after 4s
  errorTimeOut(error, setError);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // some backends always return 200 for privacy; this page works with either
        body: JSON.stringify({ email: values.email || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.message || "Something went wrong");

      setSent(true);
      resetForm();
    } catch (e) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // success state (generic on purpose: don't reveal if email exists)
  if (sent) {
    return (
      <div className="mx-auto max-w-md p-6 min-h-svh text-white">
        <h1 className="mb-2 text-3xl font-bold">Check your email</h1>
        <p className="text-zinc-300 mb-6">
          If an account exists for that address, we've sent a password
          reset link.
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
      title="Forgot password"
      onSubmit={onSubmit}
      error={error}
      disabled={disabled}
      submitLabel={loading ? "Sending..." : "Send reset link"}
    >
      <FormField
        label="Email"
        name="email"
        type="email"
        value={values.email || ""}
        onChange={handleChange}
        error={errors.email}
        required
        autoComplete="email"
        placeholder="you@example.com"
      />
      <p className="text-sm text-zinc-400">
        Enter your email and we'll send you a link to reset your
        password.
      </p>
    </FormWrapper>
  );
}
