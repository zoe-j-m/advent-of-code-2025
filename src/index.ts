import path from 'path'
// import { day2pt1, day2pt2 } from './day2.ts'
// import { getLinesCommaSeparated } from './utils/stringUtils.ts'
// import { day3pt1, day3pt2 } from './day3.ts'
// import { day4pt1, day4pt2 } from './day4.ts'
// import { day5pt1, day5pt2 } from './day5.ts'
// import { day6pt1, day6pt2 } from './day6.ts'
import { day7pt1, day7pt2 } from './day7.ts'
import { day8pt1, day8pt2 } from './day8.ts'
import { day9pt1, day9pt2 } from './day9.ts'
// import { day1, day1pt2 } from './day1.ts'
import { getFileAsLines } from './utils/fileHandling.ts'

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

// runDay(1, day1, day1pt2)
// runDay(
//   2,
//   (data) => day2pt1(getLinesCommaSeparated(data)[0]!),
//   (data) => day2pt2(getLinesCommaSeparated(data)[0]!)
// )
// runDay(3, day3pt1, day3pt2)
// runDay(4, day4pt1, day4pt2)
// runDay(5, day5pt1, day5pt2)
// runDay(6, day6pt1, day6pt2)
// runDay(7, day7pt1, day7pt2)
// runDay(8, day8pt1(3, 1000), day8pt2)
runDay(9, day9pt1, day9pt2)
