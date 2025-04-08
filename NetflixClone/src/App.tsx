import "./App.css";
import Banner from "./components/Banner/Banner";
import requests from "./api/requests";
import Nav from "./components/Nav/Nav";
import Row from "./components/Row/Row";

const App = () => {
  return (
    <>
      <Nav />
      <Banner />
      <Row category="TRENDING" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row category="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row category="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
      <Row category="COMEDY MOVIES" fetchUrl={requests.fetchComedyMovies} />
      <Row category="HORROR MOVIES" fetchUrl={requests.fetchHorrorMovies} />
      <Row category="ROMANCE MOVIES" fetchUrl={requests.fetchRomanceMovies} />
      <Row category="DOCUMENTARIES" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
};

export default App;
