import { useParams, useNavigate } from "react-router-dom";
import { useGenres } from "../../hooks/hooks";
import Banner from "@/components/Banner/Banner";
import Row from "@/components/Row/Row";
import GenreFilter from "@/components/GenreFilter/GenreFilter";
import { API_CONFIG } from "@/config/constants";
import { ROUTES } from "@/constants/routes";
import requests from "@/api/requests";

const genreMap: Record<string, keyof typeof requests> = {
  action: "fetchActionMovies",
  comedy: "fetchComedyMovies",
  horror: "fetchHorrorMovies",
  romance: "fetchRomanceMovies",
  documentaries: "fetchDocumentaries",
};

const MoviesByGenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
  const { data: genres = [], isLoading } = useGenres();

  if (isLoading) return <div>Loading genres...</div>;

  const selectedGenre = genres.find(
    (g) => g.name.toLowerCase() === genre?.toLowerCase(),
  );

  if (!selectedGenre) return <div>Genre not found</div>;

  const requestKey = genreMap[genre?.toLowerCase() || ""];
  const fetchUrl = requestKey
    ? requests[requestKey]
    : `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=${selectedGenre.id}`;

  const handleGenreSelect = (genreName: string | null) => {
    if (genreName) {
      navigate(`${ROUTES.MOVIES_BY_GENRE.replace(":genre", genreName)}`);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <>
      <Banner />
      <GenreFilter
        selectedGenreName={genre?.toLowerCase() || null}
        onSelectGenre={handleGenreSelect}
      />
      <Row
        genre
        category={`${selectedGenre.name} Movies`}
        fetchUrl={fetchUrl}
      />
    </>
  );
};

export default MoviesByGenrePage;
