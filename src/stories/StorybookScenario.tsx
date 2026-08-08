import { useId, useMemo, useState } from "react";
import { PHI, toScenarioHeight, toScenarioPadding } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRoot } from "../components/SVGRoot";
import { SVGRectangle } from "../components/SVGRectangle";
import { SVGRaster } from "../drawing/SVGRaster";
import { getGrid } from "../utils/getGrid";

type StorybookScenarioProps = {
  svgRasters: SVGRaster[];
  howManyColumns?: number;
};

const scenarioWidth = 700;

const viewBoxRect = new Rectangle(0, 0, scenarioWidth, toScenarioHeight(scenarioWidth));

export function StorybookScenario(props: StorybookScenarioProps) {
  const { svgRasters, howManyColumns = 16 } = props;

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const canvas = useMemo(() => {
    const padding = toScenarioPadding(scenarioWidth);

    return viewBoxRect.getPadded(-padding);
  }, []);

  const howManyRows = Math.ceil(svgRasters.length / howManyColumns);

  const grid = useMemo(
    () => getGrid(canvas, howManyColumns, howManyRows, true),
    [canvas, howManyColumns, howManyRows],
  );

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
      <g transform={`translate(${canvas.x},${canvas.y})`}>
        {grid.map((cell) => {
          const { x, y, index, width, height } = cell;

          const svgRaster = svgRasters[index];

          if (!svgRaster) {
            return null;
          }

          const cellSize = Math.min(width, height);

          //TODO: More columns = smaller padding. d3 scale?
          const paddedCellSize = (cellSize * 1) / PHI;

          const cellViewBoxSize = Math.ceil(paddedCellSize);

          const xCell = x + (width - cellViewBoxSize) / 2;
          const yCell = y + (height - cellViewBoxSize) / 2;

          const transform = `translate(${xCell}, ${yCell})`;

          const rounding = Math.sqrt(cellViewBoxSize) / PHI;

          const d = svgRaster.toPath(cellViewBoxSize, rounding);

          return (
            <g
              key={index}
              transform={transform}
              cursor="pointer"
              onClick={() => {
                if (selected.has(index)) {
                  selected.delete(index);
                } else {
                  selected.add(index);
                }
                console.log(Array.from(selected));
                setSelected(new Set(selected));
              }}
            >
              <SVGRectangle rectangle={new Rectangle(0, 0, width, height)} fill="transparent" />
              <path
                d={d}
                fill="none"
                stroke={`url(#${selected.has(index) ? selectedGradientId : gradientId})`}
                strokeWidth={rounding / PHI}
                filter={`url(#${filterId})`}
              />

              {/* WARSTWA 2: Właściwy, ostry kształt z białą figurą w środku */}
              <path
                d={d}
                fill={"#FDFDFF"}
                stroke={`url(#${selected.has(index) ? selectedGradientId : gradientId})`}
                strokeWidth={rounding / PHI / PHI}
              />
            </g>
          );
        })}
      </g>
    </SVGRoot>
  );
}
