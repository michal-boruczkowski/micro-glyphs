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

  it("supports custom hue spread options", () => {
    expect({
      "custom 180 deg": generateThemeForBackground("#0f172a", { hueSpread: 180 }),
      "custom 90 deg": generateThemeForBackground("#0f172a", { hueSpread: 90 }),
    }).toMatchSnapshot();
  });
});

