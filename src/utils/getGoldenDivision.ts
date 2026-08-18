import { PHI } from "../components/consts";
import { Rectangle } from "../drawing/Rectangle";
import { Mulberry32 } from "./Mulberry32";

export function getGoldenDivision(
  initialRect: Rectangle,
  howManyRectangles: number,
  ratio = PHI,
): Rectangle[] {
  if (howManyRectangles <= 0) return [];

  const randomGenerator = new Mulberry32(1000);

  const rectangles: Rectangle[] = [initialRect.clone()];

  while (rectangles.length < howManyRectangles) {
    const largestIdx = randomGenerator.getRandomInt(0, rectangles.length - 1);

    const largestRect = rectangles[largestIdx];
    const { x, y, width, height } = largestRect;

    const isHorizontal = width >= height;

    let rect1: Rectangle;
    let rect2: Rectangle;

    if (isHorizontal) {
      const w1 = width / ratio;
      const w2 = width - w1;

      rect1 = new Rectangle(x, y, w1, height);
      rect2 = new Rectangle(x + w1, y, w2, height);
    } else {
      const h1 = height / ratio;
      const h2 = height - h1;

      rect1 = new Rectangle(x, y, width, h1);
      rect2 = new Rectangle(x, y + h1, width, h2);
    }

    rectangles.splice(largestIdx, 1, rect1, rect2);
  }

  return rectangles;
}
