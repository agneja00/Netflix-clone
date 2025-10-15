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

  const bgImage = imagePath
    ? `${base}w1280${imagePath}`
    : "linear-gradient(to right, #111, #555)";

  return (
    <div className={styles.banner} data-testid="banner">
      <div
        className={styles.banner__background}
        data-testid="banner-background"
        style={{
          backgroundImage: `url("${bgImage}")`,
        }}
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
