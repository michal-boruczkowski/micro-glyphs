import { describe, expect, it } from "vitest";
import { SVGRaster, SVGRasterBlend } from "../drawing/SVGRaster";
import { BIRD_3x3, L_3x3, SQUARE_3x3 } from "../drawing/svgRasters_3x3";

describe("SVGRaster", () => {
  describe("fromMiniature & toMiniature", () => {
    it("parses various string representations into miniature rasters", () => {
      expect({
        "emoji (⬛/⬜) representation": SVGRaster.fromMiniature(`
⬛⬜⬛
⬜⬛⬜
⬛⬜⬛
`).toMiniature(),
        "binary (1/0) representation": SVGRaster.fromMiniature("10\n01").toMiniature(),
        "hash/dot (#/.) representation": SVGRaster.fromMiniature("#.\n.#").toMiniature(),
        "X/space representation": SVGRaster.fromMiniature("X \n X").toMiniature(),
        "empty miniature string": SVGRaster.fromMiniature("").toMiniature(),
      }).toMatchSnapshot();
    });

    it("sets correct dimensions on empty input", () => {
      const raster = SVGRaster.fromMiniature("");
      expect(raster.width).toBe(0);
      expect(raster.height).toBe(0);
    });
  });

  describe("getPixel", () => {
    it("fetches pixel values inside and outside bounds", () => {
      const raster = SVGRaster.fromMiniature("⬛⬜\n⬜⬛");
      expect({
        "(0, 0) inside ON": raster.getPixel(0, 0),
        "(1, 0) inside OFF": raster.getPixel(1, 0),
        "(-1, 0) out of bounds": raster.getPixel(-1, 0),
        "(5, 5) out of bounds": raster.getPixel(5, 5),
      }).toMatchSnapshot();
    });
  });

  describe("rotate", () => {
    it("rotates asymmetric rasters", () => {
      expect({
        "L_3x3 original": L_3x3.toMiniature(),
        "L_3x3 90deg": L_3x3.rotate(90).toMiniature(),
        "L_3x3 180deg": L_3x3.rotate(180).toMiniature(),
        "L_3x3 270deg": L_3x3.rotate(270).toMiniature(),
        "L_3x3 -90deg": L_3x3.rotate(-90).toMiniature(),
        "BIRD_3x3 0deg identity": BIRD_3x3.rotate(0).toMiniature(),
      }).toMatchSnapshot();
    });

    it("throws error for non-90 degree multiples", () => {
      expect(() => BIRD_3x3.rotate(45)).toThrowError(
        "Rotation angle must be a multiple of 90 degrees, got 45",
      );
    });
  });

  describe("addPadding", () => {
    it("adds padding with default y=x and asymmetric x, y", () => {
      const dot = SVGRaster.fromMiniature("⬛");
      expect({
        "dot original": dot.toMiniature(),
        "dot addPadding(1)": dot.getPadded(1).toMiniature(),
        "dot addPadding(2, 1)": dot.getPadded(2, 1).toMiniature(),
        "dot addPadding(1, 0)": dot.getPadded(1, 0).toMiniature(),
        "dot addPadding(0, 1)": dot.getPadded(0, 1).toMiniature(),
        "L_3x3 addPadding(1)": L_3x3.getPadded(1).toMiniature(),
      }).toMatchSnapshot();
    });

    it("correctly sets new dimensions", () => {
      const raster = SVGRaster.fromMiniature("⬛⬛\n⬛⬛");
      const padded = raster.getPadded(2, 3);
      expect(padded.width).toBe(2 + 2 * 2);
      expect(padded.height).toBe(2 + 2 * 3);
    });
  });

  describe("concatHorizontal & concatVertical", () => {
    it("concatenates rasters horizontally and vertically", () => {
      const left = SVGRaster.fromMiniature("⬛⬜");
      const right = SVGRaster.fromMiniature("⬜⬛");
      const top = SVGRaster.fromMiniature("⬛⬛");
      const bottom = SVGRaster.fromMiniature("⬜⬜");

      expect({
        "concatHorizontal (2x1 + 2x1)": left.concatHorizontal(right).toMiniature(),
        "concatVertical (2x1 + 2x1)": top.concatVertical(bottom).toMiniature(),
      }).toMatchSnapshot();
    });
  });

  describe("overlay", () => {
    it("overlays rasters with blend modes and offsets", () => {
      const base = SVGRaster.fromMiniature(`
⬛⬛⬜
⬛⬛⬜
⬜⬜⬜
`);
      const overlay = SVGRaster.fromMiniature(`
⬜⬛⬛
⬜⬛⬛
⬜⬜⬜
`);
      expect({
        "OR blend mode": base.overlay(overlay, 0, 0, SVGRasterBlend.OR).toMiniature(),
        "AND blend mode": base.overlay(overlay, 0, 0, SVGRasterBlend.AND).toMiniature(),
        "XOR blend mode": base.overlay(overlay, 0, 0, SVGRasterBlend.XOR).toMiniature(),
        "OR blend mode with (1,1) offset": base
          .overlay(overlay, 1, 1, SVGRasterBlend.OR)
          .toMiniature(),
      }).toMatchSnapshot();
    });
  });

  describe("toPolygons", () => {
    it("extracts polygons for solid and hollow rasters", () => {
      expect({
        "BIRD_3x3 polygons": BIRD_3x3.toPolygons(),
        "SQUARE_3x3 hollow polygons": SQUARE_3x3.toPolygons(),
      }).toMatchSnapshot();
    });
  });

  describe("toPath & toPathTest", () => {
    it("generates SVG path strings", () => {
      expect({
        "BIRD_3x3 path no rounding": BIRD_3x3.toPath(24, 0),
        "BIRD_3x3 path with rounding (r=2)": BIRD_3x3.toPath(24, 2),
        "BIRD_3x3 grid rectangle path (toPathTest)": BIRD_3x3.toPathTest(24),
      }).toMatchSnapshot();
    });
  });

  describe("hash", () => {
    it("calculates unique hash based on dimensions and pixel data", () => {
      expect({
        "empty raster": SVGRaster.fromMiniature("").hash,
        L_3x3: L_3x3.hash,
        "L_3x3 90deg": L_3x3.rotate(90).hash,
        BIRD_3x3: BIRD_3x3.hash,
        SQUARE_3x3: SQUARE_3x3.hash,
      }).toMatchSnapshot();
    });

    it("produces identical hash for identical rasters and different for different", () => {
      const raster1 = SVGRaster.fromMiniature("10\n01");
      const raster2 = SVGRaster.fromMiniature("10\n01");
      const raster3 = SVGRaster.fromMiniature("01\n10");
      expect(raster1.hash).toBe(raster2.hash);
      expect(raster1.hash).not.toBe(raster3.hash);
    });
  });
});
