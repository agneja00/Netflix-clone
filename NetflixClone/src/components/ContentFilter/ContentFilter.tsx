import styles from "./ContentFilter.module.scss";
import { useGenres } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";

type FilterType = "genre" | "year" | "rating";

interface FilterProps {
  selectedFilter: string | null;
  className?: string;
}

const ContentFilter: React.FC<FilterProps> = ({ selectedFilter }) => {
  const [activeFilterType, setActiveFilterType] = useState<FilterType>("genre");
  const { data: genres = [], isLoading: isLoadingGenres } = useGenres();
  const navigate = useNavigate();

  const years = Array.from({ length: 15 }, (_, i) => 2024 - i);
  const ratings = Array.from({ length: 9 }, (_, i) => 9 - i);

  const handleFilterSelection = (value: string | null) => {
    if (!value || value === "All") {
      navigate(ROUTES.HOME);
      return;
    }

    switch (activeFilterType) {
      case "genre":
        navigate(ROUTES.MOVIES_BY_GENRE.replace(":genre", value));
        break;
      case "year":
        navigate(ROUTES.MOVIES_BY_YEAR.replace(":year", value));
        break;
      case "rating":
        navigate(ROUTES.MOVIES_BY_RATING.replace(":rating", value));
        break;
    }
  };

  const renderFilterButtons = () => {
    if (isLoadingGenres && activeFilterType === "genre") {
      return <div className={styles.loading}>Loading filters...</div>;
    }

    switch (activeFilterType) {
      case "genre":
        return genres.map((genre) => (
          <button
            key={genre.id}
            className={
              selectedFilter === genre.name.toLowerCase() ? styles.active : ""
            }
            onClick={() => handleFilterSelection(genre.name.toLowerCase())}
          >
            {genre.name}
          </button>
        ));
      case "year":
        return years.map((year) => (
          <button
            key={year}
            className={selectedFilter === year.toString() ? styles.active : ""}
            onClick={() => handleFilterSelection(year.toString())}
          >
            {year}
          </button>
        ));
      case "rating":
        return ratings.map((rating) => (
          <button
            key={rating}
            className={
              selectedFilter === rating.toString() ? styles.active : ""
            }
            onClick={() => handleFilterSelection(rating.toString())}
          >
            {rating}+
          </button>
        ));
    }
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterLabel}>Filter by:</span>

      <button
        className={`${styles.filterTypeSelector} ${
          activeFilterType === "genre" ? styles.active : ""
        }`}
        onClick={() => setActiveFilterType("genre")}
      >
        Genre
      </button>

      <button
        className={`${styles.filterTypeSelector} ${
          activeFilterType === "year" ? styles.active : ""
        }`}
        onClick={() => setActiveFilterType("year")}
      >
        Year
      </button>

      <button
        className={`${styles.filterTypeSelector} ${
          activeFilterType === "rating" ? styles.active : ""
        }`}
        onClick={() => setActiveFilterType("rating")}
      >
        Rating
      </button>

      <div className={styles.filterOptions}>
        <button
          className={!selectedFilter ? styles.active : ""}
          onClick={() => handleFilterSelection(null)}
        >
          All
        </button>
        {renderFilterButtons()}
      </div>
    </div>
  );
};

export default ContentFilter;
