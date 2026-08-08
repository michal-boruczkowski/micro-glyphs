import { useEffect, useId, useMemo, useRef, useState } from "react";
import { toScenarioHeight, toScenarioPadding } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { SVGRoot } from "../components/SVGRoot";
import { SVGRectangle } from "../components/SVGRectangle";
import { SVGRaster } from "../drawing/SVGRaster";
import { select } from "d3";
import { circle, group } from "../d3wrapper/d3wrapper";
import { TAILWIND_COLORS } from "../utils/colors";

type StorybookD3ScenarioProps = {
  svgRasters: SVGRaster[];
  howManyColumns?: number;
  width?: number;
  limit?: number;
};

export function StorybookD3Scenario(props: StorybookD3ScenarioProps) {
  const { svgRasters, howManyColumns = 16, width = 700 } = props;

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const viewBoxRect = useMemo(() => new Rectangle(0, 0, width, toScenarioHeight(width)), [width]);

  const canvas = useMemo(() => {
    const padding = toScenarioPadding(width);

    return viewBoxRect.getPadded(-padding);
  }, []);

  const howManyRows = Math.ceil(svgRasters.length / howManyColumns);

  const d3Ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!d3Ref.current) return;

    const { x, y, width, height } = canvas;

    const d3Group = select(d3Ref.current)
      .data(() => [svgRasters])
      .attr("transform", `translate(${x}, ${y})`);

    d3Group.call(mainGroup);
  }, [svgRasters]);

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

const myCircles = circle<string, SVGRaster[]>("my-circle")
  .data((parentData) => parentData.map((_, i) => String(i)))
  .enter((enter) =>
    enter
      .attr("cx", (d, i) => 20 * i)
      .attr("cy", 10)
      .attr("r", 0)
      .attr("fill", TAILWIND_COLORS.blue[500]),
  )
  .exit((exit) => exit.transition().duration(750).attr("r", 0).remove())
  .merged((merged) =>
    merged
      .transition()
      .duration(750)
      .attr("r", 100)
      .attr("cy", (d, i) => 20 * i),
  );

const mainGroup = group("raster-group")
  .data((parentData) => [parentData])
  .enter((enter) => enter.attr("class", "raster-group"))
  .merged(myCircles);
