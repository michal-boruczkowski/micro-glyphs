import { Children, ComponentProps, useMemo } from "react";
import { Rectangle } from "../drawing/Rectangle";
import { CellSizeFunction, equalCellSizeFunction } from "../utils/cellSizeFunction";

export type SVGGridProps = ComponentProps<"g"> & {
  howManyColumns?: number;
  howManyRows?: number;
  rectangle: Rectangle;
  cellSizeFunction?: CellSizeFunction;
};

export function SVGGrid(props: SVGGridProps) {
  const { children, rectangle, howManyColumns, howManyRows, cellSizeFunction, ...rest } = props;

  const howManyChildren = Children.count(children);
  const defaultSize = Math.sqrt(howManyChildren);

  const numberOfColumns = howManyColumns ?? defaultSize;
  const numberOfRows = howManyRows ?? defaultSize;

  const rows = useMemo(() => {
    const rows = [];
    const childrenArray = Children.toArray(children);

    let totalHeight = 0;

    const sizeFunction =
      cellSizeFunction || equalCellSizeFunction(rectangle, numberOfRows, numberOfColumns);

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];

      let totalWidth = 0;

      for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        const cellSize = sizeFunction(rowIndex, colIndex);

        const itemIndex = rowIndex * numberOfColumns + colIndex;

        const x = totalWidth;
        const y = totalHeight;

        row.push({ child: childrenArray[itemIndex], colIndex, rowIndex, x, y });

        totalWidth += cellSize.width;

        if (colIndex == numberOfColumns - 1) {
          totalHeight += cellSize.height;
        }
      }

      rows.push(row);
    }

    return rows;
  }, [children]);

  return (
    <g transform={`translate(${rectangle.x},${rectangle.y})`} {...rest}>
      {rows.map((row, r) => {
        return (
          <g key={r}>
            {row.map((cell, c) => {
              const { child, x, y } = cell;

              return (
                <g key={c} transform={`translate(${x},${y})`}>
                  {child}
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
