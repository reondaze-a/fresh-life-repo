// app/profile/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PageLayout from "@/components/PageLayout";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?from=/profile");
    }
  }, [loading, user, router]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-white">
        <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-6" />
        <div className="flex gap-6">
          <div className="w-32 h-32 rounded-full bg-zinc-800 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-64 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-72 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // After redirect, avoid flashing content
  if (!user) return null;

  const first = user.firstName?.trim?.() || "";
  const last = user.lastName?.trim?.() || "";
  const initials =
    first[0]?.toUpperCase?.() ||
    user.username?.[0]?.toUpperCase?.() ||
    user.email?.[0]?.toUpperCase?.() ||
    "?";

  const handleLogout = () => {
    // If you use intercepted modal for logout, navigate to it:
    router.push("/logout?modal=1");
  };

  return (
    <PageLayout>
      <div className="items-center justify-start px-4 py-8 text-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full max-w-4xl">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden text-4xl font-bold text-orange-500">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={`${first} ${last} avatar`}
                className="object-cover w-full h-full"
              />
            ) : (
              initials
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold">
              {first || "User"} {last}
            </h1>
            {user.username && (
              <p className="text-lg text-gray-400">
                @{user.username}
              </p>
            )}
            {user.email && (
              <p className="mt-2 text-gray-300">{user.email}</p>
            )}

            <p className="mt-4 text-gray-400 italic">
              {user.bio?.trim?.() ||
                "This is your bio. Tell the world about yourself."}
            </p>

            {/* Actions */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
              >
                Logout
              </button>
              <button
                onClick={() => router.push("/profile/edit?modal=1")}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
