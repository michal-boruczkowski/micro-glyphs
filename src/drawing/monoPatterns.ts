import { MonoPattern } from "./MonoPattern";

export const SWORD_ICON = MonoPattern.fromMiniature(`
  ⬜⬜⬜⬛
  ⬜⬜⬛⬜
  ⬜⬛⬜⬜
  ⬛⬜⬜⬜
`);

export const SWORD_2 = SWORD_ICON.concatHorizontal(SWORD_ICON).concatVertical(SWORD_ICON.concatHorizontal(SWORD_ICON))

