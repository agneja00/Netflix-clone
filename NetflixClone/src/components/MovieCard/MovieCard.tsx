import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";
import { API_CONFIG } from "@/config/constants";
import { IMovie } from "@/components/types/types";
import { ROUTES } from "@/constants/routes";

interface MovieCardProps {
  movie: IMovie;
  showType?: boolean;
}

const MovieCard = ({ movie, showType = false }: MovieCardProps) => {
  if (!movie) return null;

  const imagePath = movie.poster_path || movie.backdrop_path;
  const imageUrl = imagePath
    ? `${API_CONFIG.TMDB.IMAGE_BASE}${imagePath}`
    : "/placeholder-movie.png";

  const title = movie.title || movie.name || movie.original_title || "Unknown";

  return (
    <Link
      to={ROUTES.MOVIE_ID.replace(":id", movie.id.toString())}
      className={styles.card}
      aria-label={`View details for ${title}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={title}
          className={styles.card__image}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-movie.png";
          }}
        />
      </div>
      <div className={styles.card__details}>
        <h3 className={styles.card__title}>{title}</h3>
        {showType && movie.media_type && (
          <span className={styles.card__type}>
            {movie.media_type === "movie" ? "Movie" : "TV Show"}
          </span>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
