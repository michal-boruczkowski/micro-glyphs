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


export const BIRD_TOP_LEFT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬜⬜
  ⬛⬜⬛ 
`);

export const BIRD_TOP_RIGHT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬜⬜⬛
  ⬛⬜⬛
`);

export const BIRD_BOTTOM_RIGHT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬜⬜⬛
  ⬛⬛⬛
`);

export const BIRD_BOTTOM_LEFT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬜⬛
  ⬛⬜⬜
  ⬛⬛⬛
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

export const L_BOTTOM_RIGHT_3x3 = SVGRaster.fromMiniature(`
  ⬜⬜⬛
  ⬜⬜⬛
  ⬛⬛⬛
`);

export const L_TOP_RIGHT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬜⬜⬛
  ⬜⬜⬛
`);

export const L_TOP_LEFT_3x3 = SVGRaster.fromMiniature(`
  ⬛⬛⬛
  ⬛⬜⬜
  ⬛⬜⬜
`);


export const ALL_HEROES = [FULL_3x3, SQUARE_3x3, DOT_3x3, N_3x3, U_3x3, C_3x3, L_3x3, CROSS_3x3, CIRCLE_3x3]

export const NICE_FULL = [FULL_3x3, SQUARE_3x3, DOT_3x3, CROSS_3x3]

export const ALL_LETTERS = [N_3x3, U_3x3, C_3x3, L_3x3]

export const TOP_LEFT_CORNER = [BIRD_TOP_LEFT_3x3, L_TOP_LEFT_3x3]
export const TOP_RIGHT_CORNER = [BIRD_TOP_RIGHT_3x3, L_TOP_RIGHT_3x3]
export const BOTTOM_LEFT_CORNER = [BIRD_BOTTOM_LEFT_3x3, L_3x3]
export const BOTTOM_RIGHT_CORNER = [BIRD_BOTTOM_RIGHT_3x3, L_BOTTOM_RIGHT_3x3]