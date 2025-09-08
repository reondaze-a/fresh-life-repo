// app/@modal/(.)logout/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modals/Modal";

export default function LogoutModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    if (loading) return; // don't allow cancel mid-logout
    router.back();
  }

  function handleConfirm() {
    if (loading) return;
    setLoading(true); // immediately switch UI to "Signing out..."

    // Fire-and-forget server logout. keepalive lets it complete after nav.
    fetch("/api/logout", { method: "POST", keepalive: true }).catch(
      () => {}
    );

    // Give React a tick to paint "Signing out…" then hard-nav to full login page
    setTimeout(() => {
      window.location.assign("/login");
    }, 50);
  }

  return (
    <Modal>
      {loading ? (
        <div
          role="status"
          aria-live="polite"
          className="py-2 text-sm text-zinc-300"
        >
          Signing out…
        </div>
      ) : (
        <>
          <h2 className="mb-2 text-xl font-semibold text-white">
            Log out?
          </h2>
          <p className="mb-4 text-sm text-zinc-300">
            You’ll need to sign in again to access your profile and
            dashboard.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 active:scale-[0.98] transition"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
