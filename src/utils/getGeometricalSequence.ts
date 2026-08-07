export function getGeometricalSequence(totalSize: number, count: number, ratio = 1.05): number[] {
  if (count <= 0 || totalSize <= 0) {
    return [];
  }

  if (count === 1) {
    return [totalSize];
  }

  const r = 1 / ratio;
  const firstRowSize = totalSize * ((1 - r) / (1 - Math.pow(r, count)));

  const sizes: number[] = [];
  let currentSize = firstRowSize;
  let accumulatedSize = 0;

  for (let i = 0; i < count - 1; i++) {
    sizes.push(currentSize);
    accumulatedSize += currentSize;
    currentSize /= ratio;
  }

  sizes.push(totalSize - accumulatedSize);

  return sizes;
}
