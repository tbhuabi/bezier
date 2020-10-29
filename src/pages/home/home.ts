import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { BezierAnchor, Bezier } from '../../lib/public-api';

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

  private prevPoint: BezierAnchor;

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

  drawBezier(point: BezierAnchor) {
    const context = this.lineCanvasContext;
    const bgContext = this.bgCanvasContext;
    if (!this.prevPoint) {
      context.beginPath();
      context.moveTo(point.x * 400, point.y * 400);
    } else {
      context.lineTo(point.x * 400, point.y * 400);
    }
    this.prevPoint = point;
    context.strokeStyle = '#00f';
    context.stroke();

    bgContext.beginPath();
    bgContext.fillStyle = '#00f';
    bgContext.arc(point.x * 400, point.y * 400, 6, 0, Math.PI * 2);
    bgContext.closePath();
    bgContext.fill();
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

  drawLine(start: BezierAnchor, end: BezierAnchor) {
    const context = this.bgCanvasContext;
    // this.drawPoint(start);

    context.strokeStyle = '#f90';
    context.beginPath();
    context.moveTo(start.x * 400, start.y * 400);
    context.lineTo(end.x * 400, end.y * 400);
    context.closePath();
    context.stroke();
  }

  drawPoint(point: BezierAnchor) {
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
    const p = this.bezier.update(n / 100, anchors => {
      for (let i = 1; i < anchors.length; i++) {
        const prev = anchors[i - 1];
        const current = anchors[i];
        this.drawLine(prev, current);
        this.drawPoint(prev)
        this.drawPoint(current)
      }
    });
    this.drawBezier(p);
  }
}
