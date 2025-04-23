import styles from "./HomePage.module.scss";
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
      <div className={styles.wrapper}>
        <GenreFilter
          selectedGenreName={null}
          onSelectGenre={handleGenreSelect}
        />
        <Row
          category="TRENDING"
          fetchUrl={requests.fetchTrending}
          showType={true}
        />
        <Row
          category="TOP RATED"
          fetchUrl={requests.fetchTopRated}
          showType={true}
        />
        <Row
          category="ACTION MOVIES"
          fetchUrl={requests.fetchActionMovies}
          showType={true}
        />
        <Row
          category="COMEDY MOVIES"
          fetchUrl={requests.fetchComedyMovies}
          showType={true}
        />
        <Row
          category="HORROR MOVIES"
          fetchUrl={requests.fetchHorrorMovies}
          showType={true}
        />
        <Row
          category="ROMANCE MOVIES"
          fetchUrl={requests.fetchRomanceMovies}
          showType={true}
        />
        <Row
          category="DOCUMENTARIES"
          fetchUrl={requests.fetchDocumentaries}
          showType={true}
        />
      </div>
    </>
  );
};

export default HomePage;
