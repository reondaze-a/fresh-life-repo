// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading, authLoading } = useAuth(); // ← pull loading too
  const [open, setOpen] = useState(false);

  const busy = loading || authLoading; // ← session restore OR auth in-flight
  const authHref = user ? "/profile" : "/login"; // ← no trailing space
  const authLabel = busy ? "Loading..." : user ? "Profile" : "Login";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          Fresh Life Church
        </Link>

        <button
          className="rounded-md p-2 ring-1 bg-zinc-100 ring-zinc-700 md:hidden transition duration-200 ease-out hover:bg-zinc-300/50 active:scale-[0.97]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          type="button"
        >
          <span aria-hidden className="text-black">
            ☰
          </span>
        </button>

        <ul className="hidden gap-6 md:flex">
          <li>
            <Link className="hover:text-orange-500" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500" href="/sermons">
              Sermons
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500" href="/events">
              Events
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500"
              href="/contact-us"
            >
              Contact
            </Link>
          </li>
          <li>
            {busy ? (
              <span className="opacity-70">{authLabel}</span>
            ) : (
              <Link
                href={authHref}
                className="inline-block transition-transform duration-150 active:scale-95 hover:text-orange-500"
              >
                {authLabel}
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <div
        id="mobile-nav"
        className={[
          "md:hidden grid transition-all duration-300 ease-in-out",
          open
            ? "grid-rows-[1fr] opacity-100 translate-y-0"
            : "grid-rows-[0fr] opacity-0 -translate-y-1",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <ul className="mr-auto max-w-6xl overflow-hidden px-4 pb-3 items-center">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Sermons", "/sermons"],
            ["Events", "/events"],
            ["Contact", "/contact-us"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link
                className="block py-2 hover:text-orange-500 active:scale-95"
                href={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            {busy ? (
              <span className="block py-2 opacity-70">
                Loading...
              </span>
            ) : (
              <Link
                href={authHref}
                className="block py-2 hover:text-orange-500 active:scale-95"
                onClick={() => setOpen(false)}
              >
                {authLabel}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
