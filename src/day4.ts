import { matrix, type CellCoordinates, type Matrix } from './utils/matrices.ts'

const parseLine = (line: string): string[] => {
  return line.split('')
}
const paperRoll = '@'

export const day4Process = (grid: Matrix<string>): CellCoordinates[] => {
  let removable: CellCoordinates[] = []
  const sizes = grid.size()
  const rowMax = sizes[0] || 0
  const colMax = sizes[1] || 0

  grid.forEach((cell, coords) => {
    let adjacentCount = 0
    if (cell === paperRoll) {
      const rowIndex = coords[0]!
      const colIndex = coords[1]!
      for (
        let k = Math.max(rowIndex - 1, 0);
        k <= Math.min(rowIndex + 1, rowMax);
        k++
      ) {
        for (
          let j = Math.max(colIndex - 1, 0);
          j <= Math.min(colIndex + 1, colMax);
          j++
        ) {
          if (grid.get([k, j]) === paperRoll) {
            adjacentCount++
          }
        }
      }
      if (adjacentCount < 5) {
        removable.push(coords)
      }
    }
  })
  return removable
}

export const day4pt1 = (lines: string[]) => {
  const grid: Matrix<string> = matrix(lines.map((a) => parseLine(a)))
  return day4Process(grid).length
}

export const day4pt2 = (lines: string[]) => {
  const grid: Matrix<string> = matrix(lines.map(parseLine))
  let removable: CellCoordinates[]
  let total = 0
  do {
    removable = day4Process(grid)
    total += removable.length
    removable.forEach((coordinates) => {
      grid.set(coordinates, '.')
    })
  } while (removable.length > 0)

  return total
}
