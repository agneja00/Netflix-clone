import axios from "@/api/axios";
import { IGenre, IMovie, IVideo } from "@/components/types/types";
import requests from "@/api/requests";

export const fetchGenres = async (): Promise<IGenre[]> => {
  try {
    const res = await axios.get("/genre/movie/list");
    return res.data.genres || [];
  } catch {
    return [];
  }
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

    return (res.data.results || []).filter(
      (item: IMovie) => item.media_type === "movie" || item.media_type === "tv",
    );
  } catch (error) {
    return [];
  }
};
