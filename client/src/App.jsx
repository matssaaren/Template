import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider.jsx";

export default function AppLayout() {
  const { isAuthed, isAdmin, logout, me } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>{" | "}
          {!isAuthed ? (
            <>
              <Link to="/login">Login</Link>{" | "}
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>Logged in as: {me?.user?.email || "user"}</span>{" | "}
              <button type="button" onClick={logout}>Logout</button>
            </>
          )}
          {isAdmin ? (
            <>
              {" | "}
              <Link to="/admin">Admin Panel</Link>
            </>
          ) : null}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
