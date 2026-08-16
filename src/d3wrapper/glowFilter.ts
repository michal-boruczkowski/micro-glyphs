import { filter, feGaussianBlur, feMerge, feMergeNode } from "./d3wrapper";

export const glowFilterRenderer = filter()
  .data((d) => (d.glowFilter ? [d.glowFilter] : []))
  .merged((selection) =>
    selection
      .attr("id", (d) => d.id)
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%")
      .call(blurRenderer)
      .call(mergeRenderer),
  );

const mergeNodeRenderer = feMergeNode()
  .data((d) => d.nodes)
  .merged((selection) => selection.attr("in", (d) => d.in));

const mergeRenderer = feMerge()
  .data((d) => (d.merge ? [d.merge] : []))
  .merged(mergeNodeRenderer);

const blurRenderer = feGaussianBlur()
  .data((d) => (d.blur ? [d.blur] : []))
  .merged((selection) =>
    selection.attr("stdDeviation", (d) => d.stdDeviation).attr("result", (d) => d.result),
  );

export function getGlowFilter(id: string | number, size: number = 4) {
  return {
    id: `glow-filter-${id}`,
    blur: {
      stdDeviation: String(size),
      result: "blur",
    },
    merge: {
      nodes: [{ in: "blur" }, { in: "SourceGraphic" }],
    },
  };
}
