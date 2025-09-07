// app/@modal/(.)logout/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/AuthContext";

export default function LogoutModal() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleConfirm() {
    setLoading(true);
    setErr("");
    try {
      await logout(); // calls /api/logout and clears context
      router.back(); // close modal back to background page
    } catch (e) {
      setErr(e?.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
      <h2 className="mb-2 text-xl font-semibold text-white">
        Log out?
      </h2>
      <p className="mb-4 text-sm text-zinc-300">
        You'll need to sign in again to access your profile and
        dashboard.
      </p>

      {err && <p className="mb-3 text-sm text-red-500">{err}</p>}

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => router.back()}
          className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 transition"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 active:scale-[0.98] transition"
          disabled={loading}
        >
          {loading ? "Logging out..." : "Log out"}
        </button>
      </div>
    </Modal>
  );
}
