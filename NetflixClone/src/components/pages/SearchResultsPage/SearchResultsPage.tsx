import styles from "./SearchResultsPage.module.scss";
import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../../hooks/hooks";
import Banner from "@/components/Banner/Banner";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import PageTitle from "@/components/PageTitle/PageTitle";

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
      <PageTitle title={`Results for "${query}"`} />
      <Banner />
      <div className={styles.searchPage}>
        <h2 className={styles.searchPage__title}>
          {query ? `Results for "${query}"` : "Search Movies & TV Shows"}
        </h2>

        {isLoading ? (
          <div className={styles.searchPage__loading}>Loading results...</div>
        ) : isError ? (
          <div className={styles.searchPage__error}>
            {error instanceof Error ? error.message : "Failed to load results"}
          </div>
        ) : results.length > 0 ? (
          <MovieCardList
            movies={results}
            category={`Search Results (${results.length})`}
            showType
          />
        ) : (
          <div className={styles.searchPage__noResults}>
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
