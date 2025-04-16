import { useQuery } from "@tanstack/react-query";
import {
  fetchGenres,
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchMoviesByUrl,
  fetchNetflixOriginals,
  fetchSearchResults,
} from "@/api/api";
import { IGenre, IMovie } from "@/components/types/types";

export const useMovies = (fetchUrl: string) => {
  return useQuery({
    queryKey: ["movies", fetchUrl],
    queryFn: () => fetchMoviesByUrl(fetchUrl),
    staleTime: 1000 * 60 * 60,
  });
};

export const useMovieTrailer = (movieId: number | null) => {
  return useQuery({
    queryKey: ["trailer", movieId],
    queryFn: () => (movieId ? fetchMovieTrailer(movieId) : null),
    enabled: !!movieId,
  });
};

export const useNetflixOriginals = () => {
  return useQuery({
    queryKey: ["netflixOriginals"],
    queryFn: fetchNetflixOriginals,
    select: (data: IMovie[]) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex] || {};
    },
  });
};

export const useGenres = () => {
  return useQuery<IGenre[]>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMovieDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
  });
};
