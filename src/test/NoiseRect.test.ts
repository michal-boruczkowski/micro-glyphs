import { describe, expect, it } from "vitest";
import { NoiseRect } from "../drawing/NoiseRect";

describe("NoiseRect", () => {
  it("initializes constant values clamped to [0, 1]", () => {
    const rect1 = new NoiseRect(3, 2, [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
    const rect2 = new NoiseRect(2, 2, [-1.5, -1.5, -1.5, -1.5]);
    const rect3 = new NoiseRect(2, 2, [2.0, 2.0, 2.0, 2.0]);

    expect({
      "rect1 (0.5)": rect1.values,
      "rect2 (-1.5 clamped to 0)": rect2.values,
      "rect3 (2.0 clamped to 1)": rect3.values,
    }).toMatchSnapshot();
  });

  it("initializes from function clamping values to [0, 1]", () => {
    const noise = NoiseRect.fromNoiseFunction(3, 3, (x, y) => (x + y - 2) / 2);

    expect({
      "function noise values": noise.values,
    }).toMatchSnapshot();

    for (let y = 0; y < noise.height; y++) {
      for (let x = 0; x < noise.width; x++) {
        const val = noise.get(x, y);
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(1);
      }
    }
  });

  it("initializes from 2D array clamping out of bound values", () => {
    const rawData = [
      [-0.5, 0.2],
      [0.8, 1.5],
    ];
    const noise = NoiseRect.fromArray(rawData);

    expect({
      "fromArray noise values": noise.values,
    }).toMatchSnapshot();
  });

  it("supports get, set, map and clone", () => {
    const original = new NoiseRect(2, 2, [0.2, 0.2, 0.2, 0.2]);
    original.set(0, 0, 0.9);
    original.set(1, 1, 3.0); // clamped to 1

    const cloned = original.clone();
    const mapped = original.map((val) => val * 0.5);

    expect({
      "original values": original.values,
      "cloned values": cloned.values,
      "mapped values": mapped.values,
      "out of bounds get(-1, 0)": original.get(-1, 0),
      "out of bounds get(5, 5)": original.get(5, 5),
    }).toMatchSnapshot();
  });

  it("generates Perlin noise grid with all values in [0, 1]", () => {
    const width = 5;
    const height = 5;
    const perlinRect = NoiseRect.fromPerlin(width, height, 0.2, 42);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const val = perlinRect.get(x, y);
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(1);
      }
    }

    expect({
      "5x5 Perlin noise grid": perlinRect.values,
    }).toMatchSnapshot();
  });
});
