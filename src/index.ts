import path from 'path'
import { day1, day1pt2 } from './day1.ts'
import { getFileAsLines } from './utils/fileHandling.ts'

const day1Data = getFileAsLines(path.resolve('./data/day1'))

console.log('Day1', day1(day1Data), day1pt2(day1Data))
