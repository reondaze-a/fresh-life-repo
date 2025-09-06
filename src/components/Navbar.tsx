"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          Fresh Life Church
        </Link>

        {/* CHANGED: softer press + hover, added transition/ease; added a11y attrs */}
        <button
          className="rounded-md p-2 ring-1 ring-zinc-700 md:hidden transition-transform duration-200 ease-out hover:bg-zinc-900/50 active:scale-[0.97]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu" // NEW: accessibility
          aria-expanded={open} // NEW: accessibility (reflects open state)
          aria-controls="mobile-nav" // NEW: ties button to menu container
        >
          ☰
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
            <Link className="hover:text-orange-500" href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="inline-block transition-transform duration-150 active:scale-95 hover:text-orange-500"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>

      {/* CHANGED: keep menu mounted and animate height+fade+slide using a grid-rows trick */}
      {/* - Was: {open && <ul>...} (mount/unmount) → Now: <div> with transition classes controlling height/opacity/translate */}
      {/* - Added pointer-events to prevent interaction while visually closed */}
      <div
        id="mobile-nav"
        className={[
          "md:hidden grid transition-all duration-300 ease-in-out", // NEW: animated container
          open
            ? "grid-rows-[1fr] opacity-100 translate-y-0" // NEW: opened state
            : "grid-rows-[0fr] opacity-0 -translate-y-1", // NEW: closed state
          open ? "pointer-events-auto" : "pointer-events-none", // NEW: block clicks when closed
        ].join(" ")}
      >
        {/* CHANGED: overflow-hidden on inner wrapper so the row height animation looks clean */}
        <ul className="mr-auto max-w-6xl overflow-hidden px-4 pb-3 items-center">
          <li>
            <Link
              className="block py-2 hover:text-orange-500 active:scale-95"
              href="/"
              onClick={() => setOpen(false)} // SAME: close menu on navigation
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 hover:text-orange-500 active:scale-95"
              href="/about"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 hover:text-orange-500 active:scale-95"
              href="/sermons"
              onClick={() => setOpen(false)}
            >
              Sermons
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 hover:text-orange-500 active:scale-95"
              href="/events"
              onClick={() => setOpen(false)}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 hover:text-orange-500 active:scale-95"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
