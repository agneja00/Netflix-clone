import styles from "./GenreFilter.module.scss";
import { useGenres } from "../hooks/hooks";

interface GenreFilterProps {
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenreId,
  onSelectGenre,
}) => {
  const { data: genres = [], isLoading } = useGenres();

  if (isLoading) return <div>Loading genres...</div>;

  return (
    <div className={styles.genreFilter}>
      <button
        className={!selectedGenreId ? styles.active : ""}
        onClick={() => onSelectGenre(null)}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenreId === genre.id ? styles.active : ""}
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
