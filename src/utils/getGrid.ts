import { Rectangle } from "../drawing/Rectangle";

export type GridCell = {
  colIndex: number;
  rowIndex: number;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getGrid(
  container: Rectangle,
  howManyColumns: number = 0,
  howManyRows: number = 0,
  paddingX: number = 0,
  paddingY: number = 0,
  autoCenter = false,
) {
  const cells: GridCell[] = [];

  const totalPaddingX = (howManyColumns - 1) * paddingX;
  const totalPaddingY = (howManyRows - 1) * paddingY;

  const cellWidth = (container.width - totalPaddingX) / howManyColumns;
  const cellHeight = (container.height - totalPaddingY) / howManyRows;

  const cellSize = Math.min(cellWidth, cellHeight);

  const totalGridWidth = autoCenter ? cellSize * howManyColumns + totalPaddingX : container.width;
  const totalGridHeight = autoCenter ? cellSize * howManyRows + totalPaddingY : container.height;

  const xOffset = autoCenter ? (container.width - totalGridWidth) / 2 : 0;
  const yOffset = autoCenter ? (container.height - totalGridHeight) / 2 : 0;

  let totalHeight = container.y + yOffset;

  for (let rowIndex = 0; rowIndex < howManyRows; rowIndex++) {
    let totalWidth = container.x + xOffset;

    for (let colIndex = 0; colIndex < howManyColumns; colIndex++) {
      const width = autoCenter ? cellSize : cellWidth;
      const height = autoCenter ? cellSize : cellHeight;

      cells.push({
        rowIndex,
        colIndex,
        index: rowIndex * howManyColumns + colIndex,
        x: totalWidth,
        y: totalHeight,
        width,
        height,
      });

      totalWidth += width + paddingX;

      if (colIndex === howManyColumns - 1) {
        totalHeight += height + paddingY;
      }
    }
  }

  return cells;
}
