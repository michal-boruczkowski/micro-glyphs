import { PathBuilder } from "./PathBuilder";
import { Rectangle } from "./Rectangle";

export enum MonoPatternBlend {
    OR,
    AND,
    XOR
}

export enum MonoPatternPixel {
    OFF = '⬜',
    ON = '⬛'
}

export class MonoPattern {
    public width: number;
    public height: number;
    public data: Uint8Array;

    static fromMiniature(miniature: string): MonoPattern {
        const lines = miniature.trim().split(/\r?\n/);

        if (lines.length === 0 || lines[0] === '') {
            return new MonoPattern(0, 0, new Uint8Array(0))
        }

        const parsedLines = lines.map(line => Array.from(line.trim()));

        const height = parsedLines.length;
        const width = parsedLines[0].length;
        const data = new Uint8Array(width * height);

        for (let y = 0; y < height; y++) {
            const chars = parsedLines[y];

            for (let x = 0; x < width; x++) {
                const char = chars[x];

                if (char === MonoPatternPixel.ON || char === '1' || char === '#' || char === 'X') {
                    data[y * width + x] = 1;
                } else {
                    data[y * width + x] = 0;
                }
            }
        }

        return new MonoPattern(width, height, data);
    }

    constructor(width: number, height: number, data?: Uint8Array) {
        this.width = width;
        this.height = height;
        this.data = data ?? new Uint8Array(width * height)
    }

    public getPixel(x: number, y: number): number {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
        return this.data[y * this.width + x];
    }


    public concatHorizontal(other: MonoPattern): MonoPattern {
        const newWidth = this.width + other.width;
        const newHeight = Math.max(this.height, other.height);
        const result = new MonoPattern(newWidth, newHeight);

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

    public concatVertical(other: MonoPattern): MonoPattern {
        const newWidth = Math.max(this.width, other.width);
        const newHeight = this.height + other.height;
        const result = new MonoPattern(newWidth, newHeight);

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

    public overlay(other: MonoPattern, offsetX: number = 0, offsetY: number = 0, blend: MonoPatternBlend = MonoPatternBlend.OR): MonoPattern {
        const result = new MonoPattern(this.width, this.height, this.data);

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

                if (blend === MonoPatternBlend.OR) {
                    result.data[index] = currentPixel | newPixel;
                } else if (blend === MonoPatternBlend.AND) {
                    result.data[index] = currentPixel & newPixel;
                } else if (blend === MonoPatternBlend.XOR) {
                    result.data[index] = currentPixel ^ newPixel;
                }
            }
        }
        return result;
    }

    public toPath(gridSize: number = 24) {
        const path = new PathBuilder()

        const pixelSize = (gridSize / Math.max(this.width, this.height))

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.getPixel(x, y)) {
                    path.addRectangle(new Rectangle(x * pixelSize, y * pixelSize, pixelSize, pixelSize)).close()
                }
            }
        }

        return path.d;
    }


}