import { render, fireEvent, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";
import React, { useState } from "react";

const TestComponent = ({
  initialValue = "initial value",
  onKeyDown = () => {},
}: {
  initialValue?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <SearchInput
      value={inputValue}
      onChange={handleChangeInternal}
      onKeyDown={onKeyDown}
      placeholder="Search"
      data-testid="search-input"
    />
  );
};

describe("SearchInput Component", () => {
  it("renders with placeholder", () => {
    render(<TestComponent />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    render(<TestComponent />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "New value" } });

    expect(inputElement.value).toBe("New value");
  });

  it("calls onKeyDown when a key is pressed", () => {
    const onKeyDownMock = jest.fn();
    render(<TestComponent onKeyDown={onKeyDownMock} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    expect(onKeyDownMock.mock.calls[0][0].key).toBe("Enter");
  });

  it("applies custom props like data-testid", () => {
    render(<TestComponent />);
    const inputElement = screen.getByTestId("search-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with initial value", () => {
    render(<TestComponent initialValue="preset" />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("preset");
  });

  it("updates value correctly on multiple changes", () => {
    render(<TestComponent />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "First" } });
    expect(inputElement.value).toBe("First");

    fireEvent.change(inputElement, { target: { value: "Second" } });
    expect(inputElement.value).toBe("Second");
  });
});
