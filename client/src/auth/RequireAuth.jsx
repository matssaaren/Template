import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function RequireAuth() {
  const { loading, isAuthed } = useAuth();
  const loc = useLocation();

  if (loading) return <p>Loading...</p>;
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}
