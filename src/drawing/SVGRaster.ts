import { PathBuilder } from "./PathBuilder";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";

export class SVGRaster {
  public width: number;
  public height: number;
  public data: Uint8Array;

  static fromMiniature(miniature: string): SVGRaster {
    const lines = miniature.trim().split(/\r?\n/);

    if (lines.length === 0 || lines[0] === "") {
      return new SVGRaster(0, 0, new Uint8Array(0));
    }

    const parsedLines = lines.map((line) => Array.from(line.trim()));

    const height = parsedLines.length;
    const width = parsedLines[0].length;
    const data = new Uint8Array(width * height);

    for (let y = 0; y < height; y++) {
      const chars = parsedLines[y];

      for (let x = 0; x < width; x++) {
        const char = chars[x];

        if (char === SVGRasterPixel.ON || char === "1" || char === "#" || char === "X") {
          data[y * width + x] = 1;
        } else {
          data[y * width + x] = 0;
        }
      }
    }

    return new SVGRaster(width, height, data);
  }

  constructor(width: number, height: number, data?: Uint8Array) {
    this.width = width;
    this.height = height;
    this.data = data?.slice() ?? new Uint8Array(width * height);
  }

  public getPixel(x: number, y: number): number {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
    return this.data[y * this.width + x];
  }

  public concatHorizontal(other: SVGRaster): SVGRaster {
    const newWidth = this.width + other.width;
    const newHeight = Math.max(this.height, other.height);
    const result = new SVGRaster(newWidth, newHeight);

    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        const index = y * newWidth + x;
        if (x < this.width) {
          result.data[index] = this.getPixel(x, y);
        } else {
          result.data[index] = other.getPixel(x - this.width, y);
        }
      }
    }
    return result;
  }

  public concatVertical(other: SVGRaster): SVGRaster {
    const newWidth = Math.max(this.width, other.width);
    const newHeight = this.height + other.height;
    const result = new SVGRaster(newWidth, newHeight);

    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        const index = y * newWidth + x;
        if (y < this.height) {
          result.data[index] = this.getPixel(x, y);
        } else {
          result.data[index] = other.getPixel(x, y - this.height);
        }
      }
    }
    return result;
  }

  public overlay(
    other: SVGRaster,
    offsetX: number = 0,
    offsetY: number = 0,
    blend: SVGRasterBlend = SVGRasterBlend.OR,
  ): SVGRaster {
    const result = new SVGRaster(this.width, this.height, this.data);

    for (let y = 0; y < other.height; y++) {
      for (let x = 0; x < other.width; x++) {
        const targetX = x + offsetX;
        const targetY = y + offsetY;

        if (targetX < 0 || targetX >= this.width || targetY < 0 || targetY >= this.height) {
          continue;
        }

        const index = targetY * this.width + targetX;
        const currentPixel = result.data[index];
        const newPixel = other.getPixel(x, y);

        if (blend === SVGRasterBlend.OR) {
          result.data[index] = currentPixel | newPixel;
        } else if (blend === SVGRasterBlend.AND) {
          result.data[index] = currentPixel & newPixel;
        } else if (blend === SVGRasterBlend.XOR) {
          result.data[index] = currentPixel ^ newPixel;
        }
      }
    }
    return result;
  }

  public toPolygons(): Point[][] {
    const graph = new SVGRasterPixelGraph(this.width);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.getPixel(x, y) === 1) {
          if (this.getPixel(x, y - 1) === 0) graph.addEdge(x, y, x + 1, y);
          if (this.getPixel(x + 1, y) === 0) graph.addEdge(x + 1, y, x + 1, y + 1);
          if (this.getPixel(x, y + 1) === 0) graph.addEdge(x + 1, y + 1, x, y + 1);
          if (this.getPixel(x - 1, y) === 0) graph.addEdge(x, y + 1, x, y);
        }
      }
    }

    const loops: Point[][] = [];

    while (graph.activeKeys.length > 0) {
      const startIdx = graph.activeKeys.pop()!;

      if (!graph.edges.has(startIdx)) {
        continue;
      }

      const loop: Point[] = [];
      let currentIdx = startIdx;

      while (graph.edges.has(currentIdx)) {
        const outEdges = graph.edges.get(currentIdx)!;
        const nextIdx = outEdges.pop()!;

        if (outEdges.length === 0) {
          graph.edges.delete(currentIdx);
        }

        loop.push(graph.points.get(currentIdx)!);
        currentIdx = nextIdx;

        if (currentIdx === startIdx) {
          break;
        }
      }

      if (loop.length > 0) {
        loops.push(this.optimizePolygon(loop));
      }
    }

    return loops;
  }

  private optimizePolygon(loop: Point[]): Point[] {
    if (loop.length < 3) return loop;
    const optimized: Point[] = [];

    for (let i = 0; i < loop.length; i++) {
      const prev = loop[(i - 1 + loop.length) % loop.length];
      const curr = loop[i];
      const next = loop[(i + 1) % loop.length];

      if (!Point.isCollinear(prev, curr, next)) {
        optimized.push(curr);
      }
    }
    return optimized;
  }

  public toPath(gridSize: number = 24, rounding = 0) {
    const pixelSize = gridSize / Math.max(this.width, this.height);
    const path = new PathBuilder();

    for (const poly of this.toPolygons()) {
      if (rounding === 0) {
        path.addPath(poly.map((p) => new Point(p.x * pixelSize, p.y * pixelSize)));
      } else {
        path.addRoundedPath(
          poly.map((p) => new Point(p.x * pixelSize, p.y * pixelSize)),
          rounding,
        );
      }
    }

    return path.d;
  }

  public toPathTest(gridSize: number = 24) {
    const path = new PathBuilder();

    const pixelSize = gridSize / Math.max(this.width, this.height);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.getPixel(x, y)) {
          path
            .addRectangle(new Rectangle(x * pixelSize, y * pixelSize, pixelSize, pixelSize))
            .close();
        }
      }
    }

    return path.d;
  }

  public toMiniature(): string {
    let result = "";

    for (let y = 0; y < this.height; y++) {
      result += "\n";

      for (let x = 0; x < this.width; x++) {
        result += this.getPixel(x, y) ? SVGRasterPixel.ON : SVGRasterPixel.OFF;
      }
    }

    return result;
  }
}

export enum SVGRasterBlend {
  OR,
  AND,
  XOR,
}

export enum SVGRasterPixel {
  OFF = "⬜",
  ON = "⬛",
}

class SVGRasterPixelGraph {
  private readonly vertexStride: number;

  edges = new Map<number, number[]>();
  points = new Map<number, Point>();
  activeKeys: number[] = [];

  constructor(width: number) {
    this.vertexStride = width + 1;
  }

  private getIndex(x: number, y: number): number {
    return y * this.vertexStride + x;
  }

  public addEdge(sx: number, sy: number, ex: number, ey: number): void {
    const startIdx = this.getIndex(sx, sy);
    const endIdx = this.getIndex(ex, ey);

    if (!this.points.has(startIdx)) this.points.set(startIdx, new Point(sx, sy));
    if (!this.points.has(endIdx)) this.points.set(endIdx, new Point(ex, ey));

    let outEdges = this.edges.get(startIdx);
    if (!outEdges) {
      outEdges = [];
      this.edges.set(startIdx, outEdges);
      this.activeKeys.push(startIdx);
    }
    outEdges.push(endIdx);
  }
}
