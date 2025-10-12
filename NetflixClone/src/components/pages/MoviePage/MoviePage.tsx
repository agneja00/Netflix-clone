import styles from "./MoviePage.module.scss";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useMovieDetails } from "../../hooks/hooks";
import PageTitle from "@/components/PageTitle/PageTitle";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) return <div className={styles.loading}>Loading movie...</div>;
  if (error || !movie)
    return <div className={styles.error}>Movie not found.</div>;

  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer");

  return (
    <>
      <PageTitle title={movie.title} />
      <div className={styles.hero}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={styles.hero__backdrop}
        />
        <h1 className={styles.hero__title}>{movie.title || movie.name}</h1>
      </div>
      <div className={styles.moviePage}>
        <div className={styles.moviePage__content}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePage__poster}
          />

          <div className={styles.moviePage__details}>
            <h2 className={styles.moviePage__details__title}>Overview</h2>
            <p className={styles.moviePage__details__paragraph}>
              {movie.overview}
            </p>

            {movie.genres && (
              <>
                <h3 className={styles.moviePage__details__title}>Genres</h3>
                <ul className={styles.moviePage__details__list}>
                  {movie.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className={styles.moviePage__details__list__link}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {trailer && (
              <div className={styles.trailer}>
                <h3 className={styles.moviePage__details__title}>Trailer</h3>
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
    </>
  );
};

export default MoviePage;
