import { generateBinaryCombinations } from "../utils/generateBinaryCombinations";

import {
  BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER,
  NICE_FULL,
  ALL_HEROES,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
  ALL_LETTERS,
} from "../drawing/svgRasters_3x3";

import { getCartesianProduct } from "../utils/getCartesianProduct";
import { SVGRaster } from "./SVGRaster";

export function compose4(a: SVGRaster, b: SVGRaster, c: SVGRaster, d: SVGRaster) {
  return new SVGRaster(9, 9).overlay(a, 1, 1).overlay(b, 5, 1).overlay(c, 1, 5).overlay(d, 5, 5);
}

export const niceFull = getCartesianProduct({
  a: NICE_FULL,
  b: NICE_FULL,
  c: NICE_FULL,
  d: NICE_FULL,
}).map((combination) => {
  const { a, b, c, d } = combination;

  return compose4(a, b, c, d);
});

export const letters = getCartesianProduct({
  a: ALL_LETTERS,
  b: ALL_LETTERS,
  c: ALL_LETTERS,
  d: ALL_LETTERS,
}).map((combination) => {
  const { a, b, c, d } = combination;

  return compose4(a, b, c, d);
});

export const niceSides = getCartesianProduct({
  a: TOP_LEFT_CORNER.concat(BOTTOM_RIGHT_CORNER),
  b: TOP_RIGHT_CORNER.concat(BOTTOM_LEFT_CORNER),
  c: BOTTOM_LEFT_CORNER.concat(TOP_RIGHT_CORNER),
  d: BOTTOM_RIGHT_CORNER.concat(TOP_LEFT_CORNER),
}).map((combination) => {
  const { a, b, c, d } = combination;

  return compose4(a, b, c, d);
});

export const niceHeroes = ALL_HEROES.concat(TOP_LEFT_CORNER)
  .concat(TOP_RIGHT_CORNER)
  .concat(BOTTOM_LEFT_CORNER)
  .concat(BOTTOM_RIGHT_CORNER)
  .map((combination) => combination.getPadded(1));

export const binary9 = generateBinaryCombinations(9).map((combination) =>
  new SVGRaster(3, 3, combination).getPadded(1),
);

const svgRasters = {
  binary9,
  niceFull,
  letters,
  niceSides,
  niceHeroes,
};

export const SVG_RASTERS_CONTROL = {
  options: Object.keys(svgRasters),
  mapping: svgRasters,
  control: {
    type: "select",
  },
} as const;
