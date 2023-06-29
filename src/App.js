import './App.css';
import Nav from './components/Nav/Nav.js';
import Banner from './components/Banner/Banner.js';
import Row from './components/Row/Row.js';
import requests from './components/data/requests.js';

function App() {
   return (
      <div className='app'>
         <Nav />
         <Banner />
         <Row category="TRENDING" fetchUrl={requests.fetchTrending} isLargeRow />
         <Row category="TOP RATED" fetchUrl={requests.fetchTopRated} />
         <Row category="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
         <Row category="COMEDY MOVIES" fetchUrl={requests.fecthComedyMovies} />
         <Row category="HORROR MOVIES" fetchUrl={requests.fecthHorrorMovies} />
         <Row category="ROMANCE MOVIES" fetchUrl={requests.fetchRomanceMovies} />
         <Row category="DOCUMENTARIES" fetchUrl={requests.fetchDocumentaries} />
      </div>
   )
}

export default App;
