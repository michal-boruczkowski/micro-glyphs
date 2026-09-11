import chroma from "chroma-js";

export function generateThemeForBackground(background: string) {
  const bg = chroma(background);

  // Extract LCH parameters from background (Lightness, Chroma, Hue)
  const bgLch = bg.lch();
  const bgLightness = bgLch[0];
  const baseHue = bgLch[2] || 0; // Guard against NaN (e.g. for grays)

  // 2. Automatically adjust gradient lightness
  // If background is dark, gradient must be light (and vice versa)
  const isDarkBg = bgLightness < 50;
  const targetLightness = isDarkBg ? 75 : 25;
  const targetChroma = 65; // High saturation for vividness

  // 3. Generate gradient (hue shift on color wheel by -30 and +45 degrees)
  const startHue = (baseHue - 30 + 360) % 360;
  const endHue = (baseHue + 45) % 360;

  const gradientStart = chroma.lch(targetLightness, targetChroma, startHue).hex();
  const gradientEnd = chroma.lch(targetLightness, targetChroma, endHue).hex();

  return [gradientStart, gradientEnd];
}
