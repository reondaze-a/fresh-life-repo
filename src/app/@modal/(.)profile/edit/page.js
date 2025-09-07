// app/@modal/(.)profile/edit/page.jsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modals/Modal";
import { useAuth } from "@/context/AuthContext";

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [form, setForm] = useState(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  }));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const disabled = useMemo(() => {
    if (
      !form.firstName?.trim() ||
      !form.lastName?.trim() ||
      !form.email?.trim()
    )
      return true;
    return saving;
  }, [form, saving]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErr("");

    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          username: form.username?.trim() || undefined,
          email: form.email.trim(),
          avatar: form.avatar?.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Update failed");

      // Update auth context with the returned user
      setUser(data.user || null);

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

      <form onSubmit={onSubmit} className="space-y-3">
        <Field
          label="First name"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
        />
        <Field
          label="Last name"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          required
        />
        <Field
          label="Username (optional)"
          name="username"
          value={form.username}
          onChange={onChange}
        />
        <Field
          type="email"
          label="Email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <Field
          type="url"
          label="Avatar URL (optional)"
          name="avatar"
          value={form.avatar}
          onChange={onChange}
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
            disabled={disabled}
            className={[
              "rounded-lg px-4 py-2 font-semibold transition active:scale-[0.98]",
              disabled
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

/* --- Small reusable field --- */
function Field({
  label,
  name,
  value,
  onChange,
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
          "border border-zinc-700 focus:ring-2 focus:ring-orange-500",
        ].join(" ")}
        placeholder={label}
      />
    </label>
  );
}
