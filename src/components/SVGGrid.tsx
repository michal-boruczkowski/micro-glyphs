import { Children, ComponentProps, useMemo } from "react";
import { Rectangle } from "../drawing/Rectangle";
import { CellSizeFunction } from "../utils/cellSizeFunction";
import { getCellIndex, getGrid } from "../utils/getGrid";

export type SVGGridProps = ComponentProps<"g"> & {
  howManyColumns?: number;
  howManyRows?: number;
  container: Rectangle;
  cellSizeFunction?: CellSizeFunction;
};

export function SVGGrid(props: SVGGridProps) {
  const { children, container, howManyColumns, howManyRows, cellSizeFunction, ...rest } = props;

  const childrenArray = Children.toArray(children);

  const grid = useMemo(
    () => getGrid({ container, howManyColumns, howManyRows, cellSizeFunction }),
    [container, howManyColumns, howManyRows, cellSizeFunction],
  );

  return (
    <g transform={`translate(${container.x},${container.y})`} {...rest}>
      {grid.map((row, r) => {
        return (
          <g key={r}>
            {row.map((cell, c) => {
              const { x, y } = cell;

              const index = getCellIndex(r, c, howManyColumns);

              return (
                <g key={c} transform={`translate(${x},${y})`}>
                  {childrenArray[index]}
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
