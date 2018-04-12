import { BezierPoint, BaseBezier } from './help';

export class CubicBezier implements BaseBezier {
    private points: Array<BezierPoint> = [];

    private onUpdatePointCallback: (point: BezierPoint) => any;
    private onUpdateLineCallback: (startPoint: BezierPoint, endPoint: BezierPoint) => any;

    static guard0To1(n: number): number {
        if (n < 0) {
            return 0;
        } else if (n > 1) {
            return 1;
        }
        return n;
    }

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.points.push({
            x: 0,
            y: 0
        });

        this.points.push({
            x: CubicBezier.guard0To1(x1),
            y: y1
        });
        this.points.push({
            x: CubicBezier.guard0To1(x2),
            y: y2
        });
        this.points.push({
            x: 1,
            y: 1
        });
    }

    /**
     * 获取某一进度下，贝塞尔曲线的位置
     * @param {number} step 当前进度
     * @returns {number} 当前进度下的结果
     */

    update(step: number): number {
        return this.getProgress(step);
    }

    /**
     * 注册贝塞尔曲线更新坐标信息时的回调
     * @param {(point: BezierPoint) => any} fn 回调函数，参数为贝塞尔曲线当前坐标
     */
    onUpdatePoint(fn: (point: BezierPoint) => any) {
        this.onUpdatePointCallback = fn;
    }

    /**
     * 注册贝塞尔曲线更新切线信息时的回调
     * @param {(startPoint: BezierPoint, endPoint: BezierPoint) => any} fn 回调函数，参数为起始点，结束点
     */
    onUpdateLine(fn: (startPoint: BezierPoint, endPoint: BezierPoint) => any) {
        this.onUpdateLineCallback = fn;
    }

    private getProgress(t: number): number {
        // 二分法求解，根据当前的 t，求在曲线中的 y 点
        const fn = (s: number, min: number, max: number): number => {
            let point = this.getPointByPoints(this.points, s, false);
            const xDistance = point.x - t;
            if (Math.abs(xDistance) < 0.000001) {
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
            return fn(next, min, max);
        };

        const s = fn(t, 0, 1);
        const point = this.getPointByPoints(this.points, s, true);
        if (this.onUpdatePointCallback) {
            this.onUpdatePointCallback(point);
        }

        return point.y;
    }

    private getPointByPoints(points: Array<BezierPoint>, t: number, isInvokeCallback: boolean): BezierPoint {
        if (points.length === 1) {
            return points[0];
        }

        const arr: Array<BezierPoint> = [];

        for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];
            if (this.onUpdateLineCallback && isInvokeCallback) {
                this.onUpdateLineCallback(startPoint, endPoint);
            }
            arr.push({
                x: (endPoint.x - startPoint.x) * t + startPoint.x,
                y: (endPoint.y - startPoint.y) * t + startPoint.y
            });
        }
        return this.getPointByPoints(arr, t, isInvokeCallback);
    }

}