export interface BezierAnchor {
  x: number;
  y: number;
}

export class Bezier {
  private anchors: BezierAnchor[] = [];

  constructor(args: number[]) {
    if (args.length < 4) {
      throw new Error('[Bezier]: the parameters should not be less than 4.');
    }
    if (args.length % 2 !== 0) {
      throw new Error('[Bezier]: the parameter should be an even number.');
    }

    let point: BezierAnchor = {
      x: null,
      y: null
    };
    for (let i = 0; i < args.length; i++) {
      if (i % 2) {
        point.y = args[i];
        this.anchors.push(point);
        point = {
          x: null,
          y: null
        };
      } else {
        point.x = args[i];
      }
    }
  }

  /**
   * 获取某一进度下，贝塞尔曲线的位置
   * @param {number} t 当前进度
   * @param {function} fn 贝塞尔曲线每一轮收敛求值时的回调，参数为产生坐标点的集合
   * @returns {{x: number, y: number}} 当前进度下的结果
   */
  update(t: number, fn?: (anchors: BezierAnchor[]) => void): BezierAnchor {
    let points = this.anchors;
    while (points.length > 1) {
      if (typeof fn === 'function') {
        fn(points);
      }
      points = Bezier.next(points, t);
    }
    return points[0];
  }

  private static next(points: Array<BezierAnchor>, t: number): BezierAnchor[] {

    const nextPoints: Array<BezierAnchor> = [];

    for (let i = 0; i < points.length - 1; i++) {
      const startPoint = points[i];
      const endPoint = points[i + 1];
      nextPoints.push({
        x: (endPoint.x - startPoint.x) * t + startPoint.x,
        y: (endPoint.y - startPoint.y) * t + startPoint.y
      });
    }
    return nextPoints;
  }
}
