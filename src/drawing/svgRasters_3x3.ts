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


export const BIRD_LEFT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬜⬜
  ⬛⬜⬛ 
`);

export const BIRD_RIGHT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬜⬜⬛
  ⬛⬜⬛
`);

export const N_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬜⬛
  ⬛⬜⬛ 
`);

export const U_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬛⬜⬛
  ⬛⬛⬛ 
`);

export const C_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬜⬜
  ⬛⬛⬛ 
`);

export const L_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬜
  ⬛⬜⬜
  ⬛⬛⬛
`);

export const NICE_SET = [FULL_3x3, SQUARE_3x3, DOT_3x3, N_3x3, U_3x3, C_3x3, L_3x3, CROSS_3x3, CIRCLE_3x3]