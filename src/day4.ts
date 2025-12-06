import { matrix, type CellCoordinates, type Matrix } from "./utils/matrices.ts"

const parseLine = (line: string): string[] => {
  return line.split('')
}
const paperRoll = '@'

export const day4Process = (grid: Matrix<string>): CellCoordinates[] => {
  let removable: CellCoordinates[] = [] 
  grid.forEach(
      (cell, coords) => {
      let adjacentCount = 0
      if (cell === paperRoll) {
        const rowIndex = coords[1]!
        const colIndex = coords[0]!
        for (let k = rowIndex - 1; k <= rowIndex + 1; k++) {
          for (let j = colIndex - 1; j <= colIndex + 1; j++) {
            try {
              if (grid.get([j,k]) === paperRoll) {
                adjacentCount++
              }
            } catch {
              
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
  const grid: Matrix<string> = matrix(lines.map(parseLine))
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
