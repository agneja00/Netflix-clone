import styles from "./Banner.module.scss";
import { useNetflixOriginals } from "../hooks/hooks";
import { API_CONFIG } from "@/config/constants";

const Banner = () => {
  const {
    data: featuredMovie,
    isLoading,
    isError,
    error,
  } = useNetflixOriginals();

  if (isLoading) return <div data-testid="banner-loading">Loading...</div>;
  if (isError)
    return (
      <div data-testid="banner-error">
        {error?.message || "Error loading content"}
      </div>
    );

  const base = API_CONFIG.TMDB.IMAGE_BASE.replace("/original/", "/");
  const imagePath = featuredMovie?.backdrop_path || featuredMovie?.poster_path;

  return (
    <div className={styles.banner} data-testid="banner">
      <img
        src={`${base}w780${imagePath}`}
        srcSet={`
          ${base}w342${imagePath} 342w,
          ${base}w500${imagePath} 500w,
          ${base}w780${imagePath} 780w,
          ${base}w1280${imagePath} 1280w
        `}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 100vw"
        alt={featuredMovie?.title || "Banner background"}
        className={styles.banner__image}
        fetchpriority="high"
        decoding="async"
        width="1280"
        height="720"
      />

      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title} data-testid="banner-title">
          {featuredMovie?.title ||
            featuredMovie?.name ||
            featuredMovie?.original_title}
        </h1>
        <p
          className={styles.banner__description}
          data-testid="banner-description"
        >
          {featuredMovie?.overview}
        </p>
      </div>
    </div>
  );
};

export default Banner;
