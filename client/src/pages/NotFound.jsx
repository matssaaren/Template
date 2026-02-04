// src/pages/NotFound.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div>
      <h1>404</h1>
      <p>Page not found.</p>
      <p>
        Tried to open: <code>{location.pathname}</code>
      </p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  );
}
