import { checkResponse, normalizeFetchError } from "@/lib/promiseCheckers";

export default function auth(
  baseUrl,
  routes = {
    signup: "/signup",
    signin: "/login",
    me: "/users/me",
  }
) {
  // in-memory token per instance (safe in browser tab)
  let _token = null;

  function setToken(token) {
    _token = token;
  }

  function authHeaders(extra = {}) {
    return {
      "Content-Type": "application/json",
      ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
      ...extra,
    };
  }

  // ensure auth calls are not cached by Next on server
  async function request(path, init = {}) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
        ...init,
      });
      return await checkResponse(res);
    } catch (err) {
      normalizeFetchError(err);
    }
  }

  function registerUser(payload) {
    return request(routes.signup, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  }

  function loginUser(payload) {
    return request(routes.signin, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  }

  function getUserData() {
    return request(routes.me, { headers: authHeaders() });
  }

  function updateUserData(payload) {
    return request(routes.me, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
  }

  return {
    setToken,
    registerUser,
    loginUser,
    getUserData,
    updateUserData,
  };
}

