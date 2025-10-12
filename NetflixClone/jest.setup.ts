import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

jest.mock("./src/config/environments", () => ({
  PROD: "development",
}));
