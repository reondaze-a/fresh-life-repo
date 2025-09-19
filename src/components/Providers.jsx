"use client"; // this wrapper is a client component

import { AuthProvider } from "@/context/AuthContext";
import { QueryParamsProvider } from "@/context/QueryParamsContext";

export default function Providers({ children }) {
  return (
    // You can pass baseUrl here or rely on NEXT_PUBLIC_API_BASE
    <AuthProvider autoLoginAfterRegister>
      <QueryParamsProvider>{children}</QueryParamsProvider>
    </AuthProvider>
  );
}
