import styles from "./Banner.module.scss";
import { useNetflixOriginals } from "./hooks";
import { API_CONFIG } from "@/config/constants";

const Banner = () => {
  const { data: featuredMovie } = useNetflixOriginals();

  return (
    <header className={styles.banner}>
      <div
        className={styles.banner__background}
        style={{
          backgroundImage: featuredMovie?.backdrop_path
            ? `url("${API_CONFIG.TMDB.IMAGE_BASE}${featuredMovie.backdrop_path}")`
            : "linear-gradient(to right, #111, #555)",
        }}
      />
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>
          {featuredMovie?.title ||
            featuredMovie?.name ||
            featuredMovie?.original_name}
        </h1>
        <h1 className={styles.banner__description}>
          {featuredMovie?.overview}
        </h1>
      </div>

      <div className={styles.banner__fadeBottom} />
    </header>
  );
};

export default Banner;
