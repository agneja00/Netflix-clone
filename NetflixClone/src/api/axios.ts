import axios from "axios";
import { API_CONFIG } from "../config/constants";

const instance = axios.create({
  baseURL: API_CONFIG.TMDB.API_BASE,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
