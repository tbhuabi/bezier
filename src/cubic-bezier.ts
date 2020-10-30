import { Bezier, BezierAnchor } from './bezier';

export class CubicBezier extends Bezier {
  precision = 0.000001;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    super([
      0, 0,
      CubicBezier.guard0To1(x1), y1,
      CubicBezier.guard0To1(x2), y2,
      1, 1
    ]);
  }

  update(t: number, fn?: (anchors: BezierAnchor[]) => void): BezierAnchor {
    const offset = this.newton(t);
    return super.update(offset, fn);
  }

  private newton(s: number) {
    const t = s;
    let min = 0;
    let max = 1;
    // 牛顿法求解，根据当前的 t，求在曲线中的 y 点

    while (true) {
      let point = super.update(s);
      let xDistance = point.x - t;

      if (Math.abs(xDistance) < this.precision) {
        return s;
      }

      let next: number;
      if (xDistance < 0) {
        next = (s + max) / 2;
        min = s;
      } else {
        next = s / 2;
        max = s;
      }
      s = next;
    }
  }

  private static guard0To1(n: number): number {
    if (n < 0) {
      return 0;
    } else if (n > 1) {
      return 1;
    }
    return n;
  }
}
