import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import {
  getScenarioColumns,
  getScenarioLimit,
  PHI,
  toScenarioHeight,
  toScenarioPadding,
} from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRoot } from "../components/SVGRoot";
import { SVGRectangle } from "../components/SVGRectangle";
import { SVGRaster } from "../drawing/SVGRaster";
import { select } from "d3";
import { path, group, onClick, defs } from "../d3wrapper/d3wrapper";
import { TAILWIND_COLORS } from "../utils/colors";
import { getGrid } from "../utils/getGrid";
import { useCounterStrategy } from "../utils/useCounterStrategy";
import { getRainbowGradient, rainbowGradientRenderer } from "../d3wrapper/rainbowGradient";
import { getGlowFilter, glowFilterRenderer } from "../d3wrapper/glowFilter";

type SVGRasterScenarioProps = {
  svgRasters: SVGRaster[];

  color?: CSSProperties["color"];
  background?: CSSProperties["color"];
  stroke?: CSSProperties["color"];
  gradientColor1?: CSSProperties["color"];
  gradientColor2?: CSSProperties["color"];
  gradientColor3?: CSSProperties["color"];

  width?: number;

  start?: number;
  stop?: number;
  page?: number;

  autoCenter?: boolean;
  animateOpacity?: boolean;
  glowSize?: number;
  strokeSize?: number;
  roundingSize?: number;

  duration?: number;
};

const DEFAULT_GRADIENT = [
  TAILWIND_COLORS.sky[100],
  TAILWIND_COLORS.indigo[400],
  TAILWIND_COLORS.orange[700],
];

// <stop offset="0%" stopColor="#A67C00" />
//     <stop offset="50%" stopColor="#F9DF9F" />
//     <stop offset="100%" stopColor="#D4AF37" />

export function SVGRasterScenario(props: SVGRasterScenarioProps) {
  const {
    svgRasters,
    color = TAILWIND_COLORS.slate[100],
    background = TAILWIND_COLORS.gray[800],
    width = 700,
    start,
    stop,
    page = getScenarioLimit(2),
    gradientColor1,
    gradientColor2,
    gradientColor3,
    autoCenter = false,
    duration = 300,
    glowSize = 4,
    strokeSize,
    roundingSize,
    animateOpacity = true,
    stroke,
  } = props;

  const [data] = useCounterStrategy(svgRasters, {
    start,
    stop,
    page,
    duration,
  });

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const viewBoxRect = useMemo(() => new Rectangle(0, 0, width, toScenarioHeight(width)), [width]);

  const canvas = useMemo(() => {
    const padding = toScenarioPadding(width);

    return viewBoxRect.getPadded(-padding);
  }, [width, viewBoxRect]);

  const howManyColumns = getScenarioColumns(data.length);
  const howManyRows = Math.ceil(data.length / howManyColumns);

  const d3Ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!d3Ref.current) return;

    const { x, y } = canvas;

    const grid = getGrid(canvas, howManyColumns, howManyRows, autoCenter);

    const cells = [];

    for (const cell of grid) {
      const { x, y, width, height, index } = cell;

      const svgRaster = data[index];

      if (!svgRaster) {
        continue;
      }

      const viewBox = Math.min(width, height);
      const niceRounding = Math.sqrt(viewBox) / PHI;
      const rounding = roundingSize < 0 ? niceRounding : roundingSize;

      const gradientColors = [gradientColor1, gradientColor2, gradientColor3].filter(Boolean);
      const rainbowGradient =
        gradientColors.length > 0 ? getRainbowGradient(index, gradientColors) : undefined;

      const glowFilter = glowSize > 0 && getGlowFilter(index, glowSize);

      cells.push({
        id: svgRaster.hash,
        x: x + (width - viewBox) / 2,
        y: y + (height - viewBox) / 2,
        width,
        height,
        duration,
        d: svgRaster.toPath(viewBox, rounding),
        rainbowGradient,
        glowFilter,
        fill: color,
        stroke: rainbowGradient ? rainbowGradient.url : stroke,
        strokeWidth: strokeSize < 0 ? niceRounding / PHI / PHI : strokeSize,
        animateOpacity,
        onClick: () => {
          if (selected.has(index)) {
            selected.delete(index);
          } else {
            selected.add(index);
          }
          setSelected(new Set(selected));
        },
      });
    }

    const d3Group = select(d3Ref.current).data([cells]).attr("transform", `translate(${x}, ${y})`);

    d3Group.call(gridRow);
  }, [
    data,
    duration,
    selected,
    svgRasters,
    animateOpacity,
    strokeSize,
    roundingSize,
    glowSize,
    color,
    background,
    canvas,
    howManyColumns,
    howManyRows,
    autoCenter,
    gradientColor1,
    gradientColor2,
    gradientColor3,
    stroke,
  ]);

  return (
    <SVGRoot width={viewBoxRect.width} height={viewBoxRect.height} viewBoxRect={viewBoxRect}>
      <SVGRectangle rectangle={viewBoxRect} fill={background} />
      <g ref={d3Ref} />
    </SVGRoot>
  );
}

const glyph = path("glyph-path")
  .data(
    (d) => [d],
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("d", (d) => d.d)
      .attr("opacity", (d) => (d.animateOpacity ? 0 : 1))
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth)
      .on("click", onClick),
  )
  .merged((merged) =>
    merged
      .on("click", onClick)
      .transition()
      .duration((d) => d.duration)
      .attr("d", (d) => d.d)
      .attr("opacity", 1)
      .attr("fill", (d) => d.fill)
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  );

const glyphGroup = group("glyph-group").merged((selection) =>
  selection.call(defsContainer).call(glowGlyph).call(glyph),
);

const gridCell = group("grid-cell")
  .data((d) => d)
  .enter((selection) => selection.attr("transform", (d) => `translate(${d.x},${d.y})`))
  .update((selection) =>
    selection
      .transition()
      .duration((d) => d.duration)
      .attr("transform", (d) => `translate(${d.x},${d.y})`),
  )
  .merged(glyphGroup);

const gridRow = group("grid").merged(gridCell);

const defsContainer = defs().merged((selection) =>
  selection.call(rainbowGradientRenderer).call(glowFilterRenderer),
);

const glowGlyph = path("glyph-path-filter")
  .data(
    (d) => (d.glowFilter ? [d] : []),
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("filter", (d) => `url(#${d.glowFilter.id})`)
      .attr("d", (d) => d.d)
      .attr("opacity", (d) => (d.animateOpacity ? 0 : 1))
      .attr("fill", "none")
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  )
  .merged((merged) =>
    merged
      .transition()
      .duration((d) => d.duration)
      .attr("d", (d) => d.d)
      .attr("opacity", 1)
      .attr("fill", "none")
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  );
