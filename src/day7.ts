import { matrix } from './utils/matrices.ts'

export const day7pt1 = (lines: string[]) => {
  const field = lines.map((a) => a.split(''))
  const startPos = lines[0]?.indexOf('S') || -1
  if (startPos < 0) return startPos

  let splitCount = 0

  let previousBeamSet = new Set([startPos])

  field.slice(1).forEach((line) => {
    const beamSet: Set<number> = new Set()
    line.forEach((cell, index) => {
      if (previousBeamSet.has(index)) {
        if (cell == '.') {
          beamSet.add(index)
        } else {
          if (cell == '^') {
            beamSet.add(index - 1)
            beamSet.add(index + 1)
            splitCount++
          }
        }
      }
    })

    previousBeamSet = beamSet
  })

  return splitCount
}

type Coordinates = [number, number]

export const day7pt2 = (lines: string[]) => {
  const endOfField = lines.length
  const field = matrix(lines.map((a) => a.split('')))
  const startPos = lines[0]?.indexOf('S') || -1
  if (startPos < 0) return startPos
  const splitterMap: Map<string, number> = new Map()

  const beam = (startPos: Coordinates): number => {
    if (startPos[0] == endOfField - 1) return 1
    if (field.get(startPos) == '^') {
      const startPosKey = startPos.join(',')
      const cachedValue = splitterMap.get(startPosKey)
      if (cachedValue) {
        return cachedValue
      } else {
        const splitCount =
          beam([startPos[0], startPos[1] - 1]) +
          beam([startPos[0], startPos[1] + 1])
        splitterMap.set(startPosKey, splitCount)
        return splitCount
      }
    } else {
      return beam([startPos[0] + 1, startPos[1]])
    }
  }

  return beam([0, startPos])
}
