// src/context/AuthContext.jsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import auth from "@/lib/authRequest"; // make sure this is the cookie-first client (no Bearer header)

const AuthContext = createContext(null);

export function AuthProvider({
  children,
  baseUrl = "/api", // same-origin by default
  autoLoginAfterRegister = true,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // restoring session
  const [authLoading, setAuthLoading] = useState(false); // login/register in-flight
  const [error, setError] = useState(null);

  // Build API client (cookie-based fetch)
  const api = useMemo(() => auth(baseUrl), [baseUrl]);

  // Restore session on mount by asking the server who we are (cookie is sent automatically)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getUserData(); // expects { user } (401 if not logged in)
        if (!mounted) return;
        setUser(data.user ?? data);
      } catch {
        if (!mounted) return;
        setUser(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [api]);

  // LOGIN: call /api/login, then /api/users/me
  const login = async ({ email, password }) => {
    setAuthLoading(true);
    setError(null);
    try {
      const me = await api.loginUser({ email, password });
      setUser(me.user ?? me);
      return me.user ?? me;
    } catch (err) {
      const msg = err?.message || "Login failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  // REGISTER: call /api/register (cookie set there as well), then hydrate
  const register = async (payload) => {
    setAuthLoading(true);
    setError(null);
    try {
      const res = await api.registerUser(payload); // cookie set by server
      if (autoLoginAfterRegister) {
        // Either use returned user or call /me to be safe
        const me = res?.user ? res : await api.getUserData();
        setUser((me.user ?? me) || null);
        return (me.user ?? me) || null;
      }
    } catch (err) {
      const msg = err?.message || "Registration failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  // LOGOUT: tell server to delete cookie, then clear local state
  const logout = async () => {
    try {
      await api.logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn: !!user,
    loading,
    authLoading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
