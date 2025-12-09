export const day9pt1 = (lines: string[]): number => {
  const pairs: [number, number][] = lines.map((a) => {
    const b = a.split(',')
    return [parseInt(b[0] || '-1'), parseInt(b[1] || '-1')]
  })

  let max = 0
  pairs.forEach((pair1) => {
    pairs.forEach((pair2) => {
      const size =
        Math.abs(pair1[0] - pair2[0] + 1) * Math.abs(pair1[1] - pair2[1] + 1)
      if (size > max) {
        max = size
      }
    })
  })
  return max
}
type Tile = [number, number]
type TilePair = [Tile, Tile]
export const day9pt2 = (lines: string[]): number => {
  const redTiles: Tile[] = lines.map((a) => {
    const b = a.split(',')
    return [parseInt(b[0] || '-1'), parseInt(b[1] || '-1')]
  })

  const greenLines: TilePair[] = []

  redTiles.forEach((tile, index) => {
    if (index < redTiles.length - 1) {
      greenLines.push([tile, redTiles[index + 1]!])
    } else {
      greenLines.push([tile, redTiles[0]!])
    }
  })

  const rectangles: { rectangle: TilePair; size: number }[] = []
  redTiles.forEach((tile1) => {
    redTiles.forEach((tile2) => {
      if (tile1 == tile2) return
      const rectangle: TilePair = [
        [Math.min(tile1[0], tile2[0]), Math.min(tile1[1], tile2[1])],
        [Math.max(tile1[0], tile2[0]), Math.max(tile1[1], tile2[1])],
      ]
      const size =
        (rectangle[1][1] - rectangle[0][1] + 1) *
        (rectangle[1][0] - rectangle[0][0] + 1)
      rectangles.push({ rectangle, size })
    })
  })

  rectangles.sort((a, b) => {
    return a.size - b.size
  })

  const containsLine = (rectangle: TilePair): boolean => {
    const [maxX, maxY, minX, minY] = [
      Math.max(rectangle[0][0], rectangle[1][0]),
      Math.max(rectangle[0][1], rectangle[1][1]),
      Math.min(rectangle[0][0], rectangle[1][0]),
      Math.min(rectangle[0][1], rectangle[1][1]),
    ]
    return (
      greenLines.find((a) => {
        for (
          let x = Math.min(a[0][0], a[1][0]);
          x <= Math.max(a[0][0], a[1][0]);
          x++
        ) {
          for (
            let y = Math.min(a[0][1], a[1][1]);
            y <= Math.max(a[0][1], a[1][1]);
            y++
          ) {
            if (x > minX && x < maxX && y > minY && y < maxY) return true
          }
        }
      }) != undefined
    )
  }

  const containsRectangle = (rect1: TilePair, rect2: TilePair): boolean => {
    return (
      rect1[0][0] <= rect2[0][0] &&
      rect1[0][1] <= rect2[0][1] &&
      rect1[1][0] >= rect2[1][0] &&
      rect1[1][1] >= rect2[1][1]
    )
  }
  let rectIndex = 0
  while (rectIndex < rectangles.length) {
    const rectangle = rectangles[rectIndex]
    if (!rectangle) continue
    if (containsLine(rectangle.rectangle)) {
      for (
        let deleteIndex = rectangles.length - 1;
        deleteIndex >= rectIndex;
        deleteIndex--
      ) {
        const deleteCandidate = rectangles[deleteIndex]
        if (
          deleteCandidate &&
          containsRectangle(deleteCandidate.rectangle, rectangle.rectangle)
        ) {
          rectangles.splice(deleteIndex, 1)
        }
      }
    } else {
      rectIndex++
    }
  }
  rectangles.sort((a, b) => {
    return b.size - a.size
  })

  return rectangles[0]?.size || -1
}
