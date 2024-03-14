import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateOutlet() {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  return authContext.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default PrivateOutlet;
