import { render, screen, waitFor } from "@testing-library/react";
import Banner from "./Banner";
import { useNetflixOriginals } from "../hooks/hooks";
import { API_CONFIG } from "@/config/constants";

jest.mock("../hooks/hooks", () => ({
  useNetflixOriginals: jest.fn(),
}));

describe("Banner Component", () => {
  it("displays loading message when data is being fetched", () => {
    (useNetflixOriginals as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<Banner />);

    expect(screen.getByTestId("banner-loading")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    (useNetflixOriginals as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: "Failed to load data" },
    });

    render(<Banner />);

    expect(screen.getByTestId("banner-error")).toHaveTextContent(
      "Failed to load data",
    );
  });

  it("displays the banner with movie details when data is successfully fetched", async () => {
    const movie = {
      title: "Test Movie",
      backdrop_path: "/test-backdrop.jpg",
      overview: "This is a test movie.",
    };

    (useNetflixOriginals as jest.Mock).mockReturnValue({
      data: movie,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<Banner />);

    await waitFor(() =>
      expect(screen.getByTestId("banner")).toBeInTheDocument(),
    );

    expect(screen.getByTestId("banner-title")).toHaveTextContent("Test Movie");
    expect(screen.getByTestId("banner-description")).toHaveTextContent(
      "This is a test movie.",
    );

    expect(screen.getByTestId("banner-background")).toHaveStyle(
      `background-image: url("${API_CONFIG.TMDB.IMAGE_BASE}/test-backdrop.jpg")`,
    );
  });

  it("displays default background when no backdrop path is provided", async () => {
    const movie = {
      title: "Test Movie",
      backdrop_path: "",
      overview: "This is a test movie with no backdrop.",
    };

    (useNetflixOriginals as jest.Mock).mockReturnValue({
      data: movie,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<Banner />);

    await waitFor(() =>
      expect(screen.getByTestId("banner")).toBeInTheDocument(),
    );

    expect(screen.getByTestId("banner-background")).toHaveStyle(
      "background-image: linear-gradient(to right, #111, #555)",
    );
  });
});
