import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axios";
import { IMovie, IVideo } from "../types/types";
import { API_CONFIG } from "@/config/constants";

export const useMovies = (fetchUrl: string) => {
  return useQuery({
    queryKey: ["movies", fetchUrl],
    queryFn: async () => {
      const response = await axios.get(fetchUrl);
      return response.data.results as IMovie[];
    },
    staleTime: 1000 * 60 * 60,
  });
};

export const useMovieTrailer = (movieId: number | null) => {
  return useQuery({
    queryKey: ["trailer", movieId],
    queryFn: async () => {
      if (!movieId) return null;

      const { data } = await axios.get(
        `${API_CONFIG.TMDB.ENDPOINTS.MOVIE}/${movieId}`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            append_to_response: API_CONFIG.TMDB.ENDPOINTS.TRAILER,
          },
        },
      );

      return (
        data.videos?.results?.find((vid: IVideo) => vid.type === "Trailer")
          ?.key || null
      );
    },
    enabled: !!movieId,
  });
};

export const useNetflixOriginals = () => {
  return useQuery({
    queryKey: ["netflixOriginals"],
    queryFn: async () => {
      const response = await axios.get(
        `${API_CONFIG.TMDB.API_BASE}discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_networks=213`,
      );
      return response.data.results as IMovie[];
    },
    select: (data: IMovie[]) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex] || {};
    },
  });
};
