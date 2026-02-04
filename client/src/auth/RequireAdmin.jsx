import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function RequireAdmin() {
  const { loading, isAuthed, isAdmin } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuthed) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
