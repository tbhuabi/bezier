export interface BezierPoint {
    x: number;
    y: number;
}

export class Bezier {
    private points: Array<BezierPoint> = [];

    private onUpdatePointCallback: (point: BezierPoint) => any;
    private onUpdateLineCallback: (startPoint: BezierPoint, endPoint: BezierPoint) => any;

    /**
     * 构造函数
     * @param {Array<number>} args 贝塞尔曲线锚点的集合
     * @param {boolean} autoComplete 是否自动添加 0,0 起点和 1,1 终点，默认为 true
     */

    constructor(args: Array<number>, autoComplete: boolean = true) {
        if (autoComplete) {
            this.points.push({
                x: 0,
                y: 0
            });
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
        if (args.length % 2 !== 0) {
            point.y = 1;
        }
        if (autoComplete) {
            this.points.push({
                x: 1,
                y: 1
            });
        }
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

    private getProgress(step: number): number {
        const point = this.getPointByPoints(this.points, step);
        if (this.onUpdatePointCallback) {
            this.onUpdatePointCallback(point);
        }
        return point.y;
    }

    private getPointByPoints(points: Array<BezierPoint>, step: number): BezierPoint {
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
                x: (endPoint.x - startPoint.x) * step + startPoint.x,
                y: (endPoint.y - startPoint.y) * step + startPoint.y
            });
        }
        return this.getPointByPoints(arr, step);
    }
}