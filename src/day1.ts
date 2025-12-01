const parseLine = (line: string): number => {
  const direction = line[0]
  const a = direction == 'L' ? -1 : 1
  return a * parseInt(line.slice(1))
}

export const day1 = (lines: string[]) => {
  var position = 50
  var total = 0

  for (const line of lines) {
    position = position + parseLine(line)
    if (position >= 100) {
      position = position % 100
    }
    if (position < 0) {
      position = ((position % 100) + 100) % 100
    }

    if (position == 0) total++
  }
  return total
}

export const day1pt2 = (lines: string[]) => {
  var position = 50
  var oldPos = 50
  var total = 0

  for (const line of lines) {
    position = position + parseLine(line)

    if (position >= 100) {
      total += Math.floor(position / 100)
      position = position % 100
    } else if (position < 0) {
      total += Math.floor(Math.abs(position) / 100)
      if (oldPos != 0) total++
      position = ((position % 100) + 100) % 100
    } else if (position == 0) total++
    oldPos = position
  }
  return total
}
