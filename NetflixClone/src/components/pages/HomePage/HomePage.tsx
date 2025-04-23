import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";
import GenreFilter from "@/components/GenreFilter/GenreFilter";
import Banner from "@/components/Banner/Banner";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
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
        <MovieCardList
          category="TRENDING"
          fetchUrl={requests.fetchTrending}
          showType={true}
        />
        <MovieCardList
          category="TOP RATED"
          fetchUrl={requests.fetchTopRated}
          showType={true}
        />
        <MovieCardList
          category="ACTION MOVIES"
          fetchUrl={requests.fetchActionMovies}
          showType={true}
        />
        <MovieCardList
          category="COMEDY MOVIES"
          fetchUrl={requests.fetchComedyMovies}
          showType={true}
        />
        <MovieCardList
          category="HORROR MOVIES"
          fetchUrl={requests.fetchHorrorMovies}
          showType={true}
        />
        <MovieCardList
          category="ROMANCE MOVIES"
          fetchUrl={requests.fetchRomanceMovies}
          showType={true}
        />
        <MovieCardList
          category="DOCUMENTARIES"
          fetchUrl={requests.fetchDocumentaries}
          showType={true}
        />
      </div>
    </>
  );
};

export default HomePage;
