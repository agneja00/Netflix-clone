import styles from "./MoviePage.module.scss";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useMovieDetails } from "../../hooks/hooks";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useMovieDetails(id);
  console.log(movie);

  if (isLoading) return <div className={styles.loading}>Loading movie...</div>;
  if (error || !movie)
    return <div className={styles.error}>Movie not found.</div>;

  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer");

  return (
    <div className={styles.moviePage}>
      <div className={styles.header}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={styles.backdrop}
        />
        <h1>{movie.title || movie.name}</h1>
      </div>

      <div className={styles.content}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />

        <div className={styles.details}>
          <h2>Overview</h2>
          <p>{movie.overview}</p>

          {movie.genres && (
            <>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </>
          )}
          {trailer && (
            <div className={styles.trailer}>
              <h3>Trailer</h3>
              <YouTube
                videoId={trailer.key}
                opts={{
                  height: "390",
                  width: "100%",
                  playerVars: { autoplay: 0 },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
