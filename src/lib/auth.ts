// CHANGED: TypeScript + explicit route typing + default routes.
// CHANGED: request() defaults to { cache: 'no-store' } for auth endpoints.
// IMPORTANT: The in-memory token is per auth() *instance*.
// - Use a single instance in the BROWSER (client components) and call setToken().
// - On the SERVER (route handlers / server components), create a NEW instance per request
//   and read the token from cookies; DO NOT keep a singleton on the server.

import { checkResponse, normalizeFetchError } from "@/lib/promiseCheckers";

export type AuthRoutes = {
  signup: string;
  signin: string;
  me: string;
};

export type AuthClient = {
  setToken: (token: string | null) => void;
  registerUser: (payload: {
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    password: string;
  }) => Promise<unknown>;
  loginUser: (payload: { identifier: string; password: string }) => Promise<unknown>;
  getUserData: () => Promise<unknown>;
  updateUserData: (payload: { name?: string; avatar?: string }) => Promise<unknown>;
};

export default function auth(
  baseUrl: string,
  routes: AuthRoutes = {
    signup: "/signup",
    signin: "/login",
    me: "/users/me",
  }
): AuthClient {
  // SAME IDEA: in-memory token per instance (safe in browser tab).
  // IMPORTANT: Don't share this instance across server requests.
  let _token: string | null = null;

  function setToken(token: string | null) {
    _token = token;
  }

  function authHeaders(extra: HeadersInit = {}) {
    return {
      "Content-Type": "application/json",
      ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
      ...extra,
    };
  }

  // CHANGED: no-store to avoid Next caching sensitive calls
  async function request<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        // CHANGED: ensure auth calls are not cached by Next on server
        cache: "no-store",
        ...init,
      });
      return await checkResponse<T>(res);
    } catch (err) {
      normalizeFetchError(err);
    }
  }

  // --- API Methods (same signatures, typed) ---
  function registerUser(payload: {
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    password: string;
  }) {
    return request(routes.signup, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  }

  function loginUser(payload: { identifier: string; password: string }) {
    return request(routes.signin, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  }

  function getUserData() {
    return request(routes.me, { headers: authHeaders() });
  }

  function updateUserData(payload: { name?: string; avatar?: string }) {
    return request(routes.me, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  }

  return {
    setToken, // SAME: set in-memory token (browser) or per request (server)
    registerUser,
    loginUser,
    getUserData,
    updateUserData,
  };
}
