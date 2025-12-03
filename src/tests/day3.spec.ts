import { describe, expect, it } from 'vitest'
import { day3pt1, day3pt2 } from '../day3.ts'

describe('day 3 examples should pass', () => {
  const example = `987654321111111
811111111111119
234234234234278
818181911112111`.split('\n')

  it('should pass pt1', () => {
    const result = day3pt1(example)
    expect(result).toBe(357)
  })

  it('should pass pt2', () => {
    const result = day3pt2(example)
    expect(result).toBe(3121910778619)
  })
})
