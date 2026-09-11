import chroma from "chroma-js";
import { clamp } from "./clamp";

export type GenerateThemeOptions = {
  hueSpread?: number; //0-180
  minLightness?: number;
  maxLightness?: number;
  mirror?: boolean;
};

export function generateThemeForBackground(background: string, options?: GenerateThemeOptions) {
  const { hueSpread = 180, minLightness = 35, maxLightness = 65, mirror = false } = options ?? {};
  const bg = chroma(background);

  // Extract LCH parameters from background (Lightness, Chroma, Hue)
  const bgLch = bg.lch();
  const bgLightness = bgLch[0];
  const baseHue = bgLch[2] || 0; // Guard against NaN (e.g. for grays)

  // 2. Automatically adjust gradient lightness
  // Smooth transition from dark background (higher targetLightness) to light background (lower targetLightness)
  const normalizedBgLightness = clamp(bgLightness / 100, 0, 1);
  const targetLightness = maxLightness - normalizedBgLightness * (maxLightness - minLightness);
  const targetChroma = 90; // High saturation for vividness 0-180

  // 3. Generate gradient with high color contrast (complementary / split-complementary hue shift)
  const halfSpread = hueSpread / 2;
  const startHue = (baseHue - halfSpread + 360) % 360;
  const endHue = (baseHue + halfSpread) % 360;

  const gradientStart = chroma.lch(targetLightness, targetChroma, startHue).hex();
  const gradientEnd = chroma.lch(targetLightness, targetChroma, endHue).hex();

  return mirror ? [gradientStart, gradientEnd, gradientStart] : [gradientStart, gradientEnd];
}
