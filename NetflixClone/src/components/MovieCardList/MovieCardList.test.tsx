import { render, screen } from "@testing-library/react";
import MovieCardList from "./MovieCardList";
import { useMovies } from "../hooks/hooks";
import { IMovie } from "../types/types";

jest.mock("../MovieCard/MovieCard", () => ({
  __esModule: true,
  default: ({ movie }: { movie: IMovie }) => (
    <div data-testid="movie-card">{movie.title}</div>
  ),
}));

jest.mock(
  "./MovieCardList.module.scss",
  () =>
    new Proxy(
      {},
      {
        get: (_, key) => key,
      },
    ),
);

jest.mock("../hooks/hooks", () => ({
  useMovies: jest.fn(),
}));

const mockMovies: IMovie[] = [
  { id: 1, title: "Inception", poster_path: "/poster.jpg" },
  { id: 2, title: "Interstellar", backdrop_path: "/backdrop.jpg" },
];

describe("MovieCardList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: false,
    });

    render(<MovieCardList category="Trending" fetchUrl="/test-url" />);
    expect(screen.getByText("Loading Trending...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: true,
    });

    render(<MovieCardList category="Trending" fetchUrl="/test-url" />);
    expect(screen.getByText("Error loading Trending")).toBeInTheDocument();
  });

  it("renders nothing if there are no movies", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: false,
    });

    const { container } = render(
      <MovieCardList category="Trending" fetchUrl="/test-url" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders movie cards from hook data", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: false,
    });

    render(<MovieCardList category="Trending" fetchUrl="/test-url" />);
    expect(screen.getByText("Trending")).toBeInTheDocument();
    expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("renders movie cards from direct prop", () => {
    render(<MovieCardList category="Featured" movies={mockMovies} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
  });
});
