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

  const symbolLine = reversedLines[0]!

  const numberLines = reversedLines
    .slice(1)
    .map((a) => a.map((b) => parseInt(b)))

  let total = 0
  symbolLine.forEach((symbol, symbolIndex) => {
    const values = numberLines.map((a) => a[symbolIndex]!)
    total += values
      .slice(1)
      .reduce((acc, curr) => applySymbol(symbol, acc, curr), values[0]!)
  })
  return total
}

export const day6pt2 = (lines: string[]) => {
  const splitlines = [...lines].map((a) => a.split(''))

  const transposed: string[][] = []

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
  let symbolPos = transposed[0]!.length - 1
  transposed.forEach((line) => {
    if (line.filter((a) => a != ' ').length == 0) {
      total += numberStack
        .slice(1)
        .reduce((acc, curr) => applySymbol(symbol, acc, curr), numberStack[0]!)
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

  total += numberStack
    .slice(1)
    .reduce((acc, curr) => applySymbol(symbol, acc, curr), numberStack[0]!)

  return total
}
