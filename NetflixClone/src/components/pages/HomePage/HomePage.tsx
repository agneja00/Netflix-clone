import styles from "./HomePage.module.scss";
import ContentFilter from "@/components/ContentFilter/ContentFilter";
import Banner from "@/components/Banner/Banner";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import requests from "@/api/requests";
import PageTitle from "@/components/PageTitle/PageTitle";
import { queryClient } from "@/api/queryClient";

const HomePage = () => {
  const categories = [
    { label: "TRENDING", url: requests.fetchTrending },
    { label: "TOP RATED", url: requests.fetchTopRated },
    { label: "ACTION MOVIES", url: requests.fetchActionMovies },
    { label: "COMEDY MOVIES", url: requests.fetchComedyMovies },
    { label: "HORROR MOVIES", url: requests.fetchHorrorMovies },
    { label: "ROMANCE MOVIES", url: requests.fetchRomanceMovies },
    { label: "DOCUMENTARIES", url: requests.fetchDocumentaries },
  ];

  const allLoaded = categories.every(({ url }) =>
    queryClient.getQueryData(["movies", url])
  );

  return (
    <>
      <PageTitle title="Home" />
      <Banner />
      <div
        className={styles.wrapper}
        style={!allLoaded ? { minHeight: "220vh" } : undefined}
      >
        <ContentFilter selectedFilter={null} />
        {categories.map(({ label, url }) => (
          <MovieCardList key={label} category={label} fetchUrl={url} showType />
        ))}
      </div>
    </>
  );
};

export default HomePage;
