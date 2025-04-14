import { useState } from "react";
import GenreFilter from "./components/GenreFilter/GenreFilter";
import Row from "./components/Row/Row";
import { API_CONFIG } from "./config/constants";
import Banner from "./components/Banner/Banner";
import Nav from "./components/Nav/Nav";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const genreUrl = selectedGenre
    ? `${API_CONFIG.TMDB.API_BASE}discover/movie?with_genres=${selectedGenre}`
    : `${API_CONFIG.TMDB.API_BASE}trending/all/week?language=en-US`;

  return (
    <>
      <Nav />
      <Banner />
      <GenreFilter
        selectedGenreId={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />
      <Row category="Filtered Results" fetchUrl={genreUrl} isLargeRow />
    </>
  );
};

export default App;
