"use client"; // CHANGED: Context runs in the browser (uses localStorage, state, effects)

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import auth, { type AuthClient } from "@/lib/auth"; // CHANGED: TypeScript client from /lib/auth

// NEW: Shape of the login response (adjust if your API differs)
type LoginResponse = { token: string; [k: string]: unknown };

// NEW: You can replace `any` with your real user type
export type User = any;

type AuthContextValue = {
  user: User | null;
  setUser: (u: User | null) => void; // SAME intent: expose for profile updates
  loading: boolean; // SAME: session restore loading
  authLoading: boolean; // SAME: login/register in-flight
  error: string | null;
  login: (payload: { identifier: string; password: string }) => Promise<User | undefined>;
  register: (payload: {
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    password: string;
  }) => Promise<User | undefined>;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  baseUrl?: string; // SAME: allow overriding API base
  autoLoginAfterRegister?: boolean; // SAME default true
};

export function AuthProvider({
  children,
  baseUrl,
  autoLoginAfterRegister = true, // SAME default
}: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // SAME: session restore
  const [authLoading, setAuthLoading] = useState(false); // SAME: auth in-flight
  const [error, setError] = useState<string | null>(null);

  // CHANGED: Create ONE auth client instance per provider (stable across renders)
  // - Prefer NEXT_PUBLIC_ env var in Next.js instead of import.meta.env
  // - If baseUrl not provided, read from process.env.NEXT_PUBLIC_API_BASE
  const api: AuthClient = useMemo(() => {
    const resolved = baseUrl ?? process.env.NEXT_PUBLIC_API_BASE;
    if (!resolved) {
      // Helpful error if you forget to set .env
      console.warn(
        "AuthProvider: Missing API base URL. Set baseUrl prop or NEXT_PUBLIC_API_BASE in .env.local"
      );
    }
    return auth(resolved || ""); // empty string won't break if you override in tests
  }, [baseUrl]);

  // SAME: Restore session on mount from localStorage
  useEffect(() => {
    let mounted = true; // NEW: avoid state updates after unmount
    const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

    if (!jwt) {
      setLoading(false);
      return;
    }

    api.setToken(jwt);

    api
      .getUserData()
      .then((data) => {
        if (!mounted) return;
        setUser(data as User);
      })
      .catch(() => {
        // SAME: clear broken session
        if (!mounted) return;
        localStorage.removeItem("jwt");
        api.setToken(null);
        setUser(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [api]);

  // SAME: login flow (store token → fetch user → set state)
  const login = async ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => {
    setAuthLoading(true);
    setError(null);
    try {
      const data = (await api.loginUser({ identifier, password })) as LoginResponse; // CHANGED: typed
      if (!data?.token) throw new Error("Login did not return a token");
      localStorage.setItem("jwt", data.token);
      api.setToken(data.token);

      const userData = (await api.getUserData()) as User;
      setUser(userData);

      return userData;
    } catch (err: any) {
      setError(err?.message || "Login failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // SAME: register flow; optionally auto-login
  const register = async (payload: {
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    password: string;
  }) => {
    setAuthLoading(true);
    setError(null);
    try {
      await api.registerUser(payload);

      if (autoLoginAfterRegister) {
        return await login({ identifier: payload.email, password: payload.password });
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // SAME: logout clears local state + token
  const logout = () => {
    localStorage.removeItem("jwt");
    api.setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    setUser, // SAME: expose so profile edits can update context
    loading,
    authLoading,
    error,
    login,
    register,
    logout,
    isLoggedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // NEW: helpful error if hook is used outside provider
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
