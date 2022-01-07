import React, { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function PrivateOutlet() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Intercept all responses from back-end and check whether or not a new access token is needed
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // If original request return error 401, send GET request to get new access token, then retry original request
        return axios.get("/auth/token").then((res) => {
          if (res.status === 200) {
            return axios(originalRequest);
          }
        });
      } else if (error.response.status === 403) {
        // If refresh token is not found or expired, redirect to `/error` where user is asked to log in again
        navigate("/error");
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );

  return authContext.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default PrivateOutlet;
