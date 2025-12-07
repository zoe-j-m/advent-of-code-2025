import { matrix, type CellCoordinates } from './utils/matrices.ts'

export const day7pt1 = (lines: string[]) => {
  const endOfField = lines.length
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
export const day7pt2 = (lines: string[]) => {
  const endOfField = lines.length
  const field = matrix(lines.map((a) => a.split('')))
  const startPos = lines[0]?.indexOf('S') || -1
  if (startPos < 0) return startPos
  const splitterMap: Map<string, number> = new Map()

  const beam = (startPos: CellCoordinates): number => {
    let next: CellCoordinates
    if (startPos[0]! == endOfField - 1) return 1
    if (field.get(startPos) == '^') {
      const startPosKey = startPos.join(',')
      const cachedValue = splitterMap.get(startPosKey)
      if (cachedValue) {
        return cachedValue
      } else {
        const left = [...startPos]
        left[1]! -= 1
        const right = [...startPos]
        right[1]! += 1
        const splitCount = beam(left) + beam(right)
        splitterMap.set(startPosKey, splitCount)
        return splitCount
      }
    } else {
      next = [...startPos]
      next[0]! += 1
      return beam(next)
    }
  }

  return beam([0, startPos])
}
