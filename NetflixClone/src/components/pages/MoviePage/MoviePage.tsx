import styles from "./MoviePage.module.scss";
import { generatePath, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useMovieDetails } from "../../hooks/hooks";
import PageTitle from "@/components/PageTitle/PageTitle";
import { API_CONFIG } from "@/config/constants";
import { ROUTES } from "@/constants/routes";
import FilterLink from "@/components/FilterLink/FilterLink";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useMovieDetails(id);

  if (isLoading)
    return <div className={styles.moviePage__loading}>Loading movie...</div>;
  if (error || !movie)
    return <div className={styles.moviePage__error}>Movie not found.</div>;

  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer");
  const base = API_CONFIG.TMDB.IMAGE_BASE.replace("/original/", "/");

  return (
    <>
      <PageTitle title={movie.title} />

      <div className={styles.hero}>
        <img
          src={`${base}w1280${movie.backdrop_path}`}
          srcSet={`
            ${base}w780${movie.backdrop_path} 780w,
            ${base}w1280${movie.backdrop_path} 1280w,
            ${base}original${movie.backdrop_path} 1920w
          `}
          sizes="(max-width: 768px) 780px, (max-width: 1400px) 1280px, 1920px"
          alt={movie.title}
          className={styles.hero__backdrop}
          loading="lazy"
        />

        <h1 className={styles.hero__title}>{movie.title || movie.name}</h1>
      </div>

      <div className={styles.moviePage}>
        <div className={styles.moviePage__content}>
          <img
            src={`${base}w342${movie.poster_path}`}
            srcSet={`
              ${base}w185${movie.poster_path} 185w,
              ${base}w342${movie.poster_path} 342w,
              ${base}w500${movie.poster_path} 500w
            `}
            sizes="(max-width: 600px) 185px, (max-width: 1200px) 342px, 500px"
            alt={movie.title}
            className={styles.moviePage__poster}
            loading="lazy"
          />

          <div className={styles.moviePage__details}>
            <h2 className={styles.moviePage__detailsTitle}>Overview</h2>

            <p className={styles.moviePage__detailsParagraph}>
              {movie.overview}
            </p>

            {movie.genres && (
              <>
                <h3 className={styles.moviePage__detailsTitle}>Genres</h3>

                <ul className={styles.moviePage__detailsList}>
                  {movie.genres.map((genre) => (
                    <FilterLink
                      key={genre.id}
                      className={styles.moviePage__detailsLink}
                      to={generatePath(ROUTES.MOVIES_BY_GENRE, {
                        genre: genre.name,
                      })}
                    >
                      {genre.name}
                    </FilterLink>
                  ))}
                </ul>
              </>
            )}

            {trailer && (
              <div className={styles.trailer}>
                <h3 className={styles.moviePage__detailsTitle}>Trailer</h3>

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
