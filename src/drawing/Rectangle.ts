import { Point } from "./Point";

export class Rectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;


    static fromCenterPoint(center: Point, width: number, height: number = width) {
        return new Rectangle(center.x - width / 2, center.y - height / 2, width, height);
    }

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get minX() { return this.x; }
    get minY() { return this.y; }
    get maxX() { return this.x + this.width; }
    get maxY() { return this.y + this.height; }

    get vertices() {
        return [
            new Point(this.x, this.y),
            new Point(this.x + this.width, this.y),
            new Point(this.x + this.width, this.y + this.height),
            new Point(this.x, this.y + this.height)
        ];
    }

    get center() {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    addPadding(padding: number) {
        this.x -= padding;
        this.y -= padding;
        this.width += padding * 2;
        this.height += padding * 2;

        return this
    }



}