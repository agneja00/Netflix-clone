import "@testing-library/jest-dom";

jest.mock("./src/config/environments", () => ({
  PROD: "development",
}));
