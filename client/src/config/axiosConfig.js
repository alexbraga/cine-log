import axios from "axios";

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
  async (error) => {
    const originalRequest = error.config;

    try {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // If original request return error 401, send GET request to get new access token, then retry original request
        const res = await instance.get("/api/auth/token");
        if (res.status === 200) {
          return axios(originalRequest);
        } else {
          // If token refresh fails, reject the original request with a new error
          return Promise.reject(new Error("Token refresh failed"));
        }
      } else if (error.response.status === 403) {
        // If refresh token is not found or expired, redirect to `/error` where user is asked to log in again
        window.location.href = "/error";

        // Reject the promise to prevent the client from receiving the error
        return Promise.reject(error);
      } else {
        // For other errors, simply reject the promise
        return Promise.reject(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default instance;
