import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";
import { API_CONFIG } from "@/config/constants";
import { IMovie } from "@/components/types/types";
import { ROUTES } from "@/constants/routes";

interface MovieCardProps {
  movie: IMovie;
  showType?: boolean;
  isLoading?: boolean;
}

const MovieCard = ({
  movie,
  showType = false,
  isLoading = false,
}: MovieCardProps) => {
  if (!movie) return null;

  const imagePath = movie.poster_path || movie.backdrop_path;
  const title = movie.title || movie.name || movie.original_title || "Unknown";

  const base = API_CONFIG.TMDB.IMAGE_BASE.replace("/original/", "/");
  const imageUrl = imagePath
    ? `${base}w342${imagePath}`
    : "/placeholder-movie.png";

  return (
    <Link
      to={ROUTES.MOVIE_ID.replace(":id", movie.id.toString())}
      className={styles.card}
      aria-label={`View details for ${title}`}
    >
      <div className={styles.imageContainer}>
        {isLoading ? (
          <div className={styles.skeleton} />
        ) : (
          <img
            src={imageUrl}
            srcSet={`
            ${base}w185${imagePath} 185w,
            ${base}w342${imagePath} 342w,
            ${base}w500${imagePath} 500w
          `}
            sizes="(max-width: 600px) 185px, (max-width: 1200px) 342px, 500px"
            alt={`imagePath === "_card__image_1arzj_14" ? "Unknown" : ${title}`}
            className={styles.card__image}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-movie.png";
            }}
          />
        )}
      </div>
      <div className={styles.card__details}>
        <h3 className={styles.card__title}>
          {isLoading ? "Loading..." : title}
        </h3>
        {showType && movie.media_type && !isLoading && (
          <span className={styles.card__type}>
            {movie.media_type === "movie" ? "Movie" : "TV Show"}
          </span>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
