function error(message: string) {
    return new Error('[Bezier]: ' + message);
}

interface Point {
    x: number;
    y: number;
}

export class Bezier {
    private points: Array<Point> = [];

    private canvas: any = document.getElementById('canvas1');
    private context: CanvasRenderingContext2D;

    private canvas2: any = document.getElementById('canvas2');
    private context2: CanvasRenderingContext2D;

    constructor(args: Array<number>) {
        if (args.length % 2 !== 0) {
            throw error('贝塞尔曲线只能传入偶数个参数');
        }
        this.points.push({
            x: 0,
            y: 0
        });
        let point: Point = {
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
        this.points.push({
            x: 1,
            y: 1
        });

        this.context = this.canvas.getContext('2d');
        this.canvas.width = 900;
        this.canvas.height = 900;

        this.context.translate(450, 450);
        this.drawBg();

        this.context2 = this.canvas2.getContext('2d');
        this.canvas2.width = 900;
        this.canvas2.height = 900;
        this.context2.translate(450, 450);
        this.drawBg2();
    }

    drawBg2() {
        const context = this.context2;
        for (let i = 0; i < 20; i++) {
            context.strokeStyle = '#ccc';
            context.beginPath();
            context.moveTo(i * 40 - 400, -400);
            context.lineTo(i * 40 - 400, 400);
            context.closePath();
            context.stroke();

            context.beginPath();
            context.moveTo(-400, i * 40 - 400);
            context.lineTo(400, i * 40 - 400);
            context.closePath();
            context.stroke();
        }

        context.strokeStyle = '#000';
        context.beginPath();
        context.moveTo(0, -400);
        context.lineTo(0, 400);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(-400, 0);
        context.lineTo(400, 0);
        context.closePath();
        context.stroke();
    }

    drawBg() {

        const context = this.context;
        for (let i = 0; i < 20; i++) {
            context.strokeStyle = '#ccc';
            context.beginPath();
            context.moveTo(i * 40 - 400, -400);
            context.lineTo(i * 40 - 400, 400);
            context.closePath();
            context.stroke();

            context.beginPath();
            context.moveTo(-400, i * 40 - 400);
            context.lineTo(400, i * 40 - 400);
            context.closePath();
            context.stroke();
        }

        context.strokeStyle = '#000';
        context.beginPath();
        context.moveTo(0, -400);
        context.lineTo(0, 400);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(-400, 0);
        context.lineTo(400, 0);
        context.closePath();
        context.stroke();
    }

    update(step: number): number {
        let n = step;
        if (n < 0) {
            return 0;
        } else if (n > 1) {
            return 1;
        }
        this.context.clearRect(-500, -500, 1000, 1000);
        // this.context.fill();
        this.drawBg();
        return this.getProgress(n);
    }

    private getProgress(step: number): number {
        const point = this.getPointByPoints(this.points, step);
        const context = this.context2;

        context.beginPath();
        context.arc(point.x * 400, point.y * 400, 2, 0, Math.PI * 2);
        context.closePath();
        context.fill();

        return point.y;
    }

    private getPointByPoints(points: Array<Point>, step: number): Point {
        if (points.length === 1) {
            return points[0];
        }
        let arr: Array<Point> = [];

        for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];

            this.drawLine(startPoint, endPoint);

            arr.push({
                x: (endPoint.x - startPoint.x) * step + startPoint.x,
                y: (endPoint.y - startPoint.y) * step + startPoint.y
            });
        }
        return this.getPointByPoints(arr, step);
    }

    private drawLine(startPoint: Point, endPoint: Point) {
        this.drawPoint(startPoint);
        this.drawPoint(endPoint);

        const context = this.context;
        context.strokeStyle = '#f00';
        context.beginPath();
        context.moveTo(startPoint.x * 400, startPoint.y * 400);
        context.lineTo(endPoint.x * 400, endPoint.y * 400);
        context.closePath();
        context.stroke();
    }

    private drawPoint(point: Point) {
        const context = this.context;
        context.beginPath();
        context.arc(point.x * 400, point.y * 400, 2, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}