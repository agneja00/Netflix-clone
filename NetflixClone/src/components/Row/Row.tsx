import styles from "./Row.module.scss";
import { useMovies } from "../hooks/hooks";
import MovieCard from "../MovieCard/MovieCard";
import { IMovie } from "../types/types";

interface RowProps {
  category?: string;
  fetchUrl?: string;
  movies?: IMovie[];
  showType?: boolean;
}

const Row: React.FC<RowProps> = ({
  category,
  fetchUrl,
  movies: directMovies,
  showType = false,
}) => {
  const {
    data: fetchedMovies = [],
    isLoading,
    error,
  } = useMovies(fetchUrl || "", { enabled: !directMovies && !!fetchUrl });

  const movies = directMovies || fetchedMovies;

  if (isLoading)
    return <div className={styles.loading}>Loading {category}...</div>;
  if (error)
    return <div className={styles.error}>Error loading {category}</div>;
  if (!movies?.length) return null;

  return (
    <>
      <h2 className={styles.row__title}>{category}</h2>
      <div className={styles.row__posters}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showType={showType} />
        ))}
      </div>
    </>
  );
};

export default Row;
