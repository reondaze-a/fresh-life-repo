import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl p-6 animate-appear">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-zinc-300 mb-3">
        We couldn&apos;t find what you&apos;re looking for.
      </p>
      <Link
        className="text-white hover:text-orange-400 transition-colors duration-200 ease-in-out"
        href="/"
      >
        Go back to Home
      </Link>
    </div>
  );
}

