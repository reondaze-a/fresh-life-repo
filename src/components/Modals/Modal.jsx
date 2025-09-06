"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children, title = "Dialog" }) {
  const router = useRouter();
  const ref = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") router.back(); // go back to previous route
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  // Focus the modal container on mount
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => router.back()} // click backdrop to close
      />

      {/* Panel */}
      <div
        ref={ref}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-800 bg-black p-6 shadow-2xl"
      >
        {children}
        <button
          onClick={() => router.back()}
          className="mt-4 w-full rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-900 active:scale-[0.98]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

