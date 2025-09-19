"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, Suspense } from "react";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";
import FormWrapper from "@/components/Forms/FormWrapper";
import FormField from "@/components/Forms/FormField";


export default function LoginPage() {
  const { authLoading, login } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "/";

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    useErrorTimeOut,
  } = useFormAndValidation();


  // general error message
  const [error, setError] = useState("");
  useErrorTimeOut(error, setError);

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    try {
      await login({ email, password });
      resetForm();
      router.replace(from);
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    }
  }

  return (
    <>
      <FormWrapper
        title="Login"
        onSubmit={handleSubmit}
        error={error}
        disabled={!isValid || authLoading}
        submitLabel={authLoading ? "Signing in..." : "Sign in"}
      >
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
          label="Password"
          name="password"
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <div className="mt-6 text-center text-sm text-zinc-400">
          <p>
            Don&apos;t have an account?{" "}
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
      </FormWrapper>
    </>
  );
}
