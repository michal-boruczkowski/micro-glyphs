import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getScenarioColumns, toScenarioHeight, toScenarioPadding } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRoot } from "../components/SVGRoot";
import { SVGRectangle } from "../components/SVGRectangle";
import { SVGRaster } from "../drawing/SVGRaster";
import { select } from "d3";
import { circle, group, onClick } from "../d3wrapper/d3wrapper";
import { TAILWIND_COLORS } from "../utils/colors";
import { getGrid } from "../utils/getGrid";

type StorybookD3ScenarioProps = {
  svgRasters: SVGRaster[];
  width?: number;
  pageLimit?: number;
};

export function StorybookD3Scenario(props: StorybookD3ScenarioProps) {
  const { svgRasters, width = 700, pageLimit } = props;

  const [count, setCount] = useState(1);

  const data =
    count > pageLimit ? svgRasters.slice(count - pageLimit, count) : svgRasters.slice(0, count);

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

      const tuple = data[index];

      if (!tuple) {
        continue;
      }

      cells.push({
        x,
        y,
        width,
        height,
        r: Math.min(width, height) / 2,
        cx: width / 2,
        cy: height / 2,
        onClick: () => {
          if (selected.has(index)) {
            selected.delete(index);
          } else {
            selected.add(index);
          }
          setSelected(new Set(selected));

          setCount((prev) => prev + 1);
        },
      });
    }

    const d3Group = select(d3Ref.current).data([cells]).attr("transform", `translate(${x}, ${y})`);

    d3Group.call(gridRow);
  }, [data]);

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

const myCircles = circle("my-circle")
  .enter((enter) =>
    enter
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", 0)
      .attr("fill", TAILWIND_COLORS.blue[500])
      .on("click", onClick),
  )
  .exit((exit) => exit.transition().duration(750).attr("r", 0).remove())
  .merged((merged) =>
    merged
      .on("click", onClick)
      .transition()
      .duration(750)
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.r),
  );

const gridCell = group("grid-cell")
  .data((d) => d)
  .enter((selection) => selection.attr("transform", (d) => `translate(${d.x},${d.y})`))
  .update((selection) =>
    selection
      .transition()
      .duration(750)
      .attr("transform", (d) => `translate(${d.x},${d.y})`),
  )
  .merged(myCircles);

const gridRow = group("grid").merged(gridCell);
