import { NoiseFunction, NoiseRect } from "../drawing/NoiseRect";
import { createPerlin2D } from "./perlinNoise";

export type MatchableWithNoise = {
  compareWithNoise: (noise: NoiseRect) => number;
};

export type PerlinMatchingOptions<T extends MatchableWithNoise> = {
  columns: number;
  rows: number;
  dictionary: T[];
  windowSize?: number;
  strideX?: number;
  strideY?: number;
  noiseRect?: NoiseRect;
  noiseFn?: NoiseFunction;
  scale?: number;
  seed?: number;
  findMatch?: (window: NoiseRect, dictionary: T[]) => T | null;
};

export type MatchedGridCell<T extends MatchableWithNoise> = {
  colIndex: number;
  rowIndex: number;
  index: number;
  noiseWindow: NoiseRect;
  symbol: T | null;
};

export type PerlinMatchingResult<T extends MatchableWithNoise> = {
  columns: number;
  rows: number;
  grid: (T | null)[][];
  cells: MatchedGridCell<T>[];
  symbols: (T | null)[];
};

export function matchPerlinGrid<T extends MatchableWithNoise>(
  options: PerlinMatchingOptions<T>,
): PerlinMatchingResult<T> {
  const {
    columns,
    rows,
    dictionary,
    windowSize = 2,
    strideX = windowSize,
    strideY = windowSize,
    noiseRect,
    noiseFn,
    scale = 0.1,
    seed = 1337,
    findMatch = findBestMatchingSymbol,
  } = options;

  const totalNoiseWidth = Math.max(0, columns * strideX + (windowSize - strideX));
  const totalNoiseHeight = Math.max(0, rows * strideY + (windowSize - strideY));

  const activeNoise =
    noiseRect ??
    (noiseFn
      ? NoiseRect.fromNoiseFunction(totalNoiseWidth, totalNoiseHeight, noiseFn)
      : NoiseRect.fromNoiseFunction(
          totalNoiseWidth,
          totalNoiseHeight,
          createPerlin2D(scale, seed),
        ));

  const grid: (T | null)[][] = [];
  const cells: MatchedGridCell<T>[] = [];
  const symbols: (T | null)[] = [];

  let index = 0;
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: (T | null)[] = [];

    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const windowX = colIndex * strideX;
      const windowY = rowIndex * strideY;

      const noiseWindow = activeNoise.getSubRect(windowX, windowY, windowSize, windowSize);
      const symbol = findMatch(noiseWindow, dictionary);

      row.push(symbol);
      symbols.push(symbol);
      cells.push({
        colIndex,
        rowIndex,
        index,
        noiseWindow,
        symbol,
      });

      index++;
    }

    grid.push(row);
  }

  return {
    columns,
    rows,
    grid,
    cells,
    symbols,
  };
}

export function findBestMatchingSymbol<T extends MatchableWithNoise>(
  noiseWindow: NoiseRect,
  dictionary: T[],
): T | null {
  if (dictionary.length === 0) {
    return null;
  }

  let bestSymbol: T = dictionary[0];
  let bestScore = -Infinity;

  for (let i = 0; i < dictionary.length; i++) {
    const candidate = dictionary[i];
    const score = candidate.compareWithNoise(noiseWindow);

    if (score > bestScore) {
      bestScore = score;
      bestSymbol = candidate;
    }
  }

  return bestSymbol;
}
