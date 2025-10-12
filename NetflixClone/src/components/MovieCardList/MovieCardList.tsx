import styles from "./MovieCardList.module.scss";
import { useMovies } from "../hooks/hooks";
import MovieCard from "../MovieCard/MovieCard";
import { IMovie } from "../types/types";

interface MovieCardListProps {
  category?: string;
  fetchUrl?: string;
  movies?: IMovie[];
  showType?: boolean;
}

const MovieCardList: React.FC<MovieCardListProps> = ({
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
      <h2 className={styles.list__title}>{category}</h2>
      <div className={styles.list__posters}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showType={showType} />
        ))}
      </div>
    </>
  );
};

export default MovieCardList;
