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

  it("smoothly transitions target lightness based on background lightness", () => {
    expect({
      "dark bg (L~20)": generateThemeForBackground("#1e1e1e"),
      "mid bg (L~50)": generateThemeForBackground("#7f7f7f"),
      "light bg (L~85)": generateThemeForBackground("#dcdcdc"),
      "custom lightness bounds [10, 90]": generateThemeForBackground("#7f7f7f", {
        minLightness: 10,
        maxLightness: 90,
      }),
    }).toMatchSnapshot();
  });
});
