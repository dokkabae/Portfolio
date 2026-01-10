import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* Remember if the user is logged in */
const AuthContext = createContext(null);
const AUTH_KEY = "isLoggedIn";


export function AuthProvider({ children }) {

  /* Sets up state */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Check if the user was logged in */
  useEffect(() => {

    try {

      /* Convert string to boolean */
      const raw = localStorage.getItem(AUTH_KEY);
      setIsLoggedIn(raw === "true");

    } catch {

      setIsLoggedIn(false);
    }
  }, []);

  /* Hard coded login credentials */
  function login(username, password) {

    const okUser = username && username.trim().toLowerCase() === "admin";
    const okPass = password === "letmein";
  
    /* Log in if credentials were correct */
    if (okUser && okPass) {
      setIsLoggedIn(true);

      try { localStorage.setItem(AUTH_KEY, "true"); } catch {}

      return { ok: true };
    }
  
     /* Credentials were wrong */
    return { ok: false, message: "Invalid credentials" };
  }

  function logout() {

    setIsLoggedIn(false);

    /* Set LoggedIn to false in local storage */
    try { localStorage.setItem(AUTH_KEY, "false"); } catch {}
  }

  /* Causes re-render only when login is changed */
  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  /* Provides Auth features to children(APP) */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");

  return ctx;
}
