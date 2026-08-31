import { useEffect, useMemo, useRef } from "react";
import { easeElasticOut, interpolateGreys, select } from "d3";
import { group, rect } from "../d3wrapper/d3wrapper";
import { SVGRoot } from "./SVGRoot";
import { SVGRectangle } from "./SVGRectangle";
import { Rectangle } from "../drawing/Rectangle";
import { NoiseRect } from "../drawing/NoiseRect";
import { TAILWIND_COLORS } from "../utils/colors";
import {
  getScenarioColumns,
  getScenarioLimit,
  toScenarioHeight,
  toScenarioPadding,
} from "./consts";
import { getGrid } from "../utils/getGrid";

export type PerlinNoiseGridProps = {
  scale?: number;
  seed?: number;
  color?: (value: number) => string;
  pageMul?: number;
  width?: number;
};

export function PerlinNoiseGrid(props: PerlinNoiseGridProps) {
  const {
    pageMul,

    scale = 0.1,
    seed = 1337,
    color = interpolateGreys,
    width = 700,
  } = props;

  const howManyElements = getScenarioLimit(pageMul);

  const howManyColumns = getScenarioColumns(howManyElements);
  const howManyRows = Math.ceil(howManyElements / howManyColumns);

  const viewBoxRect = useMemo(() => new Rectangle(0, 0, width, toScenarioHeight(width)), [width]);

  const canvas = useMemo(() => {
    const px = toScenarioPadding(width);
    const py = toScenarioHeight(px);

    return viewBoxRect.getPadded(-px, -py);
  }, [width, viewBoxRect]);

  const d3Ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!d3Ref.current) return;

    const noiseRect = NoiseRect.fromPerlin(howManyColumns, howManyRows, scale, seed);

    const grid = getGrid(canvas, howManyColumns, howManyRows);

    const cells: CellData[] = [];

    for (const cell of grid) {
      const { x, y, width, height, index, colIndex, rowIndex } = cell;
      const noiseValue = noiseRect.get(colIndex, rowIndex);

      cells.push({
        id: `${index}`,
        x,
        y,
        width,
        height,
        noiseValue,
        fill: color(noiseValue),
        opacity: 1,
      });
    }

    const d3Group = select(d3Ref.current).data([cells]);
    d3Group.call(gridRow);
  }, [howManyColumns, howManyRows, scale, seed, color, canvas]);

  return (
    <SVGRoot width={viewBoxRect.width} height={viewBoxRect.height} viewBoxRect={viewBoxRect}>
      <SVGRectangle rectangle={viewBoxRect} fill={TAILWIND_COLORS.gray[900]} />
      <g ref={d3Ref} />
    </SVGRoot>
  );
}

type CellData = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  noiseValue: number;
  fill: string;
  opacity: number;
};

const customEase = easeElasticOut.amplitude(1).period(1);

const cellShape = rect<CellData>("cell-shape")
  .data(
    (d) => [d],
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.fill)
      .attr("opacity", (d) => d.opacity),
  )
  .merged((merged) =>
    merged
      .transition()
      .ease(customEase)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.fill)
      .attr("opacity", (d) => d.opacity),
  );

const cellGroup = group<CellData>("cell-group").merged((selection) => selection.call(cellShape));

const gridCell = group<CellData, CellData[]>("grid-cell")
  .data((d) => d)
  .enter((selection) => selection.attr("transform", (d) => `translate(${d.x},${d.y})`))
  .update((selection) =>
    selection
      .transition()
      .ease(customEase)
      .attr("transform", (d) => `translate(${d.x},${d.y})`),
  )
  .merged(cellGroup);

const gridRow = group<CellData[]>("grid").merged(gridCell);
