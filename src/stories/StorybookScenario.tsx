import { useId, useMemo, useState } from "react";
import { PHI, toScenarioHeight, toScenarioPadding } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRoot } from "../components/SVGRoot";
import { SVGRectangle } from "../components/SVGRectangle";
import { SVGGrid } from "../components/SVGGrid";
import { SVGRaster } from "../drawing/SVGRaster";
import { CellSizeFunction, equalCellSizeFunction } from "../utils/cellSizeFunction";

type StorybookScenarioProps = {
  svgRasters: SVGRaster[];
  howManyColumns?: number;
  cellSizeFunction?: (
    canvas: Rectangle,
    howManyRows: number,
    howManyColumns: number,
  ) => CellSizeFunction;
};

const scenarioWidth = 700;

const viewBoxRect = new Rectangle(0, 0, scenarioWidth, toScenarioHeight(scenarioWidth));

export function StorybookScenario(props: StorybookScenarioProps) {
  const { svgRasters, howManyColumns = 16, cellSizeFunction } = props;

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const canvas = useMemo(() => {
    const padding = toScenarioPadding(scenarioWidth);

    return viewBoxRect.getPadded(-padding);
  }, []);

  const howManyRows = Math.ceil(svgRasters.length / howManyColumns);

  const sizeFunction = useMemo(() => {
    return cellSizeFunction
      ? cellSizeFunction(canvas, howManyRows, howManyColumns)
      : equalCellSizeFunction(canvas, howManyRows, howManyColumns);
  }, [canvas, howManyRows, howManyColumns]);

  const gradientId = useId();
  const selectedGradientId = useId();
  const filterId = useId();

  return (
    <SVGRoot width={viewBoxRect.width} height={viewBoxRect.height} viewBoxRect={viewBoxRect}>
      <defs>
        {/* Definicja gradientu */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#B200FF" />
        </linearGradient>

        <linearGradient id={selectedGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A67C00" />
          <stop offset="50%" stopColor="#F9DF9F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>

        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SVGRectangle rectangle={viewBoxRect} fill="#1B1E32" stroke="red" />
      <SVGGrid
        howManyColumns={howManyColumns}
        howManyRows={howManyRows}
        rectangle={canvas}
        cellSizeFunction={sizeFunction}
      >
        {svgRasters.map((svgRaster, i) => {
          const rowIndex = Math.floor(i / howManyColumns);
          const colIndex = i - rowIndex * howManyColumns;

          const cellRectangle = sizeFunction(rowIndex, colIndex);

          const cellWidth = cellRectangle.width;
          const cellHeight = cellRectangle.height;

          const cellSize = Math.min(cellWidth, cellHeight);

          //TODO: More columns = smaller padding. d3 scale?
          const paddedCellSize = (cellSize * 1) / PHI;

          const cellViewBoxSize = Math.ceil(paddedCellSize);

          const x = (cellWidth - cellViewBoxSize) / 2;
          const y = (cellHeight - cellViewBoxSize) / 2;

          const transform = `translate(${x}, ${y})`;

          const rounding = Math.sqrt(cellViewBoxSize) / PHI;

          const d = svgRaster.toPath(cellViewBoxSize, rounding);

          return (
            <g
              transform={transform}
              cursor="pointer"
              onClick={() => {
                if (selected.has(i)) {
                  selected.delete(i);
                } else {
                  selected.add(i);
                }
                console.log(Array.from(selected));
                setSelected(new Set(selected));
              }}
            >
              <SVGRectangle
                rectangle={new Rectangle(0, 0, cellWidth, cellViewBoxSize)}
                fill="transparent"
              />
              <path
                d={d}
                fill="none"
                stroke={`url(#${selected.has(i) ? selectedGradientId : gradientId})`}
                strokeWidth={rounding / PHI}
                filter={`url(#${filterId})`}
              />

              {/* WARSTWA 2: Właściwy, ostry kształt z białą figurą w środku */}
              <path
                d={d}
                fill={"#FDFDFF"}
                stroke={`url(#${selected.has(i) ? selectedGradientId : gradientId})`}
                strokeWidth={rounding / PHI / PHI}
              />
            </g>
          );
        })}
      </SVGGrid>
    </SVGRoot>
  );
}
