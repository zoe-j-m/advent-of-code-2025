import { readFileSync } from 'fs'

export const getFileAsLines = (filename: string): string[] => {
  return readFileSync(filename, 'utf-8').split('\n')
}

export const getLinesCommaSeparated = (filename: string): string[][] => {
  return getFileAsLines(filename).map((a) => a.split(','))
}
