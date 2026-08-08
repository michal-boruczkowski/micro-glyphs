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

export function getRainbowGradient(id: string | number, colors: string[]) {
  return {
    id: `rainbow-gradient-${id}`,
    stops: colors.map((color, index) => {
      const offsetPercent = colors.length > 1 ? (index / (colors.length - 1)) * 100 : 0;

      return {
        offset: `${Math.round(offsetPercent)}%`,
        stopColor: color,
      };
    }),
  };
}
