import axios from "axios";
import { useNavigate } from "react-router-dom";

const isProduction = process.env.NODE_ENV === "production";

const url = isProduction
  ? process.env.REACT_APP_SERVER_URL_PROD
  : process.env.REACT_APP_SERVER_URL_DEV;

// Set up global axios instance
const instance = axios.create({
  baseURL: url, // Replace with your actual API base URL
  withCredentials: true, // If you need to include credentials (cookies, headers) with your requests
});

// Add global response interceptor
// Intercept all responses from back-end and check whether or not a new access token is needed
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If original request return error 401, send GET request to get new access token, then retry original request
      return instance.get("/api/auth/token").then((res) => {
        if (res.status === 200) {
          return axios(originalRequest);
        }
      });
    } else if (error.response.status === 403) {
      // If refresh token is not found or expired, redirect to `/error` where user is asked to log in again
      const navigate = useNavigate();
      navigate("/error");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
