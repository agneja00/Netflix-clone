import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoviePage from "./MoviePage";
import { useMovieDetails } from "../../hooks/hooks";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "123" }),
}));

jest.mock("react-youtube", () => () => (
  <div data-testid="youtube-player">Mocked YouTube</div>
));

jest.mock("../../hooks/hooks", () => ({
  useMovieDetails: jest.fn(),
}));

describe("MoviePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useMovieDetails as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <MemoryRouter>
        <MoviePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading movie...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useMovieDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Not found"),
      data: null,
    });

    render(
      <MemoryRouter>
        <MoviePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Movie not found.")).toBeInTheDocument();
  });

  it("renders movie details without trailer", () => {
    (useMovieDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        title: "Test Movie",
        name: "",
        backdrop_path: "/backdrop.jpg",
        poster_path: "/poster.jpg",
        overview: "This is a test movie.",
        genres: [{ id: 1, name: "Action" }],
        videos: { results: [] },
      },
    });

    render(
      <MemoryRouter>
        <MoviePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Test Movie" }),
    ).toBeInTheDocument();
    expect(screen.getByText("This is a test movie.")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.queryByTestId("youtube-player")).not.toBeInTheDocument();
  });
});
