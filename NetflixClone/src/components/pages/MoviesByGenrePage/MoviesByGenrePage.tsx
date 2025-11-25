import styles from "../HomePage/HomePage.module.scss";
import { useParams } from "react-router-dom";
import { useGenres, useMovies } from "../../hooks/hooks";
import Banner from "@/components/Banner/Banner";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { getGenreFetchUrl } from "@/api/api";
import ContentFilter from "@/components/ContentFilter/ContentFilter";
import PageTitle from "@/components/PageTitle/PageTitle";

const MoviesByGenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const { data: genres = [], isLoading: isGenresLoading } = useGenres();

  const fetchUrl = genre ? getGenreFetchUrl(genre, genres) : null;
  const selectedGenre = genres.find(
    (g) => g.name.toLowerCase() === genre?.toLowerCase(),
  );

  const {
    data: movies = [],
    isLoading: isMoviesLoading,
    error,
  } = useMovies(fetchUrl || "", { enabled: !!fetchUrl });

  if (isGenresLoading)
    return <div className={styles.page__loading}>Loading genres...</div>;

  if (!genre)
    return <div className={styles.page__error}>No genre selected</div>;

  if (!selectedGenre && !fetchUrl)
    return <div className={styles.page__error}>Genre not found</div>;

  if (error)
    return <div className={styles.page__error}>Error loading movies</div>;

  return (
    <>
      <PageTitle title={selectedGenre?.name} />
      <Banner />

      <div className={styles.page__wrapper}>
        <ContentFilter selectedFilter={genre.toLowerCase()} />

        {isMoviesLoading ? (
          <div className={styles.page__loading}>Loading movies...</div>
        ) : (
          <>
            <MovieCardList
              category={`${selectedGenre?.name || genre} Movies`}
              movies={movies}
            />
            {!movies.length && (
              <div className={styles.page__noResults}>
                No movies found for this genre
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MoviesByGenrePage;
