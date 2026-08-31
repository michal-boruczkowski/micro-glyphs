import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { easeElasticOut, interpolateGreens, select } from "d3";
import { defs, group, path, rect } from "../d3wrapper/d3wrapper";
import { getRainbowGradient, rainbowGradientRenderer } from "../d3wrapper/rainbowGradient";
import { getGlowFilter, glowFilterRenderer } from "../d3wrapper/glowFilter";
import { SVGRoot } from "./SVGRoot";
import { SVGRectangle } from "./SVGRectangle";
import { NoiseRect } from "../drawing/NoiseRect";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRaster } from "../drawing/SVGRaster";
import { TAILWIND_COLORS } from "../utils/colors";
import {
  getScenarioColumns,
  getScenarioLimit,
  PHI,
  toScenarioHeight,
  toScenarioPadding,
} from "./consts";
import { getGrid } from "../utils/getGrid";
import { matchNoiseGrid } from "../utils/noiseMatching";

export type PerlinNoiseMatchingGridProps = {
  scale?: number;
  seed?: number;
  pageMul?: number;
  width?: number;
  svgRasters?: SVGRaster[];
  windowSize?: number;
  strideX?: number;
  strideY?: number;
  duration?: number;
  color?: CSSProperties["color"];
  background?: CSSProperties["color"];
  stroke?: CSSProperties["color"];
  gradientColors?: CSSProperties["color"][];
  glowSize?: number;
  strokeSize?: number;
  roundingSize?: number;
  showBox?: boolean;
};

export function PerlinNoiseMatchingGrid(props: PerlinNoiseMatchingGridProps) {
  const {
    scale = 0.1,
    seed = 1337,
    pageMul = 4,
    width = 700,
    svgRasters = [],
    windowSize = 3,
    strideX,
    strideY,
    duration = 300,
    color = TAILWIND_COLORS.slate[100],
    background = TAILWIND_COLORS.gray[900],
    stroke,
    gradientColors,
    glowSize = 0,
    strokeSize = -1,
    roundingSize = -1,
    showBox = false,
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

  const actualStrideX = strideX ?? windowSize;
  const actualStrideY = strideY ?? windowSize;

  const noiseRect = useMemo(() => {
    const totalNoiseWidth = Math.max(
      0,
      howManyColumns * actualStrideX + (windowSize - actualStrideX),
    );
    const totalNoiseHeight = Math.max(
      0,
      howManyRows * actualStrideY + (windowSize - actualStrideY),
    );
    return NoiseRect.fromPerlin(totalNoiseWidth, totalNoiseHeight, scale, seed);
  }, [howManyColumns, howManyRows, actualStrideX, actualStrideY, windowSize, scale, seed]);

  const matched = useMemo(() => {
    if (!svgRasters || svgRasters.length === 0) {
      return null;
    }

    return matchNoiseGrid({
      noiseRect,
      dictionary: svgRasters,
      windowSize,
      strideX,
      strideY,
    });
  }, [noiseRect, svgRasters, windowSize, strideX, strideY]);

  const d3Ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!d3Ref.current || !matched) return;

    const grid = getGrid(canvas, howManyColumns, howManyRows);
    const cells: MatchingCellData[] = [];

    for (const cell of grid) {
      const { x, y, width, height, index } = cell;
      const matchedCell = matched.cells[index];
      const svgRaster = matchedCell?.symbol;

      if (!svgRaster) continue;

      const viewBox = Math.min(width, height);
      const niceRounding = Math.sqrt(viewBox) / PHI;
      const rounding = roundingSize < 0 ? niceRounding : roundingSize;

      const rainbowGradient =
        gradientColors && gradientColors.length > 0
          ? getRainbowGradient(index, gradientColors as string[])
          : undefined;

      const glowFilter = glowSize > 0 ? getGlowFilter(index, glowSize) : undefined;

      cells.push({
        id: `${index}`,
        x,
        y,
        width,
        height,
        duration,
        viewBox,
        showBox,
        dx: (width - viewBox) / 2,
        dy: (height - viewBox) / 2,
        d: svgRaster.toPath(viewBox, rounding),
        rainbowGradient,
        glowFilter,
        fill: interpolateGreens(matchedCell.noiseWindow.get(0, 0)),
        stroke: rainbowGradient ? rainbowGradient.url : stroke,
        strokeWidth: strokeSize < 0 ? niceRounding / PHI : strokeSize,
      });
    }

    const d3Group = select(d3Ref.current).data([cells]);
    d3Group.call(gridRow);
  }, [
    matched,
    duration,
    strokeSize,
    roundingSize,
    glowSize,
    color,
    background,
    canvas,
    howManyColumns,
    howManyRows,
    gradientColors,
    stroke,
    showBox,
  ]);

  return (
    <SVGRoot width={viewBoxRect.width} height={viewBoxRect.height} viewBoxRect={viewBoxRect}>
      <SVGRectangle rectangle={viewBoxRect} fill={background} />
      <g ref={d3Ref} />
    </SVGRoot>
  );
}

type MatchingCellData = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
  viewBox: number;
  showBox: boolean;
  dx: number;
  dy: number;
  d: string;
  rainbowGradient?: ReturnType<typeof getRainbowGradient>;
  glowFilter?: ReturnType<typeof getGlowFilter> | false;
  fill?: CSSProperties["color"];
  stroke?: CSSProperties["color"];
  strokeWidth?: number;
};

const customEase = easeElasticOut.amplitude(1).period(1);

const glyph = path<MatchingCellData>("glyph-path")
  .data(
    (d) => [d],
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("d", (d) => d.d)
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth)
      .attr("fill", (d) => d.fill),
  )
  .merged((merged) =>
    merged
      .transition()
      .ease(customEase)
      .duration((d) => d.duration)
      .attr("d", (d) => d.d)
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("fill", (d) => d.fill)
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  );

const defsContainer = defs<MatchingCellData>().merged((selection) =>
  selection.call(rainbowGradientRenderer).call(glowFilterRenderer),
);

const glowGlyph = path<MatchingCellData>("glyph-path-filter")
  .data(
    (d) => (d.glowFilter ? [d] : []),
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("filter", (d) => (d.glowFilter ? `url(#${d.glowFilter.id})` : null))
      .attr("d", (d) => d.d)
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("fill", "none")
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  )
  .merged((merged) =>
    merged
      .transition()
      .ease(customEase)
      .duration((d) => d.duration)
      .attr("d", (d) => d.d)
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("fill", "none")
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  );

const glyphBackground = rect<MatchingCellData>("glyph-background")
  .data(
    (d) => (d.showBox ? [d] : []),
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("stroke", "white")
      .attr("fill", "none"),
  )
  .merged((update) =>
    update
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("stroke", "white")
      .attr("fill", "none"),
  );

const glyphGroup = group<MatchingCellData>("glyph-group").merged((selection) =>
  selection.call(glyphBackground).call(defsContainer).call(glowGlyph).call(glyph),
);

const gridCell = group<MatchingCellData, MatchingCellData[]>("grid-cell")
  .data((d) => d)
  .enter((selection) => selection.attr("transform", (d) => `translate(${d.x},${d.y})`))
  .update((selection) =>
    selection
      .transition()
      .ease(customEase)
      .duration((d) => d.duration)
      .attr("transform", (d) => `translate(${d.x},${d.y})`),
  )
  .merged(glyphGroup);

const gridRow = group<MatchingCellData[]>("grid").merged(gridCell);
