import { readFileSync } from 'fs'

export const getFileAsLines = (filename: string): string[] => {
  return readFileSync(filename, 'utf-8').split('\n')
}

