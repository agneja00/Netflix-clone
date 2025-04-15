import styles from "./Row.module.scss";
import { useState, useCallback, useEffect } from "react";
import YouTube from "react-youtube";
import { useMovies, useMovieTrailer } from "../hooks/hooks";
import { API_CONFIG } from "@/config/constants";
import classNames from "classnames";

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
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const { data: movies = [], isLoading, error } = useMovies(fetchUrl);
  const { data: trailerUrl } = useMovieTrailer(selectedMovieId);

  const handleClick = useCallback((movieId: number) => {
    setSelectedMovieId((prevId) => (prevId === movieId ? null : movieId));
  }, []);

  const closeTrailer = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTrailer();
    };

    if (trailerUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [trailerUrl, closeTrailer]);

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
          genre && styles["row__posters--genre"]
        )}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`${styles.row__poster} ${
              isLargeRow ? styles.row__posterLarge : ""
            }`}
            onClick={() => handleClick(movie.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleClick(movie.id)}
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

      {trailerUrl && (
        <div className={styles.trailerOverlay}>
          <div className={styles.trailerContainer}>
            <button
              className={styles.trailerContainer__closeButton}
              onClick={closeTrailer}
              aria-label="Close trailer"
            >
              ✕
            </button>
            <div className={styles.videoWrapper}>
              <YouTube
                videoId={trailerUrl}
                opts={{
                  height: "390",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                    origin: window.location.origin,
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
