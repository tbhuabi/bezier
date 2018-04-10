import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Bezier, BezierPoint } from '../../lib/index';

@Component({
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('canvas1')
    bgCanvas: ElementRef;

    @ViewChild('canvas2')
    lineCanvas: ElementRef;

    bezier: Bezier;
    progress: number = 0;

    private bgCanvasContext: CanvasRenderingContext2D;
    private lineCanvasContext: CanvasRenderingContext2D;

    ngOnInit() {
        const arr: Array<number> = [.35, .66, .04, 1];

        this.bezier = new Bezier(arr);

        const bgCanvas = this.bgCanvas.nativeElement;
        const lineCanvas = this.lineCanvas.nativeElement;

        bgCanvas.width = bgCanvas.height = 900;
        lineCanvas.width = lineCanvas.height = 900;

        this.bgCanvasContext = bgCanvas.getContext('2d');
        this.lineCanvasContext = lineCanvas.getContext('2d');
        this.bgCanvasContext.translate(450, 450);
        this.lineCanvasContext.translate(450, 450);
        this.drawBg();

        this.drawBezier();
        this.drawLine();
    }

    drawBezier() {
        const context = this.lineCanvasContext;
        const bgContext = this.bgCanvasContext;
        this.bezier.onUpdatePoint(point => {
            context.beginPath();
            context.arc(point.x * 400, point.y * 400, 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();

            bgContext.beginPath();
            bgContext.fillStyle = '#00f';
            bgContext.arc(point.x * 400, point.y * 400, 6, 0, Math.PI * 2);
            bgContext.closePath();
            bgContext.fill();
        });
    }

    drawBg() {
        const context = this.bgCanvasContext;
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

    drawLine() {
        const context = this.bgCanvasContext;

        this.bezier.onUpdateLine(((startPoint, endPoint) => {
            this.drawPoint(startPoint);

            this.drawPoint(endPoint);
            context.strokeStyle = '#f00';
            context.beginPath();
            context.moveTo(startPoint.x * 400, startPoint.y * 400);
            context.lineTo(endPoint.x * 400, endPoint.y * 400);
            context.closePath();
            context.stroke();
        }));

    }

    drawPoint(point: BezierPoint) {
        const context = this.bgCanvasContext;
        context.beginPath();
        context.arc(point.x * 400, point.y * 400, 2, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }

    change(n: number) {
        this.bgCanvasContext.clearRect(-500, -500, 1000, 1000);
        this.drawBg();
        this.bezier.update(n / 100);
    }
}
