import { describe, expect, it } from "vitest";
import { Rectangle } from "../drawing/Rectangle";
import { getGrid } from "../utils/getGrid";

describe("getGrid", () => {
  it("calculates grid without cell padding (defaults to 0)", () => {
    const container = new Rectangle(0, 0, 100, 100);
    const gridNoPadding = getGrid(container, 2, 2);
    const gridExplicitZero = getGrid(container, 2, 2, 0, 0, false);

    expect({
      "2x2 default padding": gridNoPadding,
      "2x2 explicit zero padding": gridExplicitZero,
    }).toMatchSnapshot();

    expect(gridNoPadding).toEqual(gridExplicitZero);
  });

  it("calculates grid with horizontal and vertical cell padding", () => {
    const container = new Rectangle(10, 20, 100, 200);
    const grid = getGrid(container, 2, 2, 10, 20);

    expect({
      "2x2 with paddingX=10, paddingY=20": grid,
    }).toMatchSnapshot();

    // Verify cell dimensions:
    // Available width = 100 - (2-1)*10 = 90 -> cellWidth = 45
    // Available height = 200 - (2-1)*20 = 180 -> cellHeight = 90
    expect(grid[0]).toMatchObject({ x: 10, y: 20, width: 45, height: 90 });
    expect(grid[1]).toMatchObject({ x: 10 + 45 + 10, y: 20, width: 45, height: 90 });
    expect(grid[2]).toMatchObject({ x: 10, y: 20 + 90 + 20, width: 45, height: 90 });
    expect(grid[3]).toMatchObject({ x: 10 + 45 + 10, y: 20 + 90 + 20, width: 45, height: 90 });
  });

  it("centers square cells when autoCenter is enabled with padding", () => {
    const container = new Rectangle(0, 0, 100, 100);
    // 2 columns, 1 row -> cellWidth = (100 - 10)/2 = 45, cellHeight = 100
    // cellSize = min(45, 100) = 45
    // totalGridWidth = 45 * 2 + 10 = 100 (xOffset = 0)
    // totalGridHeight = 45 * 1 + 0 = 45 (yOffset = (100 - 45)/2 = 27.5)
    const centeredGrid = getGrid(container, 2, 1, 10, 0, true);

    expect({
      "2x1 autoCenter with paddingX=10": centeredGrid,
    }).toMatchSnapshot();

    expect(centeredGrid[0]).toMatchObject({ x: 0, y: 27.5, width: 45, height: 45 });
    expect(centeredGrid[1]).toMatchObject({ x: 55, y: 27.5, width: 45, height: 45 });
  });

  it("handles edge cases gracefully", () => {
    const container = new Rectangle(0, 0, 100, 100);

    expect({
      "0 columns": getGrid(container, 0, 2, 10, 10),
      "0 rows": getGrid(container, 2, 0, 10, 10),
      "1x1 with padding": getGrid(container, 1, 1, 20, 20),
    }).toMatchSnapshot();
  });
});
