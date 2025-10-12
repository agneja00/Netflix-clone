import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import MoviesByRatingPage from "./MoviesByRatingPage";
import { useMoviesByRating } from "../../hooks/hooks";

jest.mock("@/components/Banner/Banner", () => ({
  __esModule: true,
  default: () => <div data-testid="banner">Mocked Banner</div>,
}));

jest.mock("@/components/ContentFilter/ContentFilter", () => ({
  __esModule: true,
  default: ({ selectedFilter }: { selectedFilter: string }) => (
    <div data-testid="content-filter">Filter: {selectedFilter}</div>
  ),
}));

jest.mock("@/components/MovieCardList/MovieCardList", () => ({
  __esModule: true,
  default: ({ category }: { category: string }) => (
    <div data-testid="movie-list">List: {category}</div>
  ),
}));

jest.mock("../../hooks/hooks", () => ({
  useMoviesByRating: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useParams: jest.fn(),
  };
});

describe("MoviesByRatingPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows error when no rating is specified", () => {
    (useParams as jest.Mock).mockReturnValue({ rating: undefined });
    (useMoviesByRating as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByRatingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("No rating specified")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useParams as jest.Mock).mockReturnValue({ rating: "8" });
    (useMoviesByRating as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByRatingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("shows error if loading fails", () => {
    (useParams as jest.Mock).mockReturnValue({ rating: "7" });
    (useMoviesByRating as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error("Network error"),
    });

    render(
      <MemoryRouter>
        <MoviesByRatingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Error loading movies")).toBeInTheDocument();
  });

  it("renders movie list when movies are available", () => {
    (useParams as jest.Mock).mockReturnValue({ rating: "9" });
    (useMoviesByRating as jest.Mock).mockReturnValue({
      data: [{ id: 1, title: "Inception" }],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByRatingPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByTestId("content-filter")).toHaveTextContent("Filter: 9");
    expect(screen.getByTestId("movie-list")).toHaveTextContent(
      "List: 9+ Rated Movies",
    );
    expect(screen.getByText("9+ Rated Movies")).toBeInTheDocument();
  });

  it("shows no results message when movie list is empty", () => {
    (useParams as jest.Mock).mockReturnValue({ rating: "6" });
    (useMoviesByRating as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByRatingPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("No movies found with 6+ rating"),
    ).toBeInTheDocument();
  });
});
