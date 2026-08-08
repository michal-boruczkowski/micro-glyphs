import { Rectangle } from "../drawing/Rectangle";
import { CellSizeFunction, equalCellSizeFunction } from "./cellSizeFunction";

export type GridCell = {
  colIndex: number;
  rowIndex: number;
  x: number;
  y: number;
};

export type GetGridProps = {
  container: Rectangle;
  howManyColumns?: number;
  howManyRows?: number;
  cellSizeFunction?: CellSizeFunction;
};

export function getGrid(props: GetGridProps): GridCell[][] {
  const { container, howManyColumns, howManyRows, cellSizeFunction } = props;

  const rows: GridCell[][] = [];

  let totalHeight = 0;

  const sizeFunction =
    cellSizeFunction || equalCellSizeFunction(container, howManyRows, howManyColumns);

  for (let rowIndex = 0; rowIndex < howManyRows; rowIndex++) {
    const row: GridCell[] = [];

    let totalWidth = 0;

    for (let colIndex = 0; colIndex < howManyColumns; colIndex++) {
      const cellSize = sizeFunction(rowIndex, colIndex);

      const x = totalWidth;
      const y = totalHeight;

      row.push({ colIndex, rowIndex, x, y });

      totalWidth += cellSize.width;

      if (colIndex === howManyColumns - 1) {
        totalHeight += cellSize.height;
      }
    }

    rows.push(row);
  }

  return rows;
}

export function getCellIndex(rowIndex: number, colIndex: number, howManyColumns: number) {
  return rowIndex * howManyColumns + colIndex;
}
