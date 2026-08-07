export class Point {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  getNegated(): Point {
    return new Point(-this.x, -this.y);
  }

  getAdded(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  getScaled(scale: number): Point {
    return new Point(this.x * scale, this.y * scale);
  }

  getTranslated(delta: Point): Point {
    return new Point(this.x + delta.x, this.y + delta.y);
  }

  distance(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  angleTo(other: Point): number {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }

  getPointOnCircle(radius: number, angle: number): Point {
    return new Point(this.x + radius * Math.cos(angle), this.y + radius * Math.sin(angle));
  }

  static isCollinear(a: Point, b: Point, c: Point): boolean {
    return (b.y - a.y) * (c.x - b.x) === (b.x - a.x) * (c.y - b.y);
  }
}
