import { describe, expect, it } from "vitest";
import { getGridProgress } from "../utils/getGridProgress";

describe("getGridProgress", () => {
  it("calculates progress for standard and edge case grid dimensions", () => {
    expect({
      "1x1 grid": {
        "(0, 0)": getGridProgress(0, 0, 1, 1),
      },
      "1x3 grid (single column)": {
        "(0, 0)": getGridProgress(0, 0, 1, 3),
        "(0, 1)": getGridProgress(0, 1, 1, 3),
        "(0, 2)": getGridProgress(0, 2, 1, 3),
      },
      "3x1 grid (single row)": {
        "(0, 0)": getGridProgress(0, 0, 3, 1),
        "(1, 0)": getGridProgress(1, 0, 3, 1),
        "(2, 0)": getGridProgress(2, 0, 3, 1),
      },
      "3x3 grid": {
        "top-left (0, 0)": getGridProgress(0, 0, 3, 3),
        "center (1, 1)": getGridProgress(1, 1, 3, 3),
        "bottom-right (2, 2)": getGridProgress(2, 2, 3, 3),
        "top-right (2, 0)": getGridProgress(2, 0, 3, 3),
        "bottom-left (0, 2)": getGridProgress(0, 2, 3, 3),
      },
    }).toMatchSnapshot();
  });
});
