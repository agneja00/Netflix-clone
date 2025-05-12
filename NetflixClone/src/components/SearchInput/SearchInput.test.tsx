import { render, fireEvent, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { useState } from "react";

const TestComponent = () => {
  const [inputValue, setInputValue] = useState("initial value");

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <SearchInput
      value={inputValue}
      onChange={handleChangeInternal}
      onKeyDown={() => {}}
      placeholder="Search"
    />
  );
};

it("calls onChange when typing", () => {
  render(<TestComponent />);

  const inputElement = screen.getByRole("textbox") as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "New value" } });

  expect(inputElement.value).toBe("New value");
});
