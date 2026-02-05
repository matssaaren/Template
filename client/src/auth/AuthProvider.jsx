import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch, clearToken, getToken, setToken } from "../lib/auth.js";
import { API_URL } from "../config.js";
const AuthCtx = createContext(null);

export function useAuth() {
  return useContext(AuthCtx);
}

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null); // { user, isAdmin }

  async function refreshMe() {
    const token = getToken();
    if (!token) {
      setMe(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch(`${API_URL}/api/auth/me`);
      if (!res.ok) {
        clearToken();
        setMe(null);
        return;
      }
      const data = await res.json();
      setMe(data); // expects { user, isAdmin }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(token) {
    setToken(token);
    await refreshMe();
  }

  function logout() {
    clearToken();
    setMe(null);
  }

  const value = useMemo(
    () => ({
      loading,
      me,              // null or { user, isAdmin }
      isAuthed: !!me?.user,
      isAdmin: !!me?.isAdmin,
      login,
      logout,
      refreshMe,
    }),
    [loading, me]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
