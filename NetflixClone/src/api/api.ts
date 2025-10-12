import axios from "@/api/axios";
import { IGenre, IMovie, IVideo } from "@/components/types/types";
import requests from "@/api/requests";
import { API_CONFIG } from "@/config/constants";

export const fetchGenres = async (): Promise<IGenre[]> => {
  try {
    const { data } = await axios.get("/genre/movie/list");
    return data.genres || [];
  } catch {
    return [];
  }
};

export const getGenreFetchUrl = (
  genreName: string,
  genres: IGenre[],
): string | null => {
  const genreMap: Record<string, keyof typeof requests> = {
    action: "fetchActionMovies",
    comedy: "fetchComedyMovies",
    horror: "fetchHorrorMovies",
    romance: "fetchRomanceMovies",
    documentaries: "fetchDocumentaries",
    trending: "fetchTrending",
    top_rated: "fetchTopRated",
  };

  const requestKey = genreMap[genreName.toLowerCase()];
  if (requestKey) {
    return requests[requestKey];
  }

  const matchedGenre = genres.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase(),
  );

  return matchedGenre
    ? `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=${matchedGenre.id}`
    : null;
};

export const fetchNetflixOriginals = async (): Promise<IMovie[]> => {
  const { data } = await axios.get(requests.fetchNetflixOriginals);
  return data.results || [];
};

export const fetchMoviesByUrl = async (url: string): Promise<IMovie[]> => {
  const { data } = await axios.get(url);
  return data.results || [];
};

export const fetchMovieDetails = async (
  id: number | string,
): Promise<IMovie & { videos?: { results: IVideo[] } }> => {
  const { data } = await axios.get(`/movie/${id}`, {
    params: { append_to_response: "videos" },
  });
  return data;
};

export const fetchMovieTrailer = async (
  movieId: number,
): Promise<string | null> => {
  const { data } = await axios.get(`/movie/${movieId}`, {
    params: { append_to_response: "videos" },
  });

  const trailer = data.videos?.results?.find(
    (vid: IVideo) => vid.type === "Trailer",
  );

  return trailer?.key || null;
};

export const fetchSearchResults = async (query: string): Promise<IMovie[]> => {
  if (!query.trim()) return [];

  try {
    const { data } = await axios.get("/search/multi", {
      params: {
        query: encodeURIComponent(query),
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return (data.results || [])
      .filter((item: IMovie) => ["movie", "tv"].includes(item.media_type ?? ""))
      .map((item: IMovie) => ({
        ...item,
        title: item.title || item.name || item.original_title,
        poster_path: item.poster_path || item.backdrop_path,
      }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export const fetchMoviesByYear = async (year: string): Promise<IMovie[]> => {
  if (!year) return [];

  const { data } = await axios.get("/discover/movie", {
    params: {
      primary_release_year: year,
      sort_by: "popularity.desc",
    },
  });

  return data.results || [];
};

export const fetchMoviesByRating = async (
  rating: string,
): Promise<IMovie[]> => {
  if (!rating) return [];

  const { data } = await axios.get("/discover/movie", {
    params: {
      "vote_average.gte": rating,
      sort_by: "vote_average.desc",
    },
  });

  return data.results || [];
};
