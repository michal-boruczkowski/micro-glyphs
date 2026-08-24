import { describe, expect, it } from "vitest";
import { clamp } from "../utils/clamp";

describe("clamp", () => {
  it("clamps values within min and max bounds", () => {
    expect({
      "value within [0, 1]": clamp(0.5, 0, 1),
      "value below min (0)": clamp(-0.5, 0, 1),
      "value above max (1)": clamp(1.5, 0, 1),
      "value within custom range [10, 20]": clamp(15, 10, 20),
      "value below custom min (10)": clamp(5, 10, 20),
      "value above custom max (20)": clamp(25, 10, 20),
      "exact min bound": clamp(0, 0, 1),
      "exact max bound": clamp(1, 0, 1),
    }).toMatchSnapshot();
  });

  it("uses default bounds [0, 1] when min and max are omitted", () => {
    expect({
      "default range normal": clamp(0.7),
      "default range below 0": clamp(-10),
      "default range above 1": clamp(10),
    }).toMatchSnapshot();
  });

  it("handles NaN by returning min", () => {
    expect({
      "NaN with default min": clamp(NaN),
      "NaN with custom min (5)": clamp(NaN, 5, 10),
    }).toMatchSnapshot();
  });
});
