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

  return (
    <div className={styles.banner} data-testid="banner">
      <div
        className={styles.banner__background}
        data-testid="banner-background"
        style={{
          backgroundImage: featuredMovie?.backdrop_path
            ? `url("${API_CONFIG.TMDB.IMAGE_BASE}${featuredMovie.backdrop_path}")`
            : "linear-gradient(to right, #111, #555)",
        }}
      />
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title} data-testid="banner-title">
          {featuredMovie?.title ||
            featuredMovie?.name ||
            featuredMovie?.original_title}
        </h1>
        <h1
          className={styles.banner__description}
          data-testid="banner-description"
        >
          {featuredMovie?.overview}
        </h1>
      </div>
    </div>
  );
};

export default Banner;
