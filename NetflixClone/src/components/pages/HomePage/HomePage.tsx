import { useNavigate } from "react-router-dom";
import GenreFilter from "@/components/GenreFilter/GenreFilter";
import Banner from "@/components/Banner/Banner";
import Row from "@/components/Row/Row";
import requests from "@/api/requests";
import { ROUTES } from "@/constants/routes";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGenreSelect = (genreName: string | null) => {
    if (genreName) {
      navigate(ROUTES.MOVIES_BY_GENRE.replace(":genre", genreName));
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Banner />
      <GenreFilter selectedGenreName={null} onSelectGenre={handleGenreSelect} />
      <Row category="TRENDING" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row category="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row category="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
      <Row category="COMEDY MOVIES" fetchUrl={requests.fetchComedyMovies} />
      <Row category="HORROR MOVIES" fetchUrl={requests.fetchHorrorMovies} />
      <Row category="ROMANCE MOVIES" fetchUrl={requests.fetchRomanceMovies} />
      <Row category="DOCUMENTARIES" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
};

export default HomePage;
