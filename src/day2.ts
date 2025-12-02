import { chunkString } from './utils/stringUtils.ts'

export interface Range {
  from: number
  to: number
}

const parseRange = (range: string): Range => {
  const dashSplit = range.split('-')
  if (dashSplit[0] && dashSplit[1]) {
    return { from: parseInt(dashSplit[0]), to: parseInt(dashSplit[1]) }
  }
  throw new Error('Invalid range')
}

export const day2pt1 = (stringRanges: string[]): number => {
  let total = 0
  const ranges = stringRanges.map(parseRange)
  ranges.forEach((range) => {
    for (let i = range.from; i <= range.to; i++) {
      const stringI = i.toString()
      const stringILength = stringI.length
      if (stringILength % 2 == 0) {
        if (
          stringI.substring(0, stringILength / 2) ==
          stringI.substring(stringILength / 2)
        ) {
          total += i
        }
      }
    }
  })
  return total
}

export const day2pt2 = (stringRanges: string[]): number => {
  let total = 0
  const ranges = stringRanges.map(parseRange)
  ranges.forEach((range) => {
    for (let i = range.from; i <= range.to; i++) {
      const stringI = i.toString()
      const stringILength = stringI.length
      for (let j = 1; j <= stringILength / 2; j++) {
        const chunked = chunkString(stringI, j)
        const chunkedSet = new Set(chunked)
        if (chunkedSet.size == 1) {
          total += i
          break
        }
      }
    }
  })
  return total
}
