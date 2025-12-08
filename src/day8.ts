interface Light {
  coords: [number, number, number]
  key: string
}

export const day8pt1 =
  (topmost: number, connections: number) =>
  (lines: string[]): number => {
    const lights = getLights(lines)

    const distances = getDistances(lights)

    const shortest = Array.from(distances)
    shortest.sort((a, b) => a[1] - b[1])

    let circuits: Array<Set<string>> = []

    let connectionCount = 0
    let connectionIndex = 0
    while (connectionCount < connections && connectionIndex < shortest.length) {
      const connection = shortest[connectionIndex]!
      connectionIndex++
      const [from, to] = connection[0].split(':')
      let existingFrom = circuits.findIndex((a) => a.has(from || ''))
      let existingTo = circuits.findIndex((a) => a.has(to || ''))
      connectionCount++
      if (existingFrom > -1 && existingFrom == existingTo) {
        continue
      }

      if (existingFrom > -1 && existingTo > -1) {
        circuits[existingTo]?.forEach((item) =>
          circuits[existingFrom]?.add(item)
        )
        circuits.splice(existingTo, 1)
        continue
      }
      if (existingFrom > -1) {
        circuits[existingFrom]?.add(to || '')
        continue
      }
      if (existingTo > -1) {
        circuits[existingTo]?.add(from || '')
        continue
      }
      circuits.push(new Set([from || '', to || '']))
    }

    const circuitSizes = circuits
      .map((a) => a.size)
      .sort((a, b) => b - a)
      .slice(0, topmost)
    return circuitSizes.reduce((acc, curr) => (acc *= curr), 1)
  }

const getLights = (lines: string[]) => {
  const lights: Map<string, Light> = new Map()
  lines.forEach((line) => {
    const splitNums = line.split(',').map((a) => parseInt(a))
    lights.set(line, {
      coords: [splitNums[0] || -1, splitNums[1] || -1, splitNums[2] || -1],
      key: line,
    })
  })
  return lights
}

const getDistances = (lights: Map<string, Light>) => {
  const distances: Map<string, number> = new Map()
  //calculate each point neighbour distances
  lights.forEach((light) => {
    lights.forEach((otherLight) => {
      if (light.key != otherLight.key) {
        const pairKey = [light.key, otherLight.key].sort().join(':')
        if (!distances.has(pairKey)) {
          let distance = 0
          light.coords.forEach((x, i) => {
            const delta = Math.abs(x - otherLight.coords[i]!)
            distance += delta * delta
          })
          distances.set(pairKey, distance)
        }
      }
    })
  })
  return distances
}
export const day8pt2 = (lines: string[]): number => {
  const lights = getLights(lines)

  const distances = getDistances(lights)

  const shortest = Array.from(distances)
  shortest.sort((a, b) => a[1] - b[1])

  let circuits: Array<Set<string>> = []
  lights.forEach((a) => circuits.push(new Set([a.key])))

  let connectionIndex = 0
  let last: string = ''
  while (circuits.length > 1) {
    const connection = shortest[connectionIndex]!
    connectionIndex++
    const [from, to] = connection[0].split(':')
    last = connection[0]
    let existingFrom = circuits.findIndex((a) => a.has(from || ''))
    let existingTo = circuits.findIndex((a) => a.has(to || ''))
    if (existingFrom > -1 && existingFrom == existingTo) {
      continue
    }

    if (existingFrom > -1 && existingTo > -1) {
      circuits[existingTo]?.forEach((item) => circuits[existingFrom]?.add(item))
      circuits.splice(existingTo, 1)
      continue
    }
    if (existingFrom > -1) {
      circuits[existingFrom]?.add(to || '')
      continue
    }
    if (existingTo > -1) {
      circuits[existingTo]?.add(from || '')
      continue
    }
    circuits.push(new Set([from || '', to || '']))
  }

  const [from, to] = last.split(':')

  if (from && to) {
    const fromLight = lights.get(from)
    const toLight = lights.get(to)
    return (fromLight?.coords[0] || -1) * (toLight?.coords[0] || -1)
  }

  return -1
}
