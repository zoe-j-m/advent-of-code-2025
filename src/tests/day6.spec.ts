import { describe, expect, it } from 'vitest'
import { day6pt1, day6pt2 } from '../day6.ts'

describe('day 6 examples should pass', () => {
  const example = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`.split('\n')

  it('should pass pt1', () => {
    const result = day6pt1(example)
    expect(result).toBe(4277556)
  })
  it('should pass pt2', () => {
    const result = day6pt2(example)
    expect(result).toBe(3263827)
  })
})
