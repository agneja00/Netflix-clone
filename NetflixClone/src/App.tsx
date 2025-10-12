import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import HomePage from "./components/pages/HomePage/HomePage";
import MoviesByGenrePage from "./components/pages/MoviesByGenrePage/MoviesByGenrePage";
import MoviePage from "./components/pages/MoviePage/MoviePage";
import { ROUTES } from "./constants/routes";
import { RootLayout } from "./components/layout/RootLayout";
import SearchResultsPage from "./components/pages/SearchResultsPage/SearchResultsPage";
import MoviesByRatingPage from "./components/pages/MoviesByRatingPage/MoviesByRatingPage";
import MoviesByYearPage from "./components/pages/MoviesByYearPage/MoviesByYearPage";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.MOVIES_BY_GENRE, element: <MoviesByGenrePage /> },
      {
        path: ROUTES.MOVIES_BY_YEAR,
        element: <MoviesByYearPage />,
      },
      {
        path: ROUTES.MOVIES_BY_RATING,
        element: <MoviesByRatingPage />,
      },
      { path: ROUTES.MOVIE_ID, element: <MoviePage /> },
      { path: ROUTES.MOVIE_SEARCH, element: <SearchResultsPage /> },
    ],
  },
]);

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
