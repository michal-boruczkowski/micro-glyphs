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
import { easeElasticOut, select } from "d3";
import { path, group, onClick, defs, rect } from "../d3wrapper/d3wrapper";
import { TAILWIND_COLORS } from "../utils/colors";
import { getGrid } from "../utils/getGrid";
import { CounterStrategyOptions, useCounterStrategy } from "../utils/useCounterStrategy";
import { getRainbowGradient, rainbowGradientRenderer } from "../d3wrapper/rainbowGradient";
import { getGlowFilter, glowFilterRenderer } from "../d3wrapper/glowFilter";
import { getGoldenDivision } from "../utils/getGoldenDivision";
import { DivisionType } from "./divisionType";

type SVGRasterScenarioProps = CounterStrategyOptions & {
  svgRasters: SVGRaster[];

  color?: CSSProperties["color"];
  background?: CSSProperties["color"];
  stroke?: CSSProperties["color"];
  gradientColors?: CSSProperties["color"][];

  width?: number;

  autoCenter?: boolean;
  showBox?: boolean;
  glowSize?: number;
  strokeSize?: number;
  roundingSize?: number;
  divisionType?: DivisionType;
};

export function SVGRasterScenario(props: SVGRasterScenarioProps) {
  const {
    svgRasters,
    color = TAILWIND_COLORS.slate[100],
    background = TAILWIND_COLORS.gray[800],
    width = 700,
    gradientColors,
    autoCenter = false,
    showBox = false,
    glowSize = 4,
    strokeSize,
    roundingSize,
    stroke,
    divisionType = DivisionType.GRID,
    ...counterOptions
  } = props;

  const [data] = useCounterStrategy(svgRasters, counterOptions);

  const { duration = 300, page = 1, pageMul = 2 } = counterOptions;

  const animateOpacity = !(data.length === page || data.length === getScenarioLimit(pageMul));

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

    let grid = [];

    switch (divisionType) {
      case DivisionType.GRID:
        grid = getGrid(canvas, howManyColumns, howManyRows, autoCenter);
        break;
      case DivisionType.GOLDEN:
        grid = getGoldenDivision(canvas, data.length).map((rectangle, i) => ({
          x: rectangle.x,
          y: rectangle.y,
          width: rectangle.width,
          height: rectangle.height,
          index: i,
        }));
        break;
    }

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

      const rainbowGradient =
        gradientColors?.length > 0 ? getRainbowGradient(index, gradientColors) : undefined;

      const glowFilter = glowSize > 0 && getGlowFilter(index, glowSize);

      cells.push({
        id: svgRaster.hash,
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
        fill: color,
        stroke: rainbowGradient ? rainbowGradient.url : stroke,
        strokeWidth: strokeSize < 0 ? niceRounding / PHI : strokeSize,
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

    const d3Group = select(d3Ref.current).data([cells]);

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
    gradientColors,
    stroke,
    divisionType,
    showBox,
  ]);

  return (
    <SVGRoot width={viewBoxRect.width} height={viewBoxRect.height} viewBoxRect={viewBoxRect}>
      <SVGRectangle rectangle={viewBoxRect} fill={background} />
      <g ref={d3Ref} />
    </SVGRoot>
  );
}

const customEase = easeElasticOut.amplitude(1).period(1);

const glyph = path("glyph-path")
  .data(
    (d) => [d],
    (d) => d.id,
  )
  .enter((enter) =>
    enter
      .attr("d", (d) => d.d)
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("opacity", (d) => (d.animateOpacity ? 0 : 1))
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth)
      .on("click", onClick),
  )
  .merged((merged) =>
    merged
      .on("click", onClick)
      .transition()
      .ease(customEase)
      .duration((d) => d.duration)
      .attr("d", (d) => d.d)
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("opacity", 1)
      .attr("fill", (d) => d.fill)
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  );

const glyphGroup = group("glyph-group").merged((selection) =>
  selection.call(glyphBackground).call(defsContainer).call(glowGlyph).call(glyph),
);

const gridCell = group("grid-cell")
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
      .attr("transform", (d) => `translate(${d.dx},${d.dy})`)
      .attr("opacity", (d) => (d.animateOpacity ? 0 : 1))
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
      .attr("opacity", 1)
      .attr("fill", "none")
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", (d) => d.strokeWidth),
  );

const glyphBackground = rect("glyph-background")
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
