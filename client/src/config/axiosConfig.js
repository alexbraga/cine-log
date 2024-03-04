import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const url = isProduction
  ? process.env.REACT_APP_SERVER_URL_PROD
  : process.env.REACT_APP_SERVER_URL_DEV;

const instance = axios.create({
  baseURL: url, // Replace with your actual API base URL
  withCredentials: true, // If you need to include credentials (cookies, headers) with your requests
});

export default instance;
