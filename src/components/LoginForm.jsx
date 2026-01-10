import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function LoginForm() {

  /* Set initial states */
  const { isLoggedIn, login } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function onSubmit(e) {

    /* Prevent reload */
    e.preventDefault();

    const result = login(user, pass);

    /* Error */
    if (!result.ok) setErr(result.message || "Login failed");
    else { setErr(""); setUser(""); setPass(""); }
  }

  if (isLoggedIn) return null;

  /* Actual login form */
  return (
    <form className="auth-card" onSubmit={onSubmit}>
      <h3 className="auth-title">Sign in</h3>
      {err && <div className="auth-error">{err}</div>}
      <label className="auth-label">Username</label>
      <input className="auth-input" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="admin" />
      <label className="auth-label">Password</label>
      <input className="auth-input" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="letmein" />
      <button className="auth-btn" type="submit">Login</button>
    </form>
  );
}
