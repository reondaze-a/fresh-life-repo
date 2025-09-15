// src/utils/authClient.js
import {
  checkResponse,
  normalizeFetchError,
} from "@/lib/promiseCheckers";

/**
 * Cookie-first auth client for Next /api/*.
 * - Same-origin: cookies are sent automatically.
 * - If you later call a different origin, switch credentials to "include"
 *   and set SameSite=None; Secure server-side.
 */
export default function auth(
  baseUrl = "/api",
  routes = {
    signup: "/register",
    signin: "/login",
    logout: "/logout",
    me: "/users/me",
    forgot: "/forgot",
  }
) {
  async function request(path, init = {}) {
    const hasBody = init.body != null;

    try {
      const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
        credentials: "same-origin", // default on same origin; harmless to keep
        ...init,
        headers: {
          ...(hasBody ? { "Content-Type": "application/json" } : {}),
          ...(init.headers || {}),
        },
      });
      return await checkResponse(res); // should parse JSON or throw on !ok
    } catch (err) {
      // Important: let callers .catch(...) properly
      throw normalizeFetchError(err);
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
    return request(routes.me); // GET, no headers/body
  }

  function updateUserData(payload) {
    return request(routes.me, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  function logoutUser() {
    return request(routes.logout, {
      method: "POST",
      credentials: "same-origin",
    });
  }

  function forgotPassword(payload) {
    return request(routes.forgot, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  return { registerUser, loginUser, getUserData, updateUserData, logoutUser, forgotPassword };
}
