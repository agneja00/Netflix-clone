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

  if (!rating) return <div className={styles.error}>No rating specified</div>;
  if (isLoading) return <div className={styles.loading}>Loading movies...</div>;
  if (error) return <div className={styles.error}>Error loading movies</div>;

  return (
    <>
    <PageTitle title={rating}/>
      <Banner />
      <div className={styles.wrapper}>
        <ContentFilter selectedFilter={rating} />
        <h2 className={styles.title}>{rating}+ Rated Movies</h2>
        {movies.length > 0 ? (
          <MovieCardList
            category={`${rating}+ Rated Movies`}
            movies={movies}
            showType
          />
        ) : (
          <div className={styles.noResults}>
            No movies found with {rating}+ rating
          </div>
        )}
      </div>
    </>
  );
};

export default MoviesByRatingPage;
