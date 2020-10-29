import { Bezier } from '@tanbo/bezier';

describe('Bezier', () => {
  test('demo', () => {
    const bezier = new Bezier([
      0, 0,
      1, 1
    ]);
    expect(bezier.update(0)).toEqual({x: 0, y: 0})
    expect(bezier.update(0.5)).toEqual({x: 0.5, y: 0.5})
    expect(bezier.update(1)).toEqual({x: 1, y: 1})
  })
})
