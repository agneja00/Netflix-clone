import axios from "@/api/axios";
import requests from "@/api/requests";
import { IMovie } from "../types/types";

export const fetchNetflixOriginals = async (): Promise<IMovie[]> => {
  const response = await axios.get(requests.fetchNetflixOriginals);
  return response.data.results || [];
};
