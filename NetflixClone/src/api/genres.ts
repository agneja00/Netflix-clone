import axios from "@/api/axios";
import { IGenre } from "@/components/types/types";

export const fetchGenres = async (): Promise<IGenre[]> => {
  try {
    const res = await axios.get("/genre/movie/list");
    return res.data.genres || [];
  } catch (error) {
    return [];
  }
};
