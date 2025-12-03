import path from 'path'
import { day1, day1pt2 } from './day1.ts'
import { getFileAsLines } from './utils/fileHandling.ts'
import { day2pt1, day2pt2 } from './day2.ts'
import { getLinesCommaSeparated } from './utils/stringUtils.ts'
import { day3pt1, day3pt2 } from './day3.ts'

const runDay = (
  dayNo: number,
  pt1: (data: string[]) => number,
  pt2?: (data: string[]) => number
) => {
  const data = getFileAsLines(path.resolve(`./data/day${dayNo}`))
  const pt1Start = Date.now()
  const pt1Out = pt1(data)
  const pt1End = Date.now()
  const pt2Out = pt2 ? pt2(data) : undefined
  const pt2End = Date.now()
  console.log(`Day ${dayNo}`, {
    pt1Out,
    pt1Elapsed: pt1End - pt1Start,
    pt2Out,
    pt2Elapsed: pt2 ? pt2End - pt1End : undefined,
  })
}

runDay(1, day1, day1pt2)
runDay(
  2,
  (data) => day2pt1(getLinesCommaSeparated(data)[0]!),
  (data) => day2pt2(getLinesCommaSeparated(data)[0]!)
)
runDay(3, day3pt1, day3pt2)
