import { filter, feGaussianBlur, feMerge, feMergeNode } from "./d3wrapper";

export const glowFilterRenderer = filter()
  .data((d) => (d.glowFilter ? [d.glowFilter] : []))
  .enter((enter) =>
    enter
      .attr("id", (d) => d.id)
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%"),
  )
  .merged((merged) => {
    blurRenderer(merged);
    mergeRenderer(merged);
  });

const mergeNodeRenderer = feMergeNode()
  .data((d) => d.nodes)
  .enter((enter) => enter.attr("in", (d) => d.in));

const mergeRenderer = feMerge()
  .data((d) => (d.merge ? [d.merge] : []))
  .merged(mergeNodeRenderer);

const blurRenderer = feGaussianBlur()
  .data((d) => (d.blur ? [d.blur] : []))
  .enter((enter) =>
    enter.attr("stdDeviation", (d) => d.stdDeviation).attr("result", (d) => d.result),
  );

export function getGlowFilter(id: string | number) {
  return {
    id: `glow-filter-${id}`,
    blur: {
      stdDeviation: "4",
      result: "blur",
    },
    merge: {
      nodes: [{ in: "blur" }, { in: "SourceGraphic" }],
    },
  };
}
