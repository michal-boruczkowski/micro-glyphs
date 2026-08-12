import { linearGradient, stop } from "./d3wrapper";

const gradientStops = stop()
  .data((d) => d.stops)
  .enter((enter) => enter.attr("offset", (d) => d.offset).attr("stop-color", (d) => d.stopColor));

export const rainbowGradientRenderer = linearGradient()
  .data((d) => (d.rainbowGradient ? [d.rainbowGradient] : []))
  .enter((enter) =>
    enter
      .attr("id", (d) => d.id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%"),
  )
  .merged(gradientStops);

export function getRainbowGradient(id: string | number, stopColors: string[]) {
  const rainbowGradientId = `rainbow-gradient-${id}`;

  return {
    id: rainbowGradientId,
    url: `url(#${rainbowGradientId})`,
    stops: stopColors.map((stopColor, index) => {
      const offsetPercent = stopColors.length > 1 ? (index / (stopColors.length - 1)) * 100 : 0;

      return {
        offset: `${Math.round(offsetPercent)}%`,
        stopColor,
      };
    }),
  };
}
