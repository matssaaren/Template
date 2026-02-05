// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";
import { API_URL } from "../config.js";
export default function Login() {
  const nav = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TEMPLATE: change URL to your backend
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // TEMPLATE: your API may return { error: "..." }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Login failed (${res.status})`);
      }

      const data = await res.json();
      // TEMPLATE: usually { token, user }
      // localStorage.setItem("token", data.token);

      // nav("/") after success
      // expects { token, user }
      await auth.login(data.token);
      nav("/");

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {error ? <p>{error}</p> : null}

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
