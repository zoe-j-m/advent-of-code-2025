export type CellCoordinates = number[]
export type NestedArray<T> = T | NestedArray<T>[]
const emptyArray = <T>(dimensions: number): NestedArray<T> => {
  if (dimensions > 1) return [emptyArray(dimensions - 1)]
  return []
}
export type Direction = 'Left' | 'Right'
export interface Matrix<T> {
  get(coordinates: CellCoordinates): NestedArray<T> | undefined
  set(coordinates: CellCoordinates, value: NestedArray<T>): void
  size(): number[]
  rotate(direction: Direction): Matrix<T>
  forEach<U>(
    fn: (value: T, coordinates: CellCoordinates) => U | void
  ): Matrix<U> | void
  forEach(fn: (value: T, coordinates: CellCoordinates) => void): void
}

export class DimensionsError extends Error {}

export const matrix = <T>(x: NestedArray<T>): Matrix<T> => {
  const values = x
  let p: NestedArray<T> | undefined = values,
    dimensions = 0
  do {
    dimensions++
    if (Array.isArray(p)) {
      p = p[0]
    }
  } while (Array.isArray(p))

  return {
    size: () => {
      const sizeInternal = (na: NestedArray<T>): number[] => {
        if (Array.isArray(na) && na[0] !== undefined) {
          return [na.length, ...sizeInternal(na[0])]
        } else {
          return []
        }
      }
      return sizeInternal(values)
    },
    get: (coordinates: CellCoordinates): NestedArray<T> | undefined => {
      if (coordinates.length > dimensions)
        throw new DimensionsError('Coordinates longer than dimensions')
      let coords = [...coordinates]
      coords.reverse()
      let a: NestedArray<T> | undefined = values
      while (a && coords.length > 0) {
        const b = coords.pop()
        if (Array.isArray(a) && a[b!]) a = a[b!]
        else {
          a = undefined
        }
      }
      return a
    },
    set: (coordinates: CellCoordinates, value: NestedArray<T>) => {
      if (coordinates.length > dimensions)
        throw new DimensionsError('Coordinates longer than dimensions')
      let current: NestedArray<T> = values
      for (let i = 0; i < coordinates.length - 1; i++) {
        const coord = coordinates[i]!
        if (Array.isArray(current)) {
          if (current[coord] !== undefined) {
            current = current[coord] as NestedArray<T>[]
          } else current = emptyArray(1)
        } else {
          // Path doesn't exist or is not an array, so we cannot set the value.
          return
        }
      }
      if (Array.isArray(current))
        current[coordinates[coordinates.length - 1!]!] = value
    },
    rotate: (direction: Direction) => {
      if (dimensions !== 2)
        throw new DimensionsError('Can only rotate 2d matrixes')
      const outMatrix = matrix(emptyArray<T>(2))

      if (direction == 'Left') {
        if (Array.isArray(values)) {
          values.forEach((row, y) => {
            if (Array.isArray(row)) {
              const maxX = row.length - 1
              row.forEach((cell, x) => {
                // [2,0] [2, 1] [2,2]
                // [1,0] [1, 1] [1,2]
                // [0,0] [0, 1] [0,2]
                console.log(cell, x, y, maxX - x)
                outMatrix.set([y, maxX - x], cell)
                console.log(outMatrix.get([]))
              })
            }
          })
        }
      }
      return outMatrix
    },
    forEach<U>(
      fn: (value: T, coordinates: CellCoordinates) => U | void
    ): Matrix<U> | void {
      // This overload handles both mapping and simple iteration
      let isMapping = false
      const mapInternal = (
        level: NestedArray<T>,
        coords: CellCoordinates
      ): NestedArray<U> | U | undefined => {
        if (Array.isArray(level)) {
          return level.map((value, index) =>
            mapInternal(value, [...coords, index])
          ) as NestedArray<U>
        } else {
          const result = fn(level, [...coords])
          if (result !== undefined) {
            isMapping = true
          }
          // If it's a mapping operation, return the mapped value.
          // Otherwise, for simple forEach, return undefined.
          return isMapping ? (result as U) : undefined
        }
      }

      const newValues = mapInternal(values, [])

      if (isMapping) {
        return matrix(newValues as NestedArray<U>)
      }
      // If not mapping, it's a simple forEach, so return void.
      return undefined
    },
  }
}
