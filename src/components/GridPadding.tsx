import { useMemo } from "react";
import { getScenarioColumns, getScenarioLimit, getScenarioSetup } from "./consts";
import { getGrid } from "../utils/getGrid";
import { SVGRoot } from "./SVGRoot";
import { SVGRectangle } from "./SVGRectangle";

export type GridPaddingProps = {
  pageMul?: number;
  width?: number;
  pMul?: number;
  cMul?: number;
};

export function GridPadding(props: GridPaddingProps) {
  const { pageMul = 4, width = 700, pMul = 6, cMul = 1 } = props;

  const howManyElements = getScenarioLimit(pageMul);
  const howManyColumns = getScenarioColumns(howManyElements);
  const howManyRows = Math.ceil(howManyElements / howManyColumns);

  const { viewBoxRect, canvas, cpx, cpy } = useMemo(
    () => getScenarioSetup(width, pMul, cMul),
    [width, pMul, cMul],
  );

  const grid = useMemo(() => {
    return getGrid(canvas, howManyColumns, howManyRows, cpx, cpy);
  }, [canvas, cpx, cpy, howManyColumns, howManyRows]);

  return (
    <SVGRoot width={viewBoxRect.width} height={viewBoxRect.height} viewBoxRect={viewBoxRect}>
      <SVGRectangle rectangle={viewBoxRect} fill="black" />
      {grid.map((cell) => {
        const { index, x, y, width, height } = cell;

        return <rect key={index} x={x} y={y} width={width} height={height} fill="white" />;
      })}
    </SVGRoot>
  );
}
