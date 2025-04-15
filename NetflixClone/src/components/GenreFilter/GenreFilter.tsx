import styles from "./GenreFilter.module.scss";
import { useGenres } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface GenreFilterProps {
  selectedGenreName: string | null;
  onSelectGenre?: (genreName: string | null) => void;
  className?: string;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenreName,
  onSelectGenre,
}) => {
  const { data: genres = [], isLoading } = useGenres();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading genres...</div>;

  const handleGenreClick = (genreName: string | null) => {
    if (!genreName || genreName === "All") {
      navigate(ROUTES.HOME);
    } else if (onSelectGenre) {
      onSelectGenre(genreName);
    } else {
      navigate(ROUTES.MOVIES_BY_GENRE.replace(":genre", genreName));
    }
  };

  return (
    <div className={styles.genreFilter}>
      <button
        className={!selectedGenreName ? styles.active : ""}
        onClick={() => handleGenreClick(null)}
      >
        All
      </button>
      {genres.map((genre) => {
        const genreSlug = genre.name.toLowerCase();
        return (
          <button
            key={genre.id}
            className={selectedGenreName === genreSlug ? styles.active : ""}
            onClick={() => handleGenreClick(genreSlug)}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
};

export default GenreFilter;
