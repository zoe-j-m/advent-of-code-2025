const parseLine = (line: string): string[] => {
  return line.split('')
}
const paperRoll = '@'

interface GridRef {
  row: number
  col: number
}

export const day4Process = (grid: string[][]): GridRef[] => {
  let removable: GridRef[] = []
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      let adjacentCount = 0
      if (cell === paperRoll) {
        for (let k = rowIndex - 1; k <= rowIndex + 1; k++) {
          for (let j = colIndex - 1; j <= colIndex + 1; j++) {
            try {
              if (grid[k]![j]! === paperRoll) {
                adjacentCount++
              }
            } catch {}
          }
        }
        if (adjacentCount < 5) {
          removable.push({ row: rowIndex, col: colIndex })
        }
      }
    })
  })
  return removable
}

export const day4pt1 = (lines: string[]) => {
  const grid: string[][] = lines.map(parseLine)
  return day4Process(grid).length
}

export const day4pt2 = (lines: string[]) => {
  const grid: string[][] = lines.map(parseLine)
  let removable: GridRef[]
  let total = 0
  do {
    removable = day4Process(grid)
    total += removable.length
    removable.forEach((ref) => {
      grid[ref.row]![ref.col]! = '.'
    })
  } while (removable.length > 0)

  return total
}
