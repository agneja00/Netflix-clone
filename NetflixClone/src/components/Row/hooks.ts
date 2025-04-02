import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import { IMovie, IVideo } from "../types/types";

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

      const { data } = await axios.get(`movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          append_to_response: "videos",
        },
      });

      return (
        data.videos?.results?.find((vid: IVideo) => vid.type === "Trailer")
          ?.key || null
      );
    },
    enabled: !!movieId,
  });
};
