import { describe, expect, it } from 'vitest'
import { day8pt1, day8pt2 } from '../day8.ts'
import { day9pt1, day9pt2 } from '../day9.ts'

describe('day 9 examples should pass', () => {
  const example = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`.split('\n')

  it('should pass pt1', () => {
    const result = day9pt1(example)
    expect(result).toBe(50)
  })

  it('should pass pt2', () => {
    const result = day9pt2(example)
    expect(result).toBe(24)
  })
})
