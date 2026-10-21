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

  addRoundedPathQuadratic(points: Point[], radius: number, isClosed: boolean = true) {
    return this.addRoundedPath(points, radius, PathRoundingMethod.QUADRATIC, isClosed);
  }

  addRoundedPathArc(points: Point[], radius: number, isClosed: boolean = true) {
    return this.addRoundedPath(points, radius, PathRoundingMethod.ARC, isClosed);
  }

  addRoundedPath(
    points: Point[],
    radius: number,
    method: PathRoundingMethod = PathRoundingMethod.ARC,
    isClosed: boolean = true,
  ) {
    if (points.length === 0) return this;

    if (points.length === 1) {
      this.moveTo(points[0].x, points[0].y);
      return this;
    }

    if (points.length === 2) {
      this.moveTo(points[0].x, points[0].y);
      this.lineTo(points[1].x, points[1].y);
      return this;
    }

    const getPoint = (i: number) => {
      // Safe index wrapping for closed paths
      return points[(i + points.length) % points.length];
    };

    if (!isClosed) {
      // Open path starts at the first point
      this.moveTo(points[0].x, points[0].y);
    } else {
      // Closed path starts at the midpoint of the first segment,
      // so the loop can smoothly round the first/last corner as well
      const p0 = points[0];
      const p1 = points[1];
      this.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
    }

    // How many corners do we need to process? For open paths, skip the first and last point.
    const loopStart = 1;
    const loopEnd = isClosed ? points.length : points.length - 1;

    for (let i = loopStart; i <= loopEnd; i++) {
      const pPrev = getPoint(i - 1);
      const pCurr = getPoint(i);
      const pNext = getPoint(i + 1);

      // 1. Calculate arm lengths
      const len1 = pCurr.distance(pPrev);
      const len2 = pCurr.distance(pNext);

      // Clamp radius to avoid exceeding arm lengths
      const r = Math.min(radius, len1 / 2, len2 / 2);

      if (r <= 0) {
        this.lineTo(pCurr.x, pCurr.y);
        continue;
      }

      // 2. Get angles
      const anglePrev = pCurr.angleTo(pPrev);
      const angleNext = pCurr.angleTo(pNext);

      // 3. Compute arc start and end points for the rounding
      const arcStart = pCurr.getPointOnCircle(r, anglePrev);
      const arcEnd = pCurr.getPointOnCircle(r, angleNext);

      // Draw line to the arc start
      this.lineTo(arcStart.x, arcStart.y);

      if (method === PathRoundingMethod.ARC) {
        const dx1 = pCurr.x - pPrev.x;
        const dy1 = pCurr.y - pPrev.y;
        const dx2 = pNext.x - pCurr.x;
        const dy2 = pNext.y - pCurr.y;
        const cross = dx1 * dy2 - dy1 * dx2;

        if (cross === 0) {
          this.lineTo(arcEnd.x, arcEnd.y);
        } else {
          const sweepFlag = cross > 0 ? 1 : 0;
          this.arcTo(r, r, 0, 0, sweepFlag, arcEnd.x, arcEnd.y);
        }
      } else {
        // Quadratic Bézier curve rounding the corner
        this.quadraticCurveTo(pCurr.x, pCurr.y, arcEnd.x, arcEnd.y);
      }
    }
    if (!isClosed) {
      // Finish with a straight line to the last point
      const lastPoint = points[points.length - 1];
      this.lineTo(lastPoint.x, lastPoint.y);
    } else {
      // Close the shape back to the start point (midpoint of the first segment)
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

export enum PathRoundingMethod {
  ARC = "ARC",
  QUADRATIC = "QUADRATIC",
}
