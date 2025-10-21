import styles from "./Nav.module.scss";
import { FaSearch } from "react-icons/fa";
import { ROUTES } from "@/constants/routes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(
        `${ROUTES.MOVIE_SEARCH}?query=${encodeURIComponent(searchQuery.trim())}`
      );
      setShowInput(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setShowInput(!showInput);
    if (!showInput) {
      setTimeout(() => {
        document.querySelector("input")?.focus();
      }, 100);
    }
  };

  return (
    <header
      className={`${styles.nav} ${show ? styles.nav__black : ""}`}
      onClick={() => setShowInput(false)}
    >
      <img
        className={styles.nav__logo}
        src="./assets/Netflix_app_nav_logo.png"
        alt="Netflix Logo"
        width={120}
        height={40}
        onClick={(e) => {
          e.stopPropagation();
          navigate(ROUTES.HOME);
        }}
      />

      <div
        className={styles.rightContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.nav__search}>
          {showInput ? (
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search for movies, shows, and more..."
            />
          ) : (
            <FaSearch
              className={styles.nav__searchButton}
              onClick={toggleSearch}
              data-testid="search-icon"
            />
          )}
        </div>
        <img
          className={styles.nav__avatar}
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          alt="Netflix Profile"
          width={30}
          height={30}
        />
      </div>
    </header>
  );
};

export default Nav;
