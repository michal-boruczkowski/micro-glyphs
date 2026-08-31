import { NoiseRect } from "../drawing/NoiseRect";

export type MatchableWithNoise = {
  compareWithNoise: (noise: NoiseRect) => number;
};

export type NoiseMatchingOptions<T extends MatchableWithNoise> = {
  noiseRect: NoiseRect;
  dictionary: T[];
  windowSize?: number;
  strideX?: number;
  strideY?: number;
  findMatch?: (window: NoiseRect, dictionary: T[]) => T | null;
};

export type MatchedGridCell<T extends MatchableWithNoise> = {
  colIndex: number;
  rowIndex: number;
  index: number;
  noiseWindow: NoiseRect;
  symbol: T | null;
};

export type NoiseMatchingResult<T extends MatchableWithNoise> = {
  columns: number;
  rows: number;
  grid: (T | null)[][];
  cells: MatchedGridCell<T>[];
  symbols: (T | null)[];
};

export function matchNoiseGrid<T extends MatchableWithNoise>(
  options: NoiseMatchingOptions<T>,
): NoiseMatchingResult<T> {
  const {
    noiseRect,
    dictionary,
    windowSize = 2,
    strideX = windowSize,
    strideY = windowSize,
    findMatch = findBestMatchingSymbol,
  } = options;

  const columns =
    noiseRect.width >= windowSize
      ? Math.floor((noiseRect.width - windowSize) / strideX) + 1
      : 0;
  const rows =
    noiseRect.height >= windowSize
      ? Math.floor((noiseRect.height - windowSize) / strideY) + 1
      : 0;

  const grid: (T | null)[][] = [];
  const cells: MatchedGridCell<T>[] = [];
  const symbols: (T | null)[] = [];

  let index = 0;
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: (T | null)[] = [];

    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const windowX = colIndex * strideX;
      const windowY = rowIndex * strideY;

      const noiseWindow = noiseRect.getSubRect(windowX, windowY, windowSize, windowSize);
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
