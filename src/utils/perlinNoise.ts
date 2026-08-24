import { Mulberry32 } from "./Mulberry32";
import { clamp } from "./clamp";
import { NoiseFunction } from "../drawing/NoiseRect";

export function createPerlin2D(scale: number = 0.1, seed: number = 1337): NoiseFunction {
  const rng = new Mulberry32(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    p[i] = i;
  }

  for (let i = 255; i > 0; i--) {
    const j = rng.getRandomInt(0, i);
    const temp = p[i];
    p[i] = p[j];
    p[j] = temp;
  }

  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  return (x: number, y: number): number => {
    const px = x * scale;
    const py = y * scale;

    const X = Math.floor(px) & 255;
    const Y = Math.floor(py) & 255;

    const xf = px - Math.floor(px);
    const yf = py - Math.floor(py);

    const u = fade(xf);
    const v = fade(yf);

    const A = perm[X] + Y;
    const B = perm[X + 1] + Y;

    const g00 = grad(perm[A], xf, yf);
    const g10 = grad(perm[B], xf - 1, yf);
    const g01 = grad(perm[A + 1], xf, yf - 1);
    const g11 = grad(perm[B + 1], xf - 1, yf - 1);

    const rawNoise = lerp(v, lerp(u, g00, g10), lerp(u, g01, g11));

    return clamp((rawNoise + 1) / 2, 0, 1);
  };
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  switch (hash & 7) {
    case 0:
      return x + y;
    case 1:
      return -x + y;
    case 2:
      return x - y;
    case 3:
      return -x - y;
    case 4:
      return x;
    case 5:
      return -x;
    case 6:
      return y;
    case 7:
      return -y;
    default:
      return 0;
  }
}
