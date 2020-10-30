import { BezierAnchor, CubicBezier } from '@tanbo/bezier';

describe('CubicBezier', () => {
  test('确保贝塞尔曲线锚点共线', () => {
    const bezier = new CubicBezier(
      0, 0,
      1, 1
    );
    expect(bezier.update(0)).toEqual({x: 0, y: 0})
    expect(bezier.update(0.5)).toEqual({x: 0.5, y: 0.5})
    expect(bezier.update(1)).toEqual({x: 1, y: 1})
  })

  test('确保 CubicBezier 的 x 点在 0 ~ 1 的区间内', () => {
    const bezier = new CubicBezier(
      -1, 0,
      2, 1
    );
    expect((bezier as any as { anchors: BezierAnchor[] }).anchors).toEqual([
      {x: 0, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 1, y: 1},
    ])
  })
  test('确保贝塞尔曲线计算结果符合预期', () => {
    const bezier = new CubicBezier(
      0.36, 0.66,
      0.04, 1,
    );
    expect((() => {
      const r = bezier.update(0.25);
      return {
        x: +r.x.toFixed(3),
        y: +r.y.toFixed(3)
      }
    })()).toEqual({
      x: 0.250,
      y: 0.691
    })
    expect((() => {
      const r = bezier.update(0.5);
      return {
        x: +r.x.toFixed(3),
        y: +r.y.toFixed(3)
      }
    })()).toEqual({
      x: 0.5,
      y: 0.94
    })
    expect((() => {
      const r = bezier.update(0.75);
      return {
        x: +r.x.toFixed(3),
        y: +r.y.toFixed(3)
      }
    })()).toEqual({
      x: 0.75,
      y: 0.99
    })
  })
})
