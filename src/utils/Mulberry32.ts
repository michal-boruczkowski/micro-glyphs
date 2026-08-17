export class Mulberry32 {
  t: number;

  constructor(seed: number) {
    this.t = seed >>> 0; // force seed into uint32
  }

  next() {
    this.t = (this.t + 0x6d2b79f5) >>> 0; // advance internal state (uint32 wrap)

    // Mix bits using xor-shifts and 32-bit multiplication.
    let x = Math.imul(this.t ^ (this.t >>> 15), this.t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);

    // Convert uint32 to float in [0, 1).
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  }

  getRandomInt(min: number, max: number): number {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);

    const minInt = Math.min(minCeil, maxFloor);
    const maxInt = Math.max(minCeil, maxFloor);

    return Math.floor(this.next() * (maxInt - minInt + 1)) + minInt;
  }
}
