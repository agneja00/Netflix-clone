import { useState } from "react";
import Youtube from "react-youtube";
import styles from "./Row.module.scss";
import { useMovies, useMovieTrailer } from "./hooks";
import { API_CONFIG } from "@/config/constants";

interface RowProps {
  category: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const Row: React.FC<RowProps> = ({
  category,
  fetchUrl,
  isLargeRow = false,
}) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const { data: movies = [], isLoading, error } = useMovies(fetchUrl);
  const { data: trailerUrl } = useMovieTrailer(selectedMovieId);

  const handleClick = (movieId: number) => {
    setSelectedMovieId((prevId) => (prevId === movieId ? null : movieId));
  };

  if (isLoading)
    return <div className={styles.loading}>Loading {category}...</div>;
  if (error)
    return <div className={styles.error}>Error loading {category}</div>;

  return (
    <div className={styles.row}>
      <h2 className={styles.row__title}>{category}</h2>

      <div className={styles.row__posters}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`${styles.row__poster} ${isLargeRow ? styles.row__posterLarge : ""}`}
            onClick={() => handleClick(movie.id)}
          >
            <img
              src={`${API_CONFIG.TMDB.IMAGE_BASE}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie?.title || movie?.name}
              className={styles.row__image}
              loading="lazy"
            />
            <h3 className={styles.row__name}>{movie?.original_title || movie?.title}</h3>
          </div>
        ))}
      </div>

      {trailerUrl && (
        <div className={styles.trailerContainer}>
          <Youtube
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
      )}
    </div>
  );
};

export default Row;
