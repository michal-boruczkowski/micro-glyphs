import { Point } from "./Point";
import { Rectangle } from "./Rectangle";

export class PathBuilder {
  private commands: string[] = [];

  moveTo(x: number, y: number) {
    this.commands.push(`M ${x} ${y}`);

    return this;
  }

  lineTo(x: number, y: number) {
    this.commands.push(`L ${x} ${y}`);

    return this;
  }

  arcTo(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: number,
    sweepFlag: number,
    x: number,
    y: number,
  ) {
    this.commands.push(`A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`);
    return this;
  }

  quadraticCurveTo(cx: number, cy: number, x: number, y: number) {
    this.commands.push(`Q ${cx} ${cy} ${x} ${y}`);
    return this;
  }

  addPath(points: Point[], isClosed: boolean = true) {
    if (points.length === 0) return this;

    this.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.lineTo(points[i].x, points[i].y);
    }

    if (isClosed) {
      this.close();
    }

    return this;
  }

  addRoundedPath(points: Point[], radius: number, isClosed: boolean = true) {
    if (points.length === 0) return this;

    if (points.length === 1) {
      this.moveTo(points[0].x, points[0].y);
      return this;
      ``;
    }

    if (points.length === 2) {
      this.moveTo(points[0].x, points[0].y);
      this.lineTo(points[1].x, points[1].y);
      return this;
    }

    const getPoint = (i: number) => {
      // Bezpieczne zapętlanie indeksu dla ścieżek zamkniętych
      return points[(i + points.length) % points.length];
    };

    if (!isClosed) {
      // Ścieżka otwarta zaczyna się w pierwszym punkcie
      this.moveTo(points[0].x, points[0].y);
    } else {
      // Ścieżka zamknięta zaczyna się w połowie pierwszego odcinka,
      // aby pętla mogła gładko zaokrąglić również pierwszy/ostatni róg
      const p0 = points[0];
      const p1 = points[1];
      this.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
    }

    // Ile rogów musimy sprawdzić? Dla otwartej omija pierwszy i ostatni punkt.
    const loopStart = 1;
    const loopEnd = isClosed ? points.length : points.length - 1;

    for (let i = loopStart; i <= loopEnd; i++) {
      const pPrev = getPoint(i - 1);
      const pCurr = getPoint(i);
      const pNext = getPoint(i + 1);

      // 1. Obliczanie długości ramion
      const len1 = pCurr.distance(pPrev);
      const len2 = pCurr.distance(pNext);

      // Zabezpieczenie przed za dużym promieniem
      const r = Math.min(radius, len1 / 2, len2 / 2);

      // 2. Pobieranie kątów
      const anglePrev = pCurr.angleTo(pPrev);
      const angleNext = pCurr.angleTo(pNext);

      // 3. Użycie Twojej funkcji do wyznaczenia punktów startu i końca zaokrąglenia!
      const arcStart = pCurr.getPointOnCircle(r, anglePrev);
      const arcEnd = pCurr.getPointOnCircle(r, angleNext);

      // Rysowanie do początku zaokrąglenia
      this.lineTo(arcStart.x, arcStart.y);

      // Krzywa Beziera zaokrąglająca róg
      this.quadraticCurveTo(pCurr.x, pCurr.y, arcEnd.x, arcEnd.y);
    }
    if (!isClosed) {
      // Kończymy linią prosto do ostatniego punktu
      const lastPoint = points[points.length - 1];
      this.lineTo(lastPoint.x, lastPoint.y);
    } else {
      // Zamykamy kształt z powrotem do punktu startowego (w połowie pierwszego odcinka)
      this.close();
    }

    return this;
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

    return this;
  }

  get d() {
    return this.commands.join(" ");
  }
}
