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
  autoCenter = false,
) {
  const cells: GridCell[] = [];

  const cellWidth = container.width / howManyColumns;
  const cellHeight = container.height / howManyRows;

  const cellSize = Math.min(cellWidth, cellHeight);

  const xOffset = autoCenter ? (container.width - cellSize * howManyColumns) / 2 : 0;
  const yOffset = autoCenter ? (container.height - cellSize * howManyRows) / 2 : 0;

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

      totalWidth += width;

      if (colIndex === howManyColumns - 1) {
        totalHeight += height;
      }
    }
  }

  return cells;
}
