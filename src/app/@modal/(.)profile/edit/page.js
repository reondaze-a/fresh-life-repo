// app/@modal/(.)profile/edit/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modals/Modal";
import { useAuth } from "@/context/AuthContext";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // prefill form with user data
  useEffect(() => {
    if (user) {
      resetForm(
        {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          avatar: user.avatar || "",
        },
        {},
        true
      );
    }
  }, [user, resetForm]);

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErr("");

    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          avatar: values.avatar?.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Update failed");

      setUser(data.user || null); // update context
      router.back(); // close modal
    } catch (e) {
      setErr(e?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal>
      <h2 className="mb-4 text-xl font-semibold text-white">
        Edit profile
      </h2>

      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        <Field
          label="First name"
          name="firstName"
          value={values.firstName || ""}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <Field
          label="Last name"
          name="lastName"
          value={values.lastName || ""}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
        <Field
          type="email"
          label="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Field
          type="url"
          label="Avatar URL (optional)"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          error={errors.avatar}
        />

        {err && <p className="text-sm text-red-500">{err}</p>}

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !isValid}
            className={[
              "rounded-lg px-4 py-2 font-semibold transition active:scale-[0.98]",
              saving || !isValid
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-zinc-200",
            ].join(" ")}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* --- Reusable field --- */
function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-zinc-300">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={[
          "w-full rounded-lg px-3 py-2 outline-none",
          "bg-black text-white placeholder:text-zinc-500",
          "border focus:ring-2 focus:ring-orange-500",
          error ? "border-red-500" : "border-zinc-700",
        ].join(" ")}
        placeholder={label}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </label>
  );
}
