import { render, fireEvent, screen } from "@testing-library/react";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Nav Component", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it("renders logo and avatar", () => {
    renderWithRouter(<Nav />);
    expect(screen.getByAltText("Netflix Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Netflix Profile")).toBeInTheDocument();
  });

  it("navigates to home when clicking the logo", () => {
    renderWithRouter(<Nav />);
    fireEvent.click(screen.getByAltText("Netflix Logo"));
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  it("searches and navigates on Enter key", () => {
    renderWithRouter(<Nav />);
    const searchButton = screen.getByTestId("search-icon");

    fireEvent.click(searchButton);

    const input = screen.getByPlaceholderText(
      "Search for movies, shows, and more...",
    );

    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockedNavigate).toHaveBeenCalledWith("/search?query=Inception");
  });

  it("does not navigate on Enter if input is empty", () => {
    renderWithRouter(<Nav />);
    const searchButton = screen.getByTestId("search-icon");

    fireEvent.click(searchButton);

    const input = screen.getByPlaceholderText(
      "Search for movies, shows, and more...",
    );

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("closes search input when clicking outside", () => {
    renderWithRouter(<Nav />);
    const searchButton = screen.getByTestId("search-icon");

    fireEvent.click(searchButton);

    expect(
      screen.getByPlaceholderText("Search for movies, shows, and more..."),
    ).toBeInTheDocument();

    const header = screen.getByRole("banner");
    fireEvent.click(header);

    expect(
      screen.queryByPlaceholderText("Search for movies, shows, and more..."),
    ).not.toBeInTheDocument();
  });
});
