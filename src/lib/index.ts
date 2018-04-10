export interface BezierPoint {
    x: number;
    y: number;
}

export class Bezier {
    private points: Array<BezierPoint> = [];

    private onUpdatePointCallback: (point: BezierPoint) => any;
    private onUpdateLineCallback: (startPoint: BezierPoint, endPoint: BezierPoint) => any;

    constructor(args: Array<number>) {
        this.points.push({
            x: 0,
            y: 0
        });
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
        this.points.push({
            x: 1,
            y: 1
        });
    }

    update(step: number): number {
        return this.getProgress(step);
    }

    onUpdatePoint(fn: (point: BezierPoint) => any) {
        this.onUpdatePointCallback = fn;
    }

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