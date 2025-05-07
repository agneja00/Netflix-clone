import { render, screen } from "@testing-library/react";
import {
  UseQueryResult,
  QueryObserverSuccessResult,
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
} from "@tanstack/react-query";
import Banner from "./Banner";
import { IMovie } from "../types/types";
import { useNetflixOriginals } from "../hooks/hooks";
import { API_CONFIG } from "@/config/constants";

jest.mock("./Banner.module.scss", () => ({
  banner: "banner-mock",
  banner__background: "banner__background-mock",
  banner__contents: "banner__contents-mock",
  banner__title: "banner__title-mock",
  banner__description: "banner__description-mock",
}));

jest.mock("../hooks/hooks");

jest.mock("@/config/constants", () => ({
  API_CONFIG: {
    TMDB: {
      IMAGE_BASE: "https://image.tmdb.org/t/p/original/",
      API_BASE: "https://api.themoviedb.org/3/",
      ENDPOINTS: {
        MOVIE: "movie",
        TRAILER: "videos",
      },
    },
  },
}));

const mockUseNetflixOriginals = useNetflixOriginals as jest.MockedFunction<
  typeof useNetflixOriginals
>;

const createMockQueryResult = <T, E = Error>(
  data: T | undefined,
  overrides: Partial<UseQueryResult<T, E>> = {},
): UseQueryResult<T, E> => {
  const base = {
    data,
    error: null as E | null,
    isError: false,
    isLoading: false,
    isPending: false,
    isSuccess: Boolean(data),
    status: data ? ("success" as const) : ("pending" as const),
    fetchStatus: "idle" as const,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: false,
    isFetching: false,
    isInitialLoading: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetching: false,
    isStale: false,
    refetch: jest.fn(),
  };

  if (data) {
    return {
      ...base,
      ...overrides,
      data,
      isSuccess: true,
      status: "success",
    } as QueryObserverSuccessResult<T, E>;
  }

  if (overrides.isLoading) {
    return {
      ...base,
      ...overrides,
      data: undefined,
      isSuccess: false,
      status: "pending",
      fetchStatus: "fetching",
      isLoading: true,
      isPending: true,
    } as unknown as QueryObserverLoadingResult<T, E>;
  }

  if (overrides.isError) {
    return {
      ...base,
      ...overrides,
      data: undefined,
      isSuccess: false,
      status: "error",
      isError: true,
      isLoadingError: true,
    } as unknown as QueryObserverLoadingErrorResult<T, E>;
  }

  return {
    ...base,
    ...overrides,
  } as UseQueryResult<T, E>;
};

describe("Banner Component", () => {
  const mockMovieWithTitle = {
    id: 123,
    backdrop_path: "/test-backdrop.jpg",
    title: "Test Movie Title",
    overview: "Test movie overview",
  };

  const mockMovieWithName = {
    id: 124,
    name: "Test Movie Name",
    overview: "Test movie overview",
  };

  const mockMovieWithOriginalTitle = {
    id: 125,
    original_title: "Test Original Title",
    overview: "Test movie overview",
  };

  const mockMovieWithGenres = {
    id: 126,
    title: "Movie with Genres",
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
    ],
    overview: "Test movie with genres",
  };

  const minimalMovie = {
    id: 456,
    title: "Minimal Movie",
    overview: "Minimal test movie",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering states", () => {
    it("should render loading state", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult<IMovie>(undefined, {
          isLoading: true,
          isPending: true,
        }),
      );
      render(<Banner />);
      expect(screen.getByTestId("banner-loading")).toBeInTheDocument();
    });

    it("should render error state", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult<IMovie>(undefined, {
          isError: true,
          error: new Error("Test error"),
        }),
      );
      render(<Banner />);
      expect(screen.getByTestId("banner-error")).toBeInTheDocument();
    });

    it("should render with default background when no data", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult<IMovie>(undefined),
      );
      render(<Banner />);

      const background = screen.getByTestId("banner-background");
      expect(background).toHaveStyle({
        backgroundImage: "linear-gradient(to right, #111, #555)",
      });
    });
  });

  describe("Content display", () => {
    it("should display movie backdrop when available", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...mockMovieWithTitle }),
      );
      render(<Banner />);

      const background = screen.getByTestId("banner-background");
      expect(background).toHaveStyle({
        backgroundImage: `url("${API_CONFIG.TMDB.IMAGE_BASE}${mockMovieWithTitle.backdrop_path}")`,
      });
    });

    it("should display title when available", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...mockMovieWithTitle }),
      );
      render(<Banner />);
      expect(screen.getByText(mockMovieWithTitle.title)).toBeInTheDocument();
    });

    it("should display name when title is not available", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...mockMovieWithName }),
      );
      render(<Banner />);
      expect(screen.getByText(mockMovieWithName.name)).toBeInTheDocument();
    });

    it("should display original_title when neither title nor name is available", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...mockMovieWithOriginalTitle }),
      );
      render(<Banner />);
      expect(
        screen.getByText(mockMovieWithOriginalTitle.original_title),
      ).toBeInTheDocument();
    });

    it("should display movie overview when available", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...mockMovieWithTitle }),
      );
      render(<Banner />);
      expect(screen.getByText(mockMovieWithTitle.overview)).toBeInTheDocument();
    });

    it("should handle movie with genres", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...mockMovieWithGenres }),
      );
      render(<Banner />);
      expect(screen.getByText(mockMovieWithGenres.title)).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty movie data gracefully", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult<IMovie>(undefined),
      );
      render(<Banner />);
      expect(screen.getByTestId("banner")).toBeInTheDocument();
      expect(screen.queryByTestId("banner-title")).not.toBeInTheDocument();
    });

    it("should handle minimal movie data", () => {
      mockUseNetflixOriginals.mockReturnValue(
        createMockQueryResult({ ...minimalMovie }),
      );
      render(<Banner />);
      expect(screen.getByText(minimalMovie.title)).toBeInTheDocument();
    });
  });
});
