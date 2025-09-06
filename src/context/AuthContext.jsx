"use client"; // Context runs in the browser (uses localStorage, state, effects)

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import auth from "@/lib/auth"; // JS client from /lib/auth

// You can replace `any` with your real user shape via JSDoc later

const AuthContext = createContext(null);

export function AuthProvider({
  children,
  baseUrl,
  autoLoginAfterRegister = true,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // session restore
  const [authLoading, setAuthLoading] = useState(false); // login/register in-flight
  const [error, setError] = useState(null);


  const api = useMemo(() => {
    const resolved = baseUrl ?? process.env.NEXT_PUBLIC_API_BASE;
    if (!resolved) {
      // Helpful error if you forget to set .env
      console.warn(
        "AuthProvider: Missing API base URL. Set baseUrl prop or NEXT_PUBLIC_API_BASE in .env.local"
      );
    }
    return auth(resolved || ""); // empty string won't break if you override in tests
  }, [baseUrl]);

  // Restore session on mount from localStorage
  useEffect(() => {
    let mounted = true; // avoid state updates after unmount
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
        setUser(data);
      })
      .catch(() => {
        // clear broken session
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

  // login flow (store token -> fetch user -> set state)
  const login = async ({ identifier, password }) => {
    setAuthLoading(true);
    setError(null);
    try {
      const data = await api.loginUser({ identifier, password });
      if (!data?.token) throw new Error("Login did not return a token");
      localStorage.setItem("jwt", data.token);
      api.setToken(data.token);

      const userData = await api.getUserData();
      setUser(userData);

      return userData;
    } catch (err) {
      setError(err?.message || "Login failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // register flow; optionally auto-login
  const register = async (payload) => {
    setAuthLoading(true);
    setError(null);
    try {
      await api.registerUser(payload);

      if (autoLoginAfterRegister) {
        return await login({ identifier: payload.email, password: payload.password });
      }
    } catch (err) {
      setError(err?.message || "Registration failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // logout clears local state + token
  const logout = () => {
    localStorage.removeItem("jwt");
    api.setToken(null);
    setUser(null);
  };

  const value = {
    user,
    setUser,
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // helpful error if hook is used outside provider
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

