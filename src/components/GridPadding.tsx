import { useMemo } from "react";
import { Rectangle } from "../drawing/Rectangle";
import { getScenarioColumns, getScenarioLimit, phiScale, toScenarioHeight } from "./consts";
import { getGrid } from "../utils/getGrid";
import { SVGRoot } from "./SVGRoot";
import { SVGRectangle } from "./SVGRectangle";

export type GridPaddingProps = {
  pageMul?: number;
  width?: number;
  paddingX?: number;
  paddingY?: number;
  cellPaddingX?: number;
  cellPaddingY?: number;
};

export function GridPadding(props: GridPaddingProps) {
  const {
    pageMul = 4,
    width = 700,
    paddingX = 6,
    paddingY = 6,
    cellPaddingX = 1,
    cellPaddingY = 1,
  } = props;

  const howManyElements = getScenarioLimit(pageMul);
  const howManyColumns = getScenarioColumns(howManyElements);
  const howManyRows = Math.ceil(howManyElements / howManyColumns);

  const viewBoxRect = useMemo(() => new Rectangle(0, 0, width, toScenarioHeight(width)), [width]);

  const px = phiScale(viewBoxRect.width, paddingX);
  const py = phiScale(viewBoxRect.height, paddingY);

  const cpx = px / cellPaddingX;
  const cpy = py / cellPaddingY;

  const canvas = useMemo(() => {
    return viewBoxRect.getPadded(-px, -py);
  }, [px, py, viewBoxRect]);

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
