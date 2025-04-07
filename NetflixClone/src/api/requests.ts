import { API_CONFIG } from "../config/constants";

const requests = {
  fetchTrending: `${API_CONFIG.TMDB.API_BASE}trending/all/week?language=en-US`,
  fetchNetflixOriginals: `${API_CONFIG.TMDB.API_BASE}discover/tv?with_networks=213&language=en-US`,
  fetchTopRated: `${API_CONFIG.TMDB.API_BASE}movie/top_rated?language=en-US`,
  fetchActionMovies: `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=28`,
  fetchComedyMovies: `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=35`,
  fetchHorrorMovies: `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=27`,
  fetchRomanceMovies: `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=10749`,
  fetchDocumentaries: `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=99`,
};

export default requests;
