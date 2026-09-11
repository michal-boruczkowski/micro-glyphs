import chroma from "chroma-js";
import { clamp } from "./clamp";

export type GenerateThemeOptions = {
  hueSpread?: number; //0-180
  minLightness?: number;
  maxLightness?: number;
  minChroma?: number;
  maxChroma?: number;
  mirror?: boolean;
};

export function generateThemeForBackground(background: string, options?: GenerateThemeOptions) {
  const {
    hueSpread = 180,
    minLightness = 35,
    maxLightness = 65,
    minChroma = 30, // Niskie nasycenie dla jasnych teł (aby zapobiec "brudnym" kolorom)
    maxChroma = 90, // Wysokie nasycenie dla ciemnych teł (aby zachować żywość)
    mirror = false,
  } = options ?? {};

  const bg = chroma(background);

  const bgLch = bg.lch();
  const bgLightness = bgLch[0];
  const baseHue = isNaN(bgLch[2]) ? 0 : bgLch[2];

  const normalizedBgLightness = clamp(bgLightness / 100, 0, 1);

  const targetLightness = maxLightness - normalizedBgLightness * (maxLightness - minLightness);

  const targetChroma = maxChroma - normalizedBgLightness * (maxChroma - minChroma);

  const halfSpread = hueSpread / 2;
  const startHue = (baseHue - halfSpread + 360) % 360;
  const endHue = (baseHue + halfSpread) % 360;

  const gradientStart = chroma.lch(targetLightness, targetChroma, startHue).hex();
  const gradientEnd = chroma.lch(targetLightness, targetChroma, endHue).hex();

  return mirror ? [gradientStart, gradientEnd, gradientStart] : [gradientStart, gradientEnd];
}
