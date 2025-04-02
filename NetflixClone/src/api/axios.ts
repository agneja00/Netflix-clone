import axios from "axios";
import { API_CONFIG } from "../config/constants";

const instance = axios.create({
  baseURL: API_CONFIG.TMDB.API_BASE,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export default instance;
