export function clamp(value: number, min: number = 0, max: number = 1): number {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}

