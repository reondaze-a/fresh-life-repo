// NEW: canonical /login page (works on refresh/direct link)
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // NOTE: wire your real auth here (Auth.js/NextAuth, server actions, etc.)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, pass });
  };

  return (
    <div className="mx-auto max-w-md p-6 animate-appear">
      <h1 className="mb-4 text-3xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">Email</span>
          <input
            className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-zinc-300">Password</span>
          <input
            className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="inline-block w-full rounded-lg bg-white px-4 py-2 font-semibold text-black transition active:scale-[0.98] hover:bg-zinc-200"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
