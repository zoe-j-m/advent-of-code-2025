import { describe, expect, it } from 'vitest'
import { day2pt1, day2pt2 } from '../day2.ts'

describe('day 2 examples should pass', () => {
  const example =
    '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'.split(
      ','
    )
  it('should pass pt1', () => {
    const result = day2pt1(example)
    expect(result).toBe(1227775554)
  })
  it('should pass pt2', () => {
    const result = day2pt2(example)
    expect(result).toBe(4174379265)
  })
})
