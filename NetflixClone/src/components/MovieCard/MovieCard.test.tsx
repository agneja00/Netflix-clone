import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "./MovieCard";
import { IMovie } from "@/components/types/types";
import { ROUTES } from "@/constants/routes";
import { API_CONFIG } from "@/config/constants";

jest.mock(
  "./MovieCard.module.scss",
  () =>
    new Proxy(
      {},
      {
        get: (_, key) => key,
      },
    ),
);

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

const mockMovie: IMovie = {
  id: 123,
  title: "Inception",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  media_type: "movie",
};

describe("MovieCard component", () => {
  it("renders the movie title", () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders the movie image with correct src", () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    const img = screen.getByAltText("Inception") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      `${API_CONFIG.TMDB.IMAGE_BASE}${mockMovie.poster_path}`,
    );
  });

  it("uses fallback image if poster_path is missing", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: undefined };
    renderWithRouter(<MovieCard movie={movieWithoutPoster} />);
    const img = screen.getByAltText("Inception") as HTMLImageElement;
    expect(img.src).toBe(
      `${API_CONFIG.TMDB.IMAGE_BASE}${mockMovie.backdrop_path}`,
    );
  });

  it("uses placeholder if no image is available", () => {
    const movieWithoutImages = {
      ...mockMovie,
      poster_path: undefined,
      backdrop_path: undefined,
    };
    renderWithRouter(<MovieCard movie={movieWithoutImages} />);
    const img = screen.getByAltText("Inception") as HTMLImageElement;
    expect(img.src).toContain("/placeholder-movie.png");
  });

  it("displays media type when showType is true", () => {
    renderWithRouter(<MovieCard movie={mockMovie} showType />);
    expect(screen.getByText("Movie")).toBeInTheDocument();
  });

  it("displays 'TV Show' if media_type is 'tv'", () => {
    const tvShowMovie = { ...mockMovie, media_type: "tv" };
    renderWithRouter(<MovieCard movie={tvShowMovie} showType />);
    expect(screen.getByText("TV Show")).toBeInTheDocument();
  });

  it("links to the correct movie details page", () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(
      ROUTES.MOVIE_ID.replace(":id", mockMovie.id.toString()),
    );
  });

  it("handles image load error by switching to placeholder", () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    const img = screen.getByAltText("Inception") as HTMLImageElement;

    fireEvent.error(img);

    expect(img.src).toContain("/placeholder-movie.png");
  });
});
