import path from 'path'
import { day1, day1pt2 } from './day1.ts'
import { getFileAsLines, getLinesCommaSeparated } from './utils/fileHandling.ts'
import { day2pt1, day2pt2 } from './day2.ts'

const day1Data = getFileAsLines(path.resolve('./data/day1'))

console.log('Day1', day1(day1Data), day1pt2(day1Data))

const day2Data = getLinesCommaSeparated(path.resolve('./data/day2'))

console.log('Day2', day2pt1(day2Data[0]!), day2pt2(day2Data[0]!))
