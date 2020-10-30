import { Bezier, BezierAnchor } from '@tanbo/bezier';

describe('Bezier', () => {
  test('确保贝塞尔曲线锚点共线', () => {
    const bezier = new Bezier([
      0, 0,
      1, 1
    ]);
    expect(bezier.update(0)).toEqual({x: 0, y: 0})
    expect(bezier.update(0.5)).toEqual({x: 0.5, y: 0.5})
    expect(bezier.update(1)).toEqual({x: 1, y: 1})
  })
  test('确保参数个数少于4个时能正常抛出异常', () => {
    const fn = jest.fn();
    try {
      new Bezier([
        0, 0,
        1,
      ])
    } catch (e) {
      fn()
    }
    expect(fn).toHaveBeenCalled()
  })
  test('确保参数个数为单数时能正常抛出异常', () => {
    const fn = jest.fn();
    try {
      new Bezier([
        0, 0,
        1, 1,
        3
      ])
    } catch (e) {
      fn()
    }
    expect(fn).toHaveBeenCalled()
  })
  test('确保贝塞尔曲线首尾和参数一致', () => {
    const bezier = new Bezier([
      0, 0,
      0.36, 0.66,
      0.04, 1,
      1, 1
    ]);
    expect(bezier.update(0)).toEqual({
      x: 0,
      y: 0
    })
    expect(bezier.update(1)).toEqual({
      x: 1,
      y: 1
    })
  })
  test('确保贝塞尔曲线计算结果符合预期', () => {
    const bezier = new Bezier([
      0, 0,
      0.36, 0.66,
      0.04, 1,
      1, 1
    ]);
    expect((() => {
      const r = bezier.update(0.25);
      return {
        x: +r.x.toFixed(3),
        y: +r.y.toFixed(3)
      }
    })()).toEqual({
      x: 0.173,
      y: 0.435
    })
    expect((() => {
      const r = bezier.update(0.5);
      return {
        x: +r.x.toFixed(3),
        y: +r.y.toFixed(3)
      }
    })()).toEqual({
      x: 0.275,
      y: 0.748
    })
    expect((() => {
      const r = bezier.update(0.75);
      return {
        x: +r.x.toFixed(3),
        y: +r.y.toFixed(3)
      }
    })()).toEqual({
      x: 0.489,
      y: 0.937
    })
  })
  test('确保能通过回调获取到正确的锚点', () => {
    const bezier = new Bezier([
      0, 0,
      0.36, 0.66,
      0.04, 1,
      1, 1
    ]);
    const anchors: BezierAnchor[] = []
    bezier.update(0.5, points => {
      anchors.push(...points);
    })
    expect(anchors.map(item => {
      return {
        x: +item.x.toFixed(3),
        y: +item.y.toFixed(3)
      }
    })).toEqual([
      {x: 0, y: 0},
      {x: 0.36, y: 0.66},
      {x: 0.04, y: 1},
      {x: 1, y: 1},
      {x: 0.18, y: 0.33},
      {x: 0.2, y: 0.830},
      {x: 0.52, y: 1},
      {x: 0.19, y: 0.580},
      {x: 0.36, y: 0.915}
    ])
  })
})
