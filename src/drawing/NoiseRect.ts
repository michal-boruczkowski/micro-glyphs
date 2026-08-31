import { createPerlin2D } from "../utils/perlinNoise";
import { clamp } from "../utils/clamp";

export type NoiseFunction = (x: number, y: number) => number;

export class NoiseRect {
  public readonly width: number;
  public readonly height: number;
  private readonly data: number[];

  constructor(width: number, height: number, data?: number[]) {
    this.width = Math.max(0, Math.floor(width));
    this.height = Math.max(0, Math.floor(height));

    const size = this.width * this.height;
    this.data = new Array(size);

    if (data) {
      for (let i = 0; i < size; i++) {
        const val = data[i];
        this.data[i] = val !== undefined ? clamp(val, 0, 1) : 0;
      }
    } else {
      this.data.fill(0);
    }
  }

  public get(x: number, y: number): number {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return 0;
    }
    return this.data[y * this.width + x];
  }

  public set(x: number, y: number, value: number): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.data[y * this.width + x] = clamp(value, 0, 1);
    }
  }

  public get values(): number[][] {
    const result: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(this.get(x, y));
      }
      result.push(row);
    }
    return result;
  }

  public map(mapFunction: (val: number, x: number, y: number) => number): NoiseRect {
    const result = new NoiseRect(this.width, this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = y * this.width + x;
        result.data[index] = clamp(mapFunction(this.get(x, y), x, y), 0, 1);
      }
    }
    return result;
  }

  public clone(): NoiseRect {
    return new NoiseRect(this.width, this.height, [...this.data]);
  }

  public getSubRect(x: number, y: number, width: number, height: number): NoiseRect {
    const w = Math.max(0, Math.floor(width));
    const h = Math.max(0, Math.floor(height));
    const data = new Array(w * h);

    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        data[dy * w + dx] = this.get(x + dx, y + dy);
      }
    }

    return new NoiseRect(w, h, data);
  }

  public static fromNoiseFunction(
    width: number,
    height: number,
    noiseFn: NoiseFunction,
    scale: number = 1,
    offsetX: number = 0,
    offsetY: number = 0,
  ): NoiseRect {
    const w = Math.max(0, Math.floor(width));
    const h = Math.max(0, Math.floor(height));
    const data = new Array(w * h);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const val = noiseFn((x + offsetX) * scale, (y + offsetY) * scale);
        data[y * w + x] = clamp(val, 0, 1);
      }
    }

    return new NoiseRect(w, h, data);
  }

  public static fromPerlin(
    width: number,
    height: number,
    scale: number = 0.1,
    seed: number = 1337,
  ): NoiseRect {
    const perlinFn = createPerlin2D(scale, seed);
    return NoiseRect.fromNoiseFunction(width, height, perlinFn);
  }

  public static fromArray(values: number[][]): NoiseRect {
    const height = values.length;
    const width = height > 0 ? values[0].length : 0;
    const data: number[] = [];

    for (let y = 0; y < height; y++) {
      const row = values[y];
      for (let x = 0; x < width; x++) {
        data.push(row ? (row[x] ?? 0) : 0);
      }
    }

    return new NoiseRect(width, height, data);
  }
}
