import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { BezierPoint, Bezier } from '../../lib/index';

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

  private prevPoint: BezierPoint;

  ngOnInit() {
    this.bezier = new Bezier([
        -.9, -.7,
        -.8, .4,
        .1, -.6,
        .2, -1,
        .5, .6,
        .5, 1.3,
        0, .9,
        1, 1]);

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

  run() {
    this.lineCanvasContext.closePath();
    this.prevPoint = null;
    this.progress = 0;
    const fn = () => {
      if (this.progress < 100) {
        this.progress += 1;
        this.change(this.progress);
        requestAnimationFrame(fn);
      }
    };
    this.change(this.progress);
    fn();
  }

  drawBezier() {
    const context = this.lineCanvasContext;
    const bgContext = this.bgCanvasContext;

    this.bezier.onUpdatePoint(point => {
      if (!this.prevPoint) {
        context.beginPath();
        context.moveTo(point.x * 400, point.y * 400);
      } else {
        context.lineTo(point.x * 400, point.y * 400);
      }
      this.prevPoint = point;
      // context.arc(point.x * 400, point.y * 400, 1, 0, Math.PI * 2);
      // context.closePath();
      context.strokeStyle = '#00f';
      context.stroke();

      bgContext.beginPath();
      bgContext.fillStyle = '#00f';
      bgContext.arc(point.x * 400, point.y * 400, 6, 0, Math.PI * 2);
      bgContext.closePath();
      bgContext.fill();
    });
  }

  drawBg() {
    const context = this.bgCanvasContext;
    for (let i = 0; i < 21; i++) {
      context.strokeStyle = '#eee';
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
      context.strokeStyle = '#f90';
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
    const context = this.bgCanvasContext;
    context.clearRect(-500, -500, 1000, 1000);

    context.strokeStyle = '#666';
    context.beginPath();
    context.moveTo(n * 4, 400);
    context.lineTo(n * 4, -400);
    context.closePath();
    context.stroke();

    this.drawBg();
    this.bezier.update(n / 100);
  }
}
