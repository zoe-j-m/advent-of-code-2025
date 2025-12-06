import { access } from 'fs'
import { matrix } from './utils/matrices.ts'

const applySymbol = (symbol: string, a: number, b: number): number => {
  if (symbol == '*') {
    return a * b
  }

  return a + b
}
export const day6pt1 = (lines: string[]) => {
  const reversedLines = [...lines]
    .reverse()
    .map((line) => line.split(' ').filter((a) => a !== ''))

  if (!reversedLines[0]) return -1

  const symbolLine = reversedLines[0]

  const numberLines = reversedLines
    .slice(1)
    .map((a) => a.map((b) => parseInt(b)))

  let total = 0
  symbolLine.forEach((symbol, symbolIndex) => {
    const values = numberLines
      .map((a) => a[symbolIndex])
      .filter((a) => a != undefined)
    if (values[0]) {
      total += values
        .slice(1)
        .reduce((acc, curr) => applySymbol(symbol, acc, curr), values[0])
    }
  })
  return total
}

export const day6pt2 = (lines: string[]) => {
  const splitlines = [...lines].map((a) => a.split(''))

  const transposed: string[][] = []

  /*
   [1 2 3]
   [4 5 6]
   [+ * -]

   to

   [1 4 +]
   [2 5 *]
   [3 6 -]
  */
  splitlines.forEach((line) => {
    line.forEach((char, charIndex) => {
      if (transposed[charIndex]) {
        transposed[charIndex].push(char)
      } else {
        transposed.push([char])
      }
    })
  })

  let symbol = ''
  let numberStack: number[] = []
  let total = 0

  if (!transposed[0]) return -1

  let symbolPos = transposed[0].length - 1
  transposed.forEach((line) => {
    if (line.join('').trim() == '') {
      // calculate the result of the sum
      if (numberStack[0])
        total += numberStack
          .slice(1)
          .reduce((acc, curr) => applySymbol(symbol, acc, curr), numberStack[0])
      symbol = ''
      numberStack = []
    } else {
      if (line[symbolPos] && line[symbolPos] != ' ') {
        symbol = line[symbolPos]
      }
      numberStack.push(
        parseInt(line.slice(0, symbolPos).join('').replaceAll(' ', ''))
      )
    }
  })

  if (numberStack[0])
    total += numberStack
      .slice(1)
      .reduce((acc, curr) => applySymbol(symbol, acc, curr), numberStack[0])

  return total
}
