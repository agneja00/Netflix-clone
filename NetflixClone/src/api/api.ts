import axios from "@/api/axios";
import { IGenre, IMovie, IVideo } from "@/components/types/types";
import requests from "@/api/requests";
import { API_CONFIG } from "@/config/constants";

export const fetchGenres = async (): Promise<IGenre[]> => {
  try {
    const res = await axios.get("/genre/movie/list");
    return res.data.genres || [];
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

  const selectedGenre = genres.find(
    (g) => g.name.toLowerCase() === genreName.toLowerCase(),
  );

  return selectedGenre
    ? `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=${selectedGenre.id}`
    : null;
};

export const fetchNetflixOriginals = async (): Promise<IMovie[]> => {
  const response = await axios.get(requests.fetchNetflixOriginals);
  return response.data.results || [];
};

export const fetchMoviesByUrl = async (url: string): Promise<IMovie[]> => {
  const res = await axios.get(url);
  return res.data.results || [];
};

export const fetchMovieDetails = async (
  id: number | string,
): Promise<IMovie & { videos?: { results: IVideo[] } }> => {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      append_to_response: "videos",
    },
  });
  return data;
};

export const fetchMovieTrailer = async (
  movieId: number,
): Promise<string | null> => {
  const { data } = await axios.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos",
    },
  });
  return (
    data.videos?.results?.find((vid: IVideo) => vid.type === "Trailer")?.key ||
    null
  );
};

export const fetchSearchResults = async (query: string): Promise<IMovie[]> => {
  if (!query.trim()) return [];

  try {
    const res = await axios.get("/search/multi", {
      params: {
        query: encodeURIComponent(query),
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return (res.data.results || [])
      .filter(
        (item: IMovie) =>
          item.media_type === "movie" || item.media_type === "tv",
      )
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
