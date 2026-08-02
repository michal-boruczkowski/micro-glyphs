import { Rectangle } from "./Rectangle";

export class PathBuilder {
    private commands: string[] = [];

    moveTo(x: number, y: number) {
        this.commands.push(`M ${x} ${y}`);

        return this
    }

    lineTo(x: number, y: number) {
        this.commands.push(`L ${x} ${y}`);

        return this
    }

    close() {
        this.commands.push(`Z`);

        return this;
    }

    addRectangle(rect: Rectangle) {
        this.moveTo(rect.minX, rect.minY);
        this.lineTo(rect.maxX, rect.minY);
        this.lineTo(rect.maxX, rect.maxY);
        this.lineTo(rect.minX, rect.maxY);

        return this
    }

    get d() {
        return this.commands.join(' ');
    }

}