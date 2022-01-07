import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PublicRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/diary" /> : <Outlet />;
}

export default PublicRoute;
