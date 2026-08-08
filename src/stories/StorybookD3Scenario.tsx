import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getScenarioColumns, PHI, toScenarioHeight, toScenarioPadding } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRoot } from "../components/SVGRoot";
import { SVGRectangle } from "../components/SVGRectangle";
import { SVGRaster } from "../drawing/SVGRaster";
import { select } from "d3";
import { path, group, onClick } from "../d3wrapper/d3wrapper";
import { TAILWIND_COLORS } from "../utils/colors";
import { getGrid } from "../utils/getGrid";
import { useCounterStrategy } from "../utils/useCounterStrategy";

type StorybookD3ScenarioProps = {
  svgRasters: SVGRaster[];
  width?: number;
  pageLimit?: number;
};

export function StorybookD3Scenario(props: StorybookD3ScenarioProps) {
  const { svgRasters, width = 700, pageLimit } = props;

  const duration = 300;

  const [data] = useCounterStrategy(svgRasters, pageLimit, duration);

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const viewBoxRect = useMemo(() => new Rectangle(0, 0, width, toScenarioHeight(width)), [width]);

  const canvas = useMemo(() => {
    const padding = toScenarioPadding(width);

    return viewBoxRect.getPadded(-padding);
  }, []);

  const howManyColumns = getScenarioColumns(data.length);
  const howManyRows = Math.ceil(data.length / howManyColumns);

  const d3Ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!d3Ref.current) return;

    const { x, y } = canvas;

    const grid = getGrid(canvas, howManyColumns, howManyRows, true);

    const cells = [];

    for (const cell of grid) {
      const { x, y, width, height, index } = cell;

      const svgRaster = data[index];

      if (!svgRaster) {
        continue;
      }

      const viewBox = Math.min(width, height);
      const rounding = Math.sqrt(viewBox) / PHI;

      cells.push({
        x: x + (width - viewBox) / 2,
        y: y + (height - viewBox) / 2,
        width,
        height,
        r: Math.min(width, height) / 2,
        cx: width / 2,
        cy: height / 2,
        duration,
        d: svgRaster.toPath(viewBox, rounding),
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
  }, [data, duration]);

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
      <SVGRectangle rectangle={viewBoxRect} fill="#1B1E32" />
      <g ref={d3Ref} />
    </SVGRoot>
  );
}

const myCircles = path("my-circle")
  .enter((enter) =>
    enter
      .attr("d", (d) => d.d)
      .attr("fill", TAILWIND_COLORS.blue[500])
      .attr("opacity", 0)
      .on("click", onClick),
  )
  .exit((exit) =>
    exit
      .transition()
      .duration((d) => d.duration)
      .attr("opacity", 0)
      .remove(),
  )
  .merged((merged) =>
    merged
      .on("click", onClick)
      .transition()
      .duration((d) => d.duration)
      .attr("d", (d) => d.d)
      .attr("opacity", 1),
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
  .merged(myCircles);

const gridRow = group("grid").merged(gridCell);
