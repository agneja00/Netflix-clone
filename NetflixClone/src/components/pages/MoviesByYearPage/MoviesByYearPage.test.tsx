import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import MoviesByYearPage from "./MoviesByYearPage";
import { useMoviesByYear } from "../../hooks/hooks";

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
  useMoviesByYear: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useParams: jest.fn(),
  };
});

describe("MoviesByYearPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows error when year is missing", () => {
    (useParams as jest.Mock).mockReturnValue({ year: undefined });
    (useMoviesByYear as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByYearPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Invalid year specified")).toBeInTheDocument();
  });

  it("shows error when year is invalid format", () => {
    (useParams as jest.Mock).mockReturnValue({ year: "20xx" });
    (useMoviesByYear as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByYearPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Invalid year specified")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useParams as jest.Mock).mockReturnValue({ year: "2022" });
    (useMoviesByYear as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByYearPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("shows error state when fetch fails", () => {
    (useParams as jest.Mock).mockReturnValue({ year: "2021" });
    (useMoviesByYear as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: new Error("Fetch failed"),
    });

    render(
      <MemoryRouter>
        <MoviesByYearPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Error loading movies")).toBeInTheDocument();
  });

  it("renders movie list when data is available", () => {
    (useParams as jest.Mock).mockReturnValue({ year: "2020" });
    (useMoviesByYear as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ id: 1, title: "Tenet" }],
    });

    render(
      <MemoryRouter>
        <MoviesByYearPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByTestId("content-filter")).toHaveTextContent(
      "Filter: 2020",
    );
    expect(screen.getByTestId("movie-list")).toHaveTextContent(
      "List: 2020 RELEASES",
    );
    expect(screen.getByText("Movies from 2020")).toBeInTheDocument();
  });

  it("shows no results message when no movies returned", () => {
    (useParams as jest.Mock).mockReturnValue({ year: "2019" });
    (useMoviesByYear as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    });

    render(
      <MemoryRouter>
        <MoviesByYearPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("No movies found for 2019")).toBeInTheDocument();
  });
});
