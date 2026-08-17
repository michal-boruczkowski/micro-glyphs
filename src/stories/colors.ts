import { TAILWIND_PRESET_COLORS, TailwindGradients } from "../utils/colors";

export const COLOR_CONTROL = {
  control: {
    type: "color",
    presetColors: TAILWIND_PRESET_COLORS,
  },
} as const;

export const GRADIENT_CONTROL = {
  options: Object.keys(TailwindGradients),
  mapping: TailwindGradients,
  control: {
    type: "select",
  },
} as const;
