import { matrix, type CellCoordinates } from './utils/matrices.ts'
export const day7pt1 = (lines: string[]) => {
  const endOfField = lines.length
  const field = matrix(lines.map((a) => a.split('')))
  const startPos = lines[0]?.indexOf('S') || -1
  if (startPos < 0) return startPos
  const beamSet: Set<string> = new Set()

  let splitCount = 0

  const beam = (startCoords: CellCoordinates) => {
    let currentCoords = [...startCoords]
    while (
      currentCoords[0] != undefined &&
      currentCoords[0] < endOfField &&
      !beamSet.has(currentCoords.join(','))
    ) {
      beamSet.add([...currentCoords].join(','))
      currentCoords = [...currentCoords]
      currentCoords[0]! += 1
      if (field.get(currentCoords) == '^') {
        const beamLaunch = [...currentCoords]
        beamLaunch[1]! += 1
        const continuation = [...currentCoords]
        continuation[1]! -= 1
        const beamGo = !beamSet.has(beamLaunch.join(','))
        const continuationGo = !beamSet.has(continuation.join(','))
        splitCount += 1
        if (beamGo) beam(beamLaunch)
        if (!continuationGo) {
          currentCoords = []
        } else {
          currentCoords = continuation
        }
      }
    }
  }
  beam([0, startPos])
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
