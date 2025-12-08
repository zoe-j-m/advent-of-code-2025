import { describe, expect, it } from 'vitest'
import { day1, day1pt2 } from '../day1.js'

describe('day 1 examples should pass', () => {
  const example = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.split('\n')
  it('should pass pt1', () => {
    const result = day1(example)
    expect(result).toBe(3)
  })
  it('should pass pt2', () => {
    const result = day1pt2(example)
    expect(result).toBe(6)
  })
  it('should work with my example', () => {
    const data = `L50
R200
L50
R100
L175`.split('\n')
    const result = day1pt2(data)
    expect(result).toBe(6)
  })
})
