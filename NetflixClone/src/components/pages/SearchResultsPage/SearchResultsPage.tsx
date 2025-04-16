import styles from "./SearchResultsPage.module.scss";
import { useSearchParams, Link } from "react-router-dom";
import { useSearchMovies } from "../../hooks/hooks";
import Banner from "@/components/Banner/Banner";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useSearchMovies(query);

  return (
    <>
      <Banner />
      <div className={styles.searchPage}>
        <h2 className={styles.searchPage__title}>
          {query ? `Results for "${query}"` : "Search Movies & TV Shows"}
        </h2>

        {isLoading ? (
          <div className={styles.loading}>Loading results...</div>
        ) : isError ? (
          <div className={styles.error}>
            {error instanceof Error ? error.message : "Failed to load results"}
          </div>
        ) : results.length > 0 ? (
          <div className={styles.searchPage__resultsGrid}>
            {results.map((item) => (
              <Link
                to={`/${item.media_type}/${item.id}`}
                key={`${item.media_type}-${item.id}`}
                className={styles.searchPage__card}
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "/placeholder-movie.png"
                  }
                  alt={item.title || item.name || "Unknown"}
                  className={styles.searchPage__poster}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-movie.png";
                  }}
                />
                <div>
                  <h3 className={styles.searchPage__name}>
                    {item.title || item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            {query
              ? "No results found for your search"
              : "Enter a search term to find movies and TV shows"}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultsPage;
