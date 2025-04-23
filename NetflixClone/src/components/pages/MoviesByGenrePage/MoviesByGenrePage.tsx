import { useParams, useNavigate } from "react-router-dom";
import { useGenres, useMovies } from "../../hooks/hooks";
import Banner from "@/components/Banner/Banner";
import Row from "@/components/Row/Row";
import GenreFilter from "@/components/GenreFilter/GenreFilter";
import { ROUTES } from "@/constants/routes";
import styles from "./MoviesByGenrePage.module.scss";
import { getGenreFetchUrl } from "@/api/api";

const MoviesByGenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
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

  const handleGenreSelect = (genreName: string | null) => {
    if (genreName) {
      navigate(`${ROUTES.MOVIES_BY_GENRE.replace(":genre", genreName)}`);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  if (isGenresLoading)
    return <div className={styles.loading}>Loading genres...</div>;
  if (!genre) return <div className={styles.error}>No genre selected</div>;
  if (!selectedGenre && !fetchUrl)
    return <div className={styles.error}>Genre not found</div>;
  if (error) return <div className={styles.error}>Error loading movies</div>;

  return (
    <>
      <Banner />
      <div className={styles.container}>
        <GenreFilter
          selectedGenreName={genre?.toLowerCase() || null}
          onSelectGenre={handleGenreSelect}
        />

        {isMoviesLoading ? (
          <div className={styles.loading}>Loading movies...</div>
        ) : (
          <>
            <Row
              category={`${selectedGenre?.name || genre} Movies`}
              movies={movies}
            />
            {!movies.length && (
              <div className={styles.noResults}>
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
