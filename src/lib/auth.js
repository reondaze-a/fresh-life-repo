// src/utils/authClient.js
import {
  checkResponse,
  normalizeFetchError,
} from "@/lib/promiseCheckers";

/**
 * Cookie-first auth client for Next route handlers at /api/*
 * - No in-memory token, no Authorization header needed
 * - Browser auto-sends httpOnly "auth" cookie on same-origin requests
 */
export default function auth(
  baseUrl = "/api",
  routes = { signup: "/register", signin: "/login", me: "/users/me" }
) {
  async function request(path, init = {}) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
        // same-origin (default) includes cookies automatically
        credentials: "same-origin",
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init.headers || {}),
        },
      });
      return await checkResponse(res);
    } catch (err) {
      normalizeFetchError(err);
    }
  }

  function registerUser(payload) {
    return request(routes.signup, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  function loginUser(payload) {
    return request(routes.signin, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  function getUserData() {
    return request(routes.me);
  }

  function updateUserData(payload) {
    return request(routes.me, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  return {
    registerUser,
    loginUser,
    getUserData,
    updateUserData,
  };
}
