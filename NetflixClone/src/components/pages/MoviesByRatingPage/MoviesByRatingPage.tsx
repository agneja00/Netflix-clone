import styles from "../HomePage/HomePage.module.scss";
import { useParams } from "react-router-dom";
import { useMoviesByRating } from "../../hooks/hooks";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import Banner from "@/components/Banner/Banner";
import ContentFilter from "@/components/ContentFilter/ContentFilter";
import PageTitle from "@/components/PageTitle/PageTitle";

const MoviesByRatingPage = () => {
  const { rating } = useParams<{ rating: string }>();
  const { data: movies = [], isLoading, error } = useMoviesByRating(rating);

  if (!rating)
    return <div className={styles.page__error}>No rating specified</div>;

  if (isLoading)
    return <div className={styles.page__loading}>Loading movies...</div>;

  if (error)
    return <div className={styles.page__error}>Error loading movies</div>;

  return (
    <>
      <PageTitle title={rating} />
      <Banner />

      <div className={styles.page__wrapper}>
        <ContentFilter selectedFilter={rating} />

        <h2 className={styles.page__title}>{rating}+ Rated Movies</h2>

        {movies.length > 0 ? (
          <MovieCardList
            category={`${rating}+ Rated Movies`}
            movies={movies}
            showType
          />
        ) : (
          <div className={styles.page__noResults}>
            No movies found with {rating}+ rating
          </div>
        )}
      </div>
    </>
  );
};

export default MoviesByRatingPage;
