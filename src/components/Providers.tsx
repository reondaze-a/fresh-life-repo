"use client"; // CHANGED: this wrapper is a client component

import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // CHANGED: You can pass baseUrl here or rely on NEXT_PUBLIC_API_BASE
    <AuthProvider autoLoginAfterRegister>
      {children}
    </AuthProvider>
  );
}
