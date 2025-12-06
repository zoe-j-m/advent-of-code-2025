import { describe, expect, it } from 'vitest'
import { day5pt1, day5pt2 } from '../day5.ts'

describe('day 5 examples should pass', () => {
  const example = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`.split('\n')

  it('should pass pt1', () => {
    const result = day5pt1(example)
    expect(result).toBe(3)
  })
  it('should pass pt2', () => {
    const result = day5pt2(example)
    expect(result).toBe(14)
  })
  it('should pass zoes test', () => {
      const zExample = `3-5
10-14
16-20
18-19
12-18
11-20
20-20
22-22
22-22
`.split('\n')
    const result = day5pt2(zExample)
    expect(result).toBe(15)
  })
})
