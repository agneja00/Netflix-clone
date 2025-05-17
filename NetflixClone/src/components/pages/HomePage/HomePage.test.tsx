import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import requests from "@/api/requests";
import HomePage from "./HomePage";

jest.mock("@/components/Banner/Banner", () => ({
  __esModule: true,
  default: () => <div data-testid="banner">Mocked Banner</div>,
}));

jest.mock("@/components/ContentFilter/ContentFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="content-filter">Mocked Filter</div>,
}));

jest.mock("@/components/MovieCardList/MovieCardList", () => ({
  __esModule: true,
  default: ({ category }: { category?: string }) => (
    <div data-testid={`movie-list-${category}`}>
      Mocked Movie List: {category}
    </div>
  ),
}));

describe("HomePage", () => {
  const categories = [
    { label: "TRENDING", url: requests.fetchTrending },
    { label: "TOP RATED", url: requests.fetchTopRated },
    { label: "ACTION MOVIES", url: requests.fetchActionMovies },
    { label: "COMEDY MOVIES", url: requests.fetchComedyMovies },
    { label: "HORROR MOVIES", url: requests.fetchHorrorMovies },
    { label: "ROMANCE MOVIES", url: requests.fetchRomanceMovies },
    { label: "DOCUMENTARIES", url: requests.fetchDocumentaries },
  ];

  it("renders Banner, ContentFilter, and all MovieCardList categories", () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByTestId("content-filter")).toBeInTheDocument();

    for (const category of categories) {
      expect(
        screen.getByTestId(`movie-list-${category.label}`),
      ).toBeInTheDocument();
    }
  });
});
