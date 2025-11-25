import styles from "./ContentFilter.module.scss";
import { useGenres } from "../hooks/hooks";
import { generatePath, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import FilterLink from "../FilterLink/FilterLink";

type FilterType = "all" | "genre" | "year" | "rating";

interface FilterProps {
  selectedFilter: string | null;
}

const ContentFilter: React.FC<FilterProps> = ({ selectedFilter }) => {
  const { data: genres = [], isLoading: isLoadingGenres } = useGenres();
  const params = useParams<{
    genre?: string;
    year?: string;
    rating?: string;
  }>();
  const [activeFilterType, setActiveFilterType] = useState<FilterType>("all");

  useEffect(() => {
    if (params.genre) setActiveFilterType("genre");
    else if (params.year) setActiveFilterType("year");
    else if (params.rating) setActiveFilterType("rating");
    else setActiveFilterType("all");
  }, [params.genre, params.year, params.rating]);

  const years = Array.from({ length: 15 }, (_, i) => 2024 - i);
  const ratings = Array.from({ length: 9 }, (_, i) => 9 - i);

  const renderFilterButtons = () => {
    if (isLoadingGenres && activeFilterType === "genre") {
      return (
        <div className={styles.contentFilter__loading}>Loading filters...</div>
      );
    }

    switch (activeFilterType) {
      case "genre":
        return genres.map((g) => (
          <FilterLink
            key={g.id}
            className={styles.contentFilter__option}
            active={selectedFilter === g.name.toLowerCase()}
            to={generatePath(ROUTES.MOVIES_BY_GENRE, {
              genre: g.name.toLowerCase(),
            })}
          >
            {g.name}
          </FilterLink>
        ));

      case "year":
        return years.map((y) => (
          <FilterLink
            key={y}
            className={styles.contentFilter__option}
            active={selectedFilter === y.toString()}
            to={generatePath(ROUTES.MOVIES_BY_YEAR, { year: y.toString() })}
          >
            {y}
          </FilterLink>
        ));

      case "rating":
        return ratings.map((r) => (
          <FilterLink
            key={r}
            className={styles.contentFilter__option}
            active={selectedFilter === r.toString()}
            to={generatePath(ROUTES.MOVIES_BY_RATING, {
              rating: r.toString(),
            })}
          >
            {r}+
          </FilterLink>
        ));

      case "all":
        return null;
    }
  };

  return (
    <div className={styles.contentFilter}>
      <div className={styles.contentFilter__controls}>
        <span className={styles.contentFilter__label}>Filter by:</span>

        <button
          className={`${styles.contentFilter__typeButton} ${
            activeFilterType === "genre"
              ? styles["contentFilter__typeButton--active"]
              : ""
          }`}
          onClick={() => setActiveFilterType("genre")}
        >
          Genre
        </button>

        <button
          className={`${styles.contentFilter__typeButton} ${
            activeFilterType === "year"
              ? styles["contentFilter__typeButton--active"]
              : ""
          }`}
          onClick={() => setActiveFilterType("year")}
        >
          Year
        </button>

        <button
          className={`${styles.contentFilter__typeButton} ${
            activeFilterType === "rating"
              ? styles["contentFilter__typeButton--active"]
              : ""
          }`}
          onClick={() => setActiveFilterType("rating")}
        >
          Rating
        </button>
      </div>

      <div className={styles.contentFilter__options}>
        <FilterLink
          className={styles.contentFilter__option}
          to={ROUTES.HOME}
          active={!params.genre && !params.year && !params.rating}
        >
          All
        </FilterLink>

        {renderFilterButtons()}
      </div>
    </div>
  );
};

export default ContentFilter;
