export type CellCoordinates = number[]
export type NestedArray<T> = T | NestedArray<T>[];
export interface Matrix<T> {
    get(coordinates: CellCoordinates): NestedArray<T> | undefined;
    set(coordinates: CellCoordinates, value: T): void;
    forEach<U>(fn: (value: T, coordinates: CellCoordinates) => U | void): Matrix<U> | void;
    forEach(fn: (value: T, coordinates: CellCoordinates) => void): void;
}



export class DimensionsError extends Error {}

export const matrix = <T>(x : NestedArray<T>) : Matrix<T> => {
    const values = x
    let p : NestedArray<T> | undefined = values, dimensions = 0
    do {
        dimensions++
        if (Array.isArray(p)) {
            p = p[0]
        }
    } while (Array.isArray(p))

    return {
       get: (coordinates: CellCoordinates) : NestedArray<T> | undefined => {
         if (coordinates.length > dimensions) throw new DimensionsError("Coordinates longer than dimensions")
         let coords = [...coordinates]
         coords.reverse()
         let a : NestedArray<T> | undefined = values
         do {
            const b = coords.pop()
            if (Array.isArray(a) && a[b!]) a = a[b!]
            else { a = undefined }
         } while (a && coords.length > 0)
         return a
       },
       set: (coordinates:CellCoordinates, value:T) => {
         if (coordinates.length > dimensions) throw new DimensionsError("Coordinates longer than dimensions")
         let current: NestedArray<T> = values;
         for (let i = 0; i < coordinates.length - 1; i++) {
            const coord = coordinates[i]!;
            if (Array.isArray(current) && current[coord] !== undefined) {
                current = current[coord] as NestedArray<T>[];
            } else {
                // Path doesn't exist or is not an array, so we cannot set the value.
                return;
            }
         }
         if (Array.isArray(current)) current[coordinates[coordinates.length - 1!]!] = value;
       },
       forEach<U>(fn: (value: T, coordinates: CellCoordinates) => U | void): Matrix<U> | void { // This overload handles both mapping and simple iteration
            let isMapping = false;
            const mapInternal = (level: NestedArray<T>, coords: CellCoordinates): NestedArray<U> | U | undefined => {
                if (Array.isArray(level)) {
                  return level.map((value, index) => mapInternal(value, [...coords, index])) as NestedArray<U>;
                } else {
                  const result = fn(level, [...coords]);
                  if (result !== undefined) {
                    isMapping = true;
                  }
                  // If it's a mapping operation, return the mapped value.
                  // Otherwise, for simple forEach, return undefined.
                  return isMapping ? result as U : undefined;
                }
            };

            const newValues = mapInternal(values, []);

            if (isMapping) {
                return matrix(newValues as NestedArray<U>);
            }
            // If not mapping, it's a simple forEach, so return void.
            return undefined;
       }
    }
}