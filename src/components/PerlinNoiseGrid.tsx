import { useEffect, useMemo, useRef } from "react";
import { easeElasticOut, interpolateViridis, select } from "d3";
import { group, rect } from "../d3wrapper/d3wrapper";
import { SVGRoot } from "./SVGRoot";
import { SVGRectangle } from "./SVGRectangle";
import { Rectangle } from "../drawing/Rectangle";
import { createPerlin2D } from "../utils/perlinNoise";
import { TAILWIND_COLORS } from "../utils/colors";

export type PerlinNoiseGridProps = {
  width?: number;
  height?: number;
  scale?: number;
  seed?: number;
  cellSize?: number;
  color?: (value: number) => string;
};

export function PerlinNoiseGrid(props: PerlinNoiseGridProps) {
  const {
    width = 20,
    height = 20,
    scale = 0.1,
    seed = 1337,
    cellSize = 28,
    color = interpolateViridis,
  } = props;

  const d3Ref = useRef<SVGGElement | null>(null);

  const viewBoxRect = useMemo(
    () => new Rectangle(0, 0, width * cellSize, height * cellSize),
    [width, height, cellSize],
  );

  useEffect(() => {
    if (!d3Ref.current) return;

    const perlin2D = createPerlin2D(scale, seed);
    const cells: CellData[] = [];

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const noiseValue = perlin2D(col, row);
        const x = col * cellSize;
        const y = row * cellSize;

        const size = cellSize - 2;
        const rx = 1;

        cells.push({
          id: `${col}-${row}`,
          x,
          y,
          col,
          row,
          noiseValue,
          cellSize,
          size,
          rx,
          fill: color(noiseValue),
          opacity: 0.3 + noiseValue * 0.7,
        });
      }
    }

    const d3Group = select(d3Ref.current).data([cells]);
    d3Group.call(gridRow);
  }, [width, height, scale, seed, cellSize, color]);

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
  col: number;
  row: number;
  noiseValue: number;
  cellSize: number;
  size: number;
  rx: number;
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
      .attr("width", (d) => d.size)
      .attr("height", (d) => d.size)
      .attr("x", (d) => (d.cellSize - d.size) / 2)
      .attr("y", (d) => (d.cellSize - d.size) / 2)
      .attr("rx", (d) => d.rx)
      .attr("fill", (d) => d.fill)
      .attr("opacity", (d) => d.opacity),
  )
  .merged((merged) =>
    merged
      .transition()
      .ease(customEase)
      .attr("width", (d) => d.size)
      .attr("height", (d) => d.size)
      .attr("x", (d) => (d.cellSize - d.size) / 2)
      .attr("y", (d) => (d.cellSize - d.size) / 2)
      .attr("rx", (d) => d.rx)
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
