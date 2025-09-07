// app/@modal/(.)logout/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modals/Modal";
import { useAuth } from "@/context/AuthContext";

export default function LogoutModal() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Prefetch the login page so the redirect feels instant
  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  async function handleConfirm() {
    if (loading) return; // guard: ignore double-clicks
    setLoading(true);
    setErr("");

    try {
      await logout(); // server clears cookie
      router.replace("/login"); // full-page nav, not intercepted
      // no finally setLoading(false) — let the unmount handle it after nav
    } catch (e) {
      setErr(e?.message || "Failed to log out.");
      setLoading(false); // keep modal open if it failed
    }
  }

  function handleCancel() {
    if (loading) return; // don't allow cancel during logout
    router.back();
  }

  return (
    <Modal>
      {/* Block interactions + show feedback while logging out */}
      <div className="relative">
        {loading && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center
                          rounded-xl bg-black/40 backdrop-blur-sm pointer-events-auto"
          >
            <span className="text-sm text-zinc-300">
              Signing out…
            </span>
          </div>
        )}

        <div
          className={
            loading
              ? "pointer-events-none select-none opacity-60"
              : ""
          }
        >
          <h2 className="mb-2 text-xl font-semibold text-white">
            Log out?
          </h2>
          <p className="mb-4 text-sm text-zinc-300">
            You’ll need to sign in again to access your profile and
            dashboard.
          </p>

          {err && <p className="mb-3 text-sm text-red-500">{err}</p>}

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              disabled={loading}
              aria-disabled={loading}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              aria-disabled={loading}
              className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
