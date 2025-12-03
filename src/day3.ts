const parseLine = (line: string): number[] => {
  return line.split('').map((b) => parseInt(b))
}

const getCandidateValue = (nums: number[], leave: number, start: number) => {
  let max = 0,
    pos = 0
  for (let i = start; i < nums.length - leave; i++) {
    if (nums[i]! > max) {
      max = nums[i]!
      pos = i
    }
  }
  return [max, pos]
}

const day3Process = (lines: string[], iterations: number) => {
  let total = 0
  lines.forEach((line) => {
    const nums = parseLine(line)
    let posMarker = 0
    for (let k = iterations; k >= 0; k--) {
      const [max, pos] = getCandidateValue(nums, k, posMarker)
      posMarker = pos! + 1
      total += Math.pow(10, k) * max!
    }
  })
  return total
}

export const day3pt1 = (lines: string[]) => {
  return day3Process(lines, 1)
}

export const day3pt2 = (lines: string[]) => {
  return day3Process(lines, 11)
}
