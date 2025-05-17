import { render, screen } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import SearchResultsPage from "./SearchResultsPage";
import { useSearchMovies } from "../../hooks/hooks";

jest.mock("@/components/Banner/Banner", () => ({
  __esModule: true,
  default: () => <div data-testid="banner">Mocked Banner</div>,
}));

jest.mock("@/components/MovieCardList/MovieCardList", () => ({
  __esModule: true,
  default: ({ category }: { category: string }) => (
    <div data-testid="movie-list">List: {category}</div>
  ),
}));

jest.mock("../../hooks/hooks", () => ({
  useSearchMovies: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: jest.fn(),
  };
});

describe("SearchResultsPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows prompt if no query is given", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      jest.fn(),
    ]);
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <SearchResultsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Search Movies & TV Shows")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a search term to find movies and TV shows"),
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    const params = new URLSearchParams({ query: "batman" });
    (useSearchParams as jest.Mock).mockReturnValue([params, jest.fn()]);
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <SearchResultsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading results...")).toBeInTheDocument();
  });

  it("shows error message when fetch fails", () => {
    const params = new URLSearchParams({ query: "batman" });
    (useSearchParams as jest.Mock).mockReturnValue([params, jest.fn()]);
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error("Something went wrong"),
    });

    render(
      <MemoryRouter>
        <SearchResultsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders MovieCardList with results", () => {
    const params = new URLSearchParams({ query: "batman" });
    (useSearchParams as jest.Mock).mockReturnValue([params, jest.fn()]);
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: [{ id: 1, title: "Batman Begins" }],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <SearchResultsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("movie-list")).toHaveTextContent(
      "List: Search Results (1)",
    );
    expect(screen.getByText('Results for "batman"')).toBeInTheDocument();
  });

  it("shows no results message when list is empty", () => {
    const params = new URLSearchParams({ query: "unknown" });
    (useSearchParams as jest.Mock).mockReturnValue([params, jest.fn()]);
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <SearchResultsPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("No results found for your search"),
    ).toBeInTheDocument();
  });
});
