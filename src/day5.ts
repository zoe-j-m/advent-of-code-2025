interface Range {
  from: number
  to: number
}

export const day5pt1 = (lines: string[]) => {
  const { ranges, remainingLines } = getRanges(lines)

  let total = 0
  remainingLines.forEach((line) => {
    const value = parseInt(line)
    if (ranges.find((range) => range.from <= value && range.to >= value)) {
      total++
    }
  })
  return total
}

const getRanges = (
  lines: string[]
): { ranges: Range[]; remainingLines: string[] } => {
  const rangeLines = []
  let i = 0
  while (lines[i] && lines[i] != '') {
    rangeLines.push(lines[i]!)
    i++
  }
  const ranges: Range[] = []
  rangeLines.forEach((line) => {
    const splitLine = line.split('-')
    if (splitLine[0] && splitLine[1]) {
      ranges.push({ from: parseInt(splitLine[0]), to: parseInt(splitLine[1]) })
    }
  })
  return { ranges, remainingLines: lines.slice(i + 1) }
}

export const day5pt2 = (lines: string[]) => {
  const { ranges } = getRanges(lines)
  ranges.sort((a, b) => {
    const fromCompare = a.from - b.from
    if (fromCompare != 0) return fromCompare

    return a.to - b.to
  })

  let i = 0
  while (i < ranges.length - 1) {
    const range = ranges[i]
    const nextRange = ranges[i + 1]
    if (!range || !nextRange) continue

    if (nextRange.from <= range.to) {
      if (nextRange.to <= range.to) {
        ranges.splice(i + 1, 1)
        continue
      } else {
        range.to = nextRange.from - 1
      }
    }
    i++
  }

  let total = 0
  ranges.forEach((range) => (total += range.to - range.from + 1))
  return total
}
