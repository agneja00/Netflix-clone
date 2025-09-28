import styles from "../HomePage/HomePage.module.scss";
import { useParams } from "react-router-dom";
import { useMoviesByYear } from "../../hooks/hooks";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import Banner from "@/components/Banner/Banner";
import ContentFilter from "@/components/ContentFilter/ContentFilter";
import PageTitle from "@/components/PageTitle/PageTitle";

const MoviesByYearPage = () => {
  const { year } = useParams<{ year: string }>();
  const { data: movies = [], isLoading, error } = useMoviesByYear(year);

  if (!year || !/^\d{4}$/.test(year)) {
    return <div className={styles.error}>Invalid year specified</div>;
  }

  if (isLoading) return <div className={styles.loading}>Loading movies...</div>;
  if (error) return <div className={styles.error}>Error loading movies</div>;

  return (
    <>
    <PageTitle title={year} />
      <Banner />
      <div className={styles.wrapper}>
        <ContentFilter selectedFilter={year} />
        <h2 className={styles.title}>Movies from {year}</h2>
        {movies.length > 0 ? (
          <MovieCardList
            category={`${year} RELEASES`}
            movies={movies}
            showType
          />
        ) : (
          <div className={styles.noResults}>No movies found for {year}</div>
        )}
      </div>
    </>
  );
};

export default MoviesByYearPage;
