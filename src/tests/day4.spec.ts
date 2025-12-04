import { describe, expect, it } from 'vitest'
import { day4pt1, day4pt2 } from '../day4.ts'

describe('day 4 examples should pass', () => {
  const example = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split('\n')

  it('should pass pt1', () => {
    const result = day4pt1(example)
    expect(result).toBe(13)
  })

  it('should pass pt2', () => {
    const result = day4pt2(example)
    expect(result).toBe(43)
  })
})
