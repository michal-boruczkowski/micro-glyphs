import { SVGRaster } from "./SVGRaster";

export const CHECKERBOARD_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬜⬛⬜
  ⬛⬜⬛ 
`);

export const FULL_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬛⬛
  ⬛⬛⬛ 
`);

export const ALL_WHITE_3x3 = SVGRaster.fromMiniature(`
  ⬜⬜⬜
  ⬜⬜⬜
  ⬜⬜⬜ 
`);

export const DOT_3x3 = SVGRaster.fromMiniature(`
  ⬜⬜⬜
  ⬜⬛⬜
  ⬜⬜⬜
`);

export const SQUARE_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬜⬛
  ⬛⬛⬛ 
`);

export const CIRCLE_3x3 = SVGRaster.fromMiniature(`
  ⬜⬛⬜
  ⬛⬜⬛
  ⬜⬛⬜ 
`);

export const CROSS_3x3 = SVGRaster.fromMiniature(`
  ⬜⬛⬜
  ⬛⬛⬛
  ⬜⬛⬜ 
`);

export const BIRD_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬛⬜⬜
  ⬛⬛⬛
`);

export const BIRD_90_3x3 = BIRD_3x3.rotate(90);
export const BIRD_180_3x3 = BIRD_3x3.rotate(180);
export const BIRD_270_3x3 = BIRD_3x3.rotate(270);

export const U_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬛⬜⬛
  ⬛⬛⬛ 
`);

export const C_3x3 = U_3x3.rotate(90);
export const N_3x3 = U_3x3.rotate(180);
export const E_3x3 = U_3x3.rotate(270);

export const L_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬜
  ⬛⬜⬜
  ⬛⬛⬛
`);

export const L_90_3x3 = L_3x3.rotate(90);
export const L_180_3x3 = L_3x3.rotate(180);
export const L_270_3x3 = L_3x3.rotate(270);

export const H_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬛⬛⬛
  ⬛⬜⬛ 
`);

export const ALL_HEROES = [
  FULL_3x3,
  SQUARE_3x3,
  DOT_3x3,
  U_3x3,
  C_3x3,
  N_3x3,
  E_3x3,
  L_3x3,
  L_90_3x3,
  L_180_3x3,
  L_270_3x3,
  BIRD_3x3,
  BIRD_90_3x3,
  BIRD_180_3x3,
  BIRD_270_3x3,
  H_3x3,
  CROSS_3x3,
  CIRCLE_3x3,
];

export const NICE_FULL = [FULL_3x3, SQUARE_3x3, DOT_3x3, CROSS_3x3];

export const ALL_LETTERS = [N_3x3, U_3x3, C_3x3, L_3x3, H_3x3];

export const TOP_LEFT_CORNER = [BIRD_90_3x3, L_90_3x3];
export const TOP_RIGHT_CORNER = [BIRD_180_3x3, L_180_3x3];
export const BOTTOM_LEFT_CORNER = [BIRD_3x3, L_3x3];
export const BOTTOM_RIGHT_CORNER = [BIRD_270_3x3, L_270_3x3];

export function compose4(a: SVGRaster, b: SVGRaster, c: SVGRaster, d: SVGRaster) {
  return new SVGRaster(9, 9).overlay(a, 1, 1).overlay(b, 5, 1).overlay(c, 1, 5).overlay(d, 5, 5);
}
