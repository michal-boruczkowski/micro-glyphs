import { Children, ComponentProps, useMemo } from "react";
import { Rectangle } from "../drawing/Rectangle";
import { getCellIndex, getGrid } from "../utils/getGrid";

export type SVGGridProps = ComponentProps<"g"> & {
  howManyColumns?: number;
  howManyRows?: number;
  container: Rectangle;
};

export function SVGGrid(props: SVGGridProps) {
  const { children, container, howManyColumns, howManyRows, ...rest } = props;

  const childrenArray = Children.toArray(children);

  const grid = useMemo(
    () => getGrid(container, howManyColumns, howManyRows),
    [container, howManyColumns, howManyRows],
  );

  return (
    <g transform={`translate(${container.x},${container.y})`} {...rest}>
      {grid.map((cell) => {
        const { x, y, rowIndex, colIndex } = cell;

        const index = getCellIndex(rowIndex, colIndex, howManyColumns);

        return (
          <g key={index} transform={`translate(${x},${y})`}>
            {childrenArray[index]}
          </g>
        );
      })}
    </g>
  );
}
