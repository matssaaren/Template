// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";
import { API_URL } from "../config.js";


export default function Register() {
  const nav = useNavigate();
  const auth = useAuth();
  const [name, setName] = useState("");
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
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Register failed (${res.status})`);
      }

      const data = await res.json();
      // TEMPLATE: you might get { token, user } back
      // localStorage.setItem("token", data.token);

      nav("/");
    } catch (err) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Register</h1>

      {error ? <p>{error}</p> : null}

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Name
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
