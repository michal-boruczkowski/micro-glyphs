import { Rectangle } from "../drawing/Rectangle";
import { CellSizeFunction, equalCellSizeFunction } from "./cellSizeFunction";

export type GridCell = {
  colIndex: number;
  rowIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getGrid(
  container: Rectangle,
  howManyColumns: number = 0,
  howManyRows: number = 0,
  cellSizeFunction?: CellSizeFunction,
) {
  const cells: GridCell[] = [];

  let totalHeight = 0;

  const sizeFunction =
    cellSizeFunction || equalCellSizeFunction(container, howManyRows, howManyColumns);

  for (let rowIndex = 0; rowIndex < howManyRows; rowIndex++) {
    let totalWidth = 0;

    for (let colIndex = 0; colIndex < howManyColumns; colIndex++) {
      const cellSize = sizeFunction(rowIndex, colIndex);

      cells.push({
        rowIndex,
        colIndex,
        x: totalWidth,
        y: totalHeight,
        width: cellSize.width,
        height: cellSize.height,
      });

      totalWidth += cellSize.width;

      if (colIndex === howManyColumns - 1) {
        totalHeight += cellSize.height;
      }
    }
  }

  return cells;
}

export function getCellIndex(rowIndex: number, colIndex: number, howManyColumns: number) {
  return rowIndex * howManyColumns + colIndex;
}
