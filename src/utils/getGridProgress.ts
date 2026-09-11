export function getGridProgress(
  colIndex: number,
  rowIndex: number,
  howManyColumns: number,
  howManyRows: number,
): number {
  const maxCol = howManyColumns - 1;
  const maxRow = howManyRows - 1;

  if (maxCol <= 0 && maxRow <= 0) {
    return 0;
  }

  if (maxCol <= 0) {
    return rowIndex / maxRow;
  }

  if (maxRow <= 0) {
    return colIndex / maxCol;
  }

  return (colIndex / maxCol + rowIndex / maxRow) / 2;
}
