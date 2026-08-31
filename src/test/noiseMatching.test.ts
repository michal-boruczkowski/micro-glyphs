import { describe, expect, it } from "vitest";
import { NoiseRect } from "../drawing/NoiseRect";
import {
  findBestMatchingSymbol,
  MatchableWithNoise,
  matchNoiseGrid,
} from "../utils/noiseMatching";

type MockSymbol = MatchableWithNoise & {
  name: string;
  expectedPattern: number[][];
};

function createMockSymbol(name: string, expectedPattern: number[][]): MockSymbol {
  const target = NoiseRect.fromArray(expectedPattern);
  return {
    name,
    expectedPattern,
    compareWithNoise(noise: NoiseRect): number {
      let diff = 0;
      for (let y = 0; y < noise.height; y++) {
        for (let x = 0; x < noise.width; x++) {
          diff += Math.abs(noise.get(x, y) - target.get(x, y));
        }
      }
      return -diff;
    },
  };
}

describe("matchNoiseGrid", () => {
  it("computes matching grid from NoiseRect directly", () => {
    const symbolDark = createMockSymbol("dark", [
      [0, 0],
      [0, 0],
    ]);
    const symbolLight = createMockSymbol("light", [
      [1, 1],
      [1, 1],
    ]);

    const dictionary = [symbolDark, symbolLight];

    // 4x4 noise rectangle with dark top-left, light bottom-right
    const noiseRect = NoiseRect.fromArray([
      [0.0, 0.1, 0.9, 1.0],
      [0.1, 0.0, 1.0, 0.9],
      [0.8, 0.9, 0.1, 0.0],
      [1.0, 0.8, 0.0, 0.1],
    ]);

    const match2x2 = matchNoiseGrid({
      noiseRect,
      dictionary,
      windowSize: 2,
      strideX: 2,
      strideY: 2,
    });

    const matchWithStride1 = matchNoiseGrid({
      noiseRect,
      dictionary,
      windowSize: 2,
      strideX: 1,
      strideY: 1,
    });

    const emptyDictionaryMatch = matchNoiseGrid({
      noiseRect,
      dictionary: [],
      windowSize: 2,
    });

    const smallNoiseRectMatch = matchNoiseGrid({
      noiseRect: new NoiseRect(1, 1, [0.5]),
      dictionary,
      windowSize: 2,
    });

    expect({
      "2x2 window stride 2": {
        columns: match2x2.columns,
        rows: match2x2.rows,
        symbols: match2x2.symbols.map((s) => s?.name ?? null),
        grid: match2x2.grid.map((row) => row.map((s) => s?.name ?? null)),
        cellIndices: match2x2.cells.map((c) => ({
          colIndex: c.colIndex,
          rowIndex: c.rowIndex,
          index: c.index,
          symbol: c.symbol?.name ?? null,
          windowValues: c.noiseWindow.values,
        })),
      },
      "2x2 window stride 1": {
        columns: matchWithStride1.columns,
        rows: matchWithStride1.rows,
        symbols: matchWithStride1.symbols.map((s) => s?.name ?? null),
        grid: matchWithStride1.grid.map((row) => row.map((s) => s?.name ?? null)),
      },
      "empty dictionary": {
        columns: emptyDictionaryMatch.columns,
        rows: emptyDictionaryMatch.rows,
        symbols: emptyDictionaryMatch.symbols,
      },
      "noise smaller than window size": {
        columns: smallNoiseRectMatch.columns,
        rows: smallNoiseRectMatch.rows,
        symbols: smallNoiseRectMatch.symbols,
        grid: smallNoiseRectMatch.grid,
      },
    }).toMatchSnapshot();
  });

  it("findBestMatchingSymbol returns null for empty dictionary", () => {
    const window = new NoiseRect(2, 2, [0, 0, 0, 0]);
    expect(findBestMatchingSymbol(window, [])).toBeNull();
  });
});
