import styles from "./Row.module.scss";
import { useMovies } from "../hooks/hooks";
import { API_CONFIG } from "@/config/constants";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface RowProps {
  category: string;
  fetchUrl: string;
  isLargeRow?: boolean;
  genre?: boolean;
}

const Row: React.FC<RowProps> = ({
  category,
  fetchUrl,
  isLargeRow = false,
  genre,
}) => {
  const { data: movies = [], isLoading, error } = useMovies(fetchUrl);
  const navigate = useNavigate();

  if (isLoading)
    return <div className={styles.loading}>Loading {category}...</div>;
  if (error)
    return <div className={styles.error}>Error loading {category}</div>;

  return (
    <div className={styles.row}>
      <h2 className={styles.row__title}>{category}</h2>

      <div
        className={classNames(
          styles.row__posters,
          genre && styles["row__posters--genre"],
        )}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`${styles.row__poster} ${
              isLargeRow ? styles.row__posterLarge : ""
            }`}
            onClick={() =>
              navigate(ROUTES.MOVIE_ID.replace(":id", movie.id.toString()))
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              navigate(ROUTES.MOVIE_ID.replace(":id", movie.id.toString()))
            }
          >
            <img
              src={`${API_CONFIG.TMDB.IMAGE_BASE}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title || movie.name || "Movie"}
              className={styles.row__image}
              loading="lazy"
            />
            <h3 className={styles.row__name}>
              {movie.original_title || movie.title || movie.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
