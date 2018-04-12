import { BezierPoint, BaseBezier } from './help';

export class Bezier implements BaseBezier {
    private points: Array<BezierPoint> = [];
    private onUpdatePointCallback: (point: BezierPoint) => any;
    private onUpdateLineCallback: (startPoint: BezierPoint, endPoint: BezierPoint) => any;

    /**
     * 构造函数
     * @param {number} args 贝塞尔曲线锚点：x1, y1, x2, y2, x3, y3, ...
     */

    constructor(...args: Array<number>) {
        if (args.length < 4) {
            throw new Error('[Bezier]: the parameters should not be less than 4.');
        }
        if (args.length % 2 !== 0) {
            throw new Error('[Bezier]: the parameter should be an even number.');
        }

        let point: BezierPoint = {
            x: null,
            y: null
        };
        for (let i = 0; i < args.length; i++) {
            if (i % 2) {
                point.y = args[i];
                this.points.push(point);
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
     * @returns {number} 当前进度下的结果
     */

    update(t: number): number {
        return this.getProgress(t);
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
        const point = this.getPointByPoints(this.points, t);
        if (this.onUpdatePointCallback) {
            this.onUpdatePointCallback(point);
        }
        return point.y;
    }

    private getPointByPoints(points: Array<BezierPoint>, t: number): BezierPoint {
        if (points.length === 1) {
            return points[0];
        }

        const arr: Array<BezierPoint> = [];

        for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];
            if (this.onUpdateLineCallback) {
                this.onUpdateLineCallback(startPoint, endPoint);
            }
            arr.push({
                x: (endPoint.x - startPoint.x) * t + startPoint.x,
                y: (endPoint.y - startPoint.y) * t + startPoint.y
            });
        }
        return this.getPointByPoints(arr, t);
    }
}
