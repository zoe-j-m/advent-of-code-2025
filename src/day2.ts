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

const day2Process = (
  stringRanges: string[],
  matchFn: (stringN: string) => boolean
): number => {
  let total = 0
  const ranges = stringRanges.map(parseRange)
  ranges.forEach((range) => {
    for (let i = range.from; i <= range.to; i++) {
      if (matchFn(i.toString())) {
        total += i
      }
    }
  })
  return total
}

export const day2pt1 = (stringRanges: string[]): number => {
  return day2Process(stringRanges, (stringN) => {
    const stringNLength = stringN.length
    return (
      stringNLength % 2 == 0 &&
      stringN.substring(0, stringNLength / 2) ==
        stringN.substring(stringNLength / 2)
    )
  })
}

export const day2pt2 = (stringRanges: string[]): number => {
  return day2Process(stringRanges, (stringN) => {
    const stringNLength = stringN.length
    for (let j = 1; j <= stringNLength / 2; j++) {
      const chunked = chunkString(stringN, j)
      const chunkedSet = new Set(chunked)
      if (chunkedSet.size == 1) {
        return true
      }
    }
    return false
  })
}
