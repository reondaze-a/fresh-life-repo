// app/register/page.jsx
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";
import FormWrapper from "@/components/Forms/FormWrapper";
import FormField from "@/components/Forms/FormField";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/profile"; // where to go after register

  const { register, authLoading } = useAuth();
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    errorTimeOut,
  } = useFormAndValidation();

  // general error message
  const [error, setError] = useState("");
  errorTimeOut(error, setError);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      firstName: values.firstName?.trim(),
      lastName: values.lastName?.trim(),
      email: values.email?.trim(),
      password: values.password,
    };

    try {
      await register(payload); // sets cookie server-side, hydrates user in context
      resetForm();
      router.replace(from);
    } catch (err) {
      setError(
        err?.message || "Registration failed. Please try again."
      );
    }
  }

  return (
    <FormWrapper
      title="Create an account"
      onSubmit={handleSubmit}
      error={error}
      disabled={!isValid || authLoading}
      submitLabel={authLoading ? "Registering..." : "Sign up"}
    >
      <FormField
        label="First Name"
        name="firstName"
        type="text"
        value={values.firstName || ""}
        onChange={handleChange}
        error={errors.firstName}
        required
        autoComplete=""
        placeholder="e.g John"
      />
      <FormField
        label="Last Name"
        name="lastName"
        type="text"
        value={values.lastName || ""}
        onChange={handleChange}
        error={errors.lastName}
        required
        autoComplete=""
        placeholder="e.g Doe"
      />
      <FormField
        label="Email"
        name="email"
        type="text"
        value={values.email || ""}
        onChange={handleChange}
        error={errors.email}
        required
        autoComplete="username email"
        placeholder="you@example.com"
      />
      <FormField
        label="Password (must be at least 6 characters)"
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
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword || ""}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        autoComplete="current-password"
        placeholder="••••••••"
      />

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
    </FormWrapper>
  );
}
