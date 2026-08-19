import { PHI } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";

export type NoiseFunction = (x: number, y: number) => number;

export type SizeFunction = (noiseValue: number) => number;

export function getPerlinDivision(
  canvas: Rectangle,
  columns: number,
  rows: number,
  noiseFn: NoiseFunction,
  sizeFn: SizeFunction = (noiseValue) => Math.ceil(noiseValue * PHI * PHI),
  noiseScale: number = 1,
): Rectangle[] {
  const squares: Rectangle[] = [];

  const squareWidth = canvas.width / columns;
  const squareHeight = canvas.height / rows;

  const occupied: boolean[][] = Array.from({ length: columns }, () => Array(rows).fill(false));

  const canFit = (startX: number, startY: number, size: number): boolean => {
    if (startX + size > columns || startY + size > rows) return false;

    for (let x = startX; x < startX + size; x++) {
      for (let y = startY; y < startY + size; y++) {
        if (occupied[x][y]) return false;
      }
    }
    return true;
  };

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (occupied[x][y]) continue;

      const noiseValue = noiseFn(x * noiseScale, y * noiseScale);

      let targetSize = sizeFn(noiseValue);

      // 3. Sprawdzamy, czy "wymarzony" kwadrat się zmieści.
      // Jeśli nie, zmniejszamy go o 1 i próbujemy ponownie, aż do skutku.
      while (targetSize > 1 && !canFit(x, y, targetSize)) {
        targetSize--;
      }

      // 4. Oznaczamy zajęte pola na naszej matrycy `occupied`
      for (let i = x; i < x + targetSize; i++) {
        for (let j = y; j < y + targetSize; j++) {
          occupied[i][j] = true;
        }
      }

      // 5. Zapisujemy wynikowy kwadrat
      squares.push(
        new Rectangle(
          canvas.x + x * squareWidth,
          canvas.y + y * squareHeight,
          targetSize * squareWidth,
          targetSize * squareHeight,
        ),
      );
    }
  }

  return squares;
}
