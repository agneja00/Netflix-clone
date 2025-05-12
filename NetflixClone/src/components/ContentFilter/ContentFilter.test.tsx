import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ContentFilter from "./ContentFilter";
import { useGenres } from "../hooks/hooks";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

jest.mock("../hooks/hooks", () => ({
  useGenres: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

const mockGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
];

const renderComponent = (selectedFilter: string | null = null) =>
  render(
    <BrowserRouter>
      <ContentFilter selectedFilter={selectedFilter} />
    </BrowserRouter>,
  );

describe("ContentFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGenres as jest.Mock).mockReturnValue({
      data: mockGenres,
      isLoading: false,
    });
  });

  it("renders filter type buttons", () => {
    renderComponent();
    expect(screen.getByText("Genre")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
  });

  it("renders genre buttons by default", () => {
    renderComponent();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  it("navigates to genre route when genre button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Action"));
    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES.MOVIES_BY_GENRE.replace(":genre", "action"),
    );
  });

  it("navigates to HOME route when 'All' button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("All"));
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });

  it("switches to Year filter and navigates correctly", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Year"));
    const yearButton = screen.getByText("2024");
    fireEvent.click(yearButton);
    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES.MOVIES_BY_YEAR.replace(":year", "2024"),
    );
  });

  it("switches to Rating filter and navigates correctly", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Rating"));
    const ratingButton = screen.getByText("9+");
    fireEvent.click(ratingButton);
    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES.MOVIES_BY_RATING.replace(":rating", "9"),
    );
  });

  it("shows loading message when genres are loading", () => {
    (useGenres as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });
    renderComponent();
    expect(screen.getByText("Loading filters...")).toBeInTheDocument();
  });
});
