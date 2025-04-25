import { useQuery } from "@tanstack/react-query";
import {
  fetchGenres,
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchMoviesByRating,
  fetchMoviesByUrl,
  fetchMoviesByYear,
  fetchNetflixOriginals,
  fetchSearchResults,
} from "@/api/api";
import { IGenre, IMovie } from "@/components/types/types";

export const useMovies = (fetchUrl: string, options = {}) =>
  useQuery({
    queryKey: ["movies", fetchUrl],
    queryFn: () => fetchMoviesByUrl(fetchUrl),
    staleTime: 1000 * 60 * 60,
    ...options,
  });

export const useMovieTrailer = (movieId: number | null) =>
  useQuery({
    queryKey: ["trailer", movieId],
    queryFn: () => (movieId ? fetchMovieTrailer(movieId) : null),
    enabled: !!movieId,
  });

export const useNetflixOriginals = () =>
  useQuery({
    queryKey: ["netflixOriginals"],
    queryFn: fetchNetflixOriginals,
    select: (data: IMovie[]) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex] || {};
    },
  });

export const useGenres = () =>
  useQuery<IGenre[]>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });

export const useMoviesByYear = (year?: string) =>
  useQuery({
    queryKey: ["moviesByYear", year],
    queryFn: () => (year ? fetchMoviesByYear(year) : Promise.resolve([])),
    enabled: !!year,
  });

export const useMoviesByRating = (rating?: string) =>
  useQuery({
    queryKey: ["moviesByRating", rating],
    queryFn: () => (rating ? fetchMoviesByRating(rating) : Promise.resolve([])),
    enabled: !!rating,
  });

export const useMovieDetails = (id?: string) =>
  useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
  });

export const useSearchMovies = (query: string) =>
  useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
  });
