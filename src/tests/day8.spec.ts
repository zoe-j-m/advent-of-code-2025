import { describe, expect, it } from 'vitest'
import { day8pt1, day8pt2 } from '../day8.ts'

describe('day 6 examples should pass', () => {
  const example = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`.split('\n')

  it('should pass pt1', () => {
    const result = day8pt1(3, 10)(example)
    expect(result).toBe(40)
  })
  it('should pass pt2', () => {
    const result = day8pt2(example)
    expect(result).toBe(25272)
  })
})
