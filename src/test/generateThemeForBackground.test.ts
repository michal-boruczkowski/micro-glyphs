import { describe, expect, it } from "vitest";
import { generateThemeForBackground } from "../utils/generateThemeForBackground";

describe("generateThemeForBackground", () => {
  it("handles grayscale backgrounds without NaN hues", () => {
    expect({
      "pure black": generateThemeForBackground("#000000"),
      "pure white": generateThemeForBackground("#ffffff"),
      "neutral gray": generateThemeForBackground("#808080"),
    }).toMatchSnapshot();
  });
});
