export class Point {
    x: number = 0;
    y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static isCollinear(a: Point, b: Point, c: Point): boolean {
        return (b.y - a.y) * (c.x - b.x) === (b.x - a.x) * (c.y - b.y);
    }


}