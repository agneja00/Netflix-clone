import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import MoviesByGenrePage from "./MoviesByGenrePage";
import { useGenres, useMovies } from "../../hooks/hooks";
import { getGenreFetchUrl } from "@/api/api";

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
  useGenres: jest.fn(),
  useMovies: jest.fn(),
}));
jest.mock("@/api/api", () => ({
  getGenreFetchUrl: jest.fn(() => "mock-genre-url"),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useParams: jest.fn(),
  };
});

describe("MoviesByGenrePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading when genres are loading", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: "action" });
    (useGenres as jest.Mock).mockReturnValue({ isLoading: true, data: [] });
    (useMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading genres...")).toBeInTheDocument();
  });

  it("shows error when no genre is selected", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: undefined });
    (useGenres as jest.Mock).mockReturnValue({ isLoading: false, data: [] });
    (useMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("No genre selected")).toBeInTheDocument();
  });

  it("shows error if genre not found", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: "unknown" });
    (useGenres as jest.Mock).mockReturnValue({ isLoading: false, data: [] });
    (getGenreFetchUrl as jest.Mock).mockReturnValue(null);
    (useMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Genre not found")).toBeInTheDocument();
  });

  it("shows error if movie loading fails", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: "action" });
    (useGenres as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: "Action" }],
    });
    (useMovies as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Fetch failed"),
      data: [],
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Error loading movies")).toBeInTheDocument();
  });

  it("renders movie list when data is available", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: "action" });
    (useGenres as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: "Action" }],
    });
    (useMovies as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ id: 1, title: "Movie 1" }],
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByTestId("content-filter")).toHaveTextContent(
      "Filter: action",
    );
    expect(screen.getByTestId("movie-list")).toHaveTextContent(
      "List: Action Movies",
    );
  });

  it("shows no results message if movies array is empty", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: "action" });
    (useGenres as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: "Action" }],
    });
    (useMovies as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("No movies found for this genre"),
    ).toBeInTheDocument();
  });

  it("shows loading movies message", () => {
    (useParams as jest.Mock).mockReturnValue({ genre: "action" });
    (useGenres as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: "Action" }],
    });
    (useMovies as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: [],
    });

    render(
      <MemoryRouter>
        <MoviesByGenrePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });
});
