import { Rectangle } from "../drawing/Rectangle";

export type GridCell = {
  colIndex: number;
  rowIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getGrid(container: Rectangle, howManyColumns: number = 0, howManyRows: number = 0) {
  const cells: GridCell[] = [];

  let totalHeight = 0;

  const cellWidth = container.width / howManyColumns;
  const cellHeight = container.height / howManyRows;

  for (let rowIndex = 0; rowIndex < howManyRows; rowIndex++) {
    let totalWidth = 0;

    for (let colIndex = 0; colIndex < howManyColumns; colIndex++) {
      cells.push({
        rowIndex,
        colIndex,
        x: totalWidth,
        y: totalHeight,
        width: cellWidth,
        height: cellHeight,
      });

      totalWidth += cellWidth;

      if (colIndex === howManyColumns - 1) {
        totalHeight += cellHeight;
      }
    }
  }

  return cells;
}

export function getCellIndex(rowIndex: number, colIndex: number, howManyColumns: number) {
  return rowIndex * howManyColumns + colIndex;
}
