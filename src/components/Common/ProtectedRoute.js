// File: src/components/Common/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
  const { userId, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
