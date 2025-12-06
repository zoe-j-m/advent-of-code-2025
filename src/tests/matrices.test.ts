import { describe, expect, it, vi } from 'vitest';
import { matrix, DimensionsError } from '../utils/matrices.ts';

describe('matrix', () => {
    describe('creation and get', () => {
        it('should create a 1D matrix and get values', () => {
            const m = matrix([1, 2, 3]);
            expect(m.get([0])).toBe(1);
            expect(m.get([2])).toBe(3);
        });

        it('should create a 2D matrix and get values', () => {
            const m = matrix([
                [1, 2],
                [3, 4],
            ]);
            expect(m.get([0, 1])).toBe(2);
            expect(m.get([1, 0])).toBe(3);
        });

        it('should get a sub-array if coordinates are not fully specified', () => {
            const m = matrix([
                [1, 2],
                [3, 4],
            ]);
            expect(m.get([1])).toEqual([3, 4]);
        });

        it('should return undefined for out-of-bounds coordinates', () => {
            const m = matrix([1, 2, 3]);
            expect(m.get([5])).toBeUndefined();
        });

        it('should throw DimensionsError for coordinates with too many dimensions', () => {
            const m = matrix([1, 2, 3]);
            expect(() => m.get([0, 1])).toThrow(DimensionsError);
        });
    });

    describe('set', () => {
        it('should set a value in a 1D matrix', () => {
            const m = matrix([1, 2, 3]);
            m.set([1], 99);
            expect(m.get([1])).toBe(99);
        });

        it('should set a value in a 2D matrix', () => {
            const m = matrix([
                [1, 2],
                [3, 4],
            ]);
            m.set([0, 1], 99);
            expect(m.get([0, 1])).toBe(99);
            expect(m.get([0, 0])).toBe(1); // Ensure other values are untouched
        });

        it('should not throw when setting out-of-bounds coordinates', () => {
            const m = matrix([[1]]);
            expect(() => m.set([5, 5], 99)).not.toThrow();
        });
    });

    describe('forEach (overloads)', () => {
        const m2d = matrix([
            [1, 2],
            [3, 4],
        ]);

        it('should perform an action for each item and return void (forEach behavior)', () => {
            const mockFn = vi.fn();
            const result = m2d.forEach((value, coords) => {
                mockFn(value, coords);
            });

            expect(result).toBeUndefined();
            expect(mockFn).toHaveBeenCalledTimes(4);
            expect(mockFn).toHaveBeenCalledWith(1, [0, 0]);
            expect(mockFn).toHaveBeenCalledWith(2, [0, 1]);
            expect(mockFn).toHaveBeenCalledWith(3, [1, 0]);
            expect(mockFn).toHaveBeenCalledWith(4, [1, 1]);
        });

        it('should return a new matrix with transformed values (map behavior)', () => {
            const newMatrix = m2d.forEach((value) => value * 2);

            expect(newMatrix).toBeDefined();
            expect(newMatrix!.get([0, 0])).toBe(2);
            expect(newMatrix!.get([0, 1])).toBe(4);
            expect(newMatrix!.get([1, 0])).toBe(6);
            expect(newMatrix!.get([1, 1])).toBe(8);
        });

        it('should return a new matrix of a different type', () => {
            const newMatrix = m2d.forEach((value, coords) => `${value}@${coords.join(',')}`)!;

            expect(newMatrix.get([0, 0])).toBe('1@0,0');
            expect(newMatrix.get([1, 1])).toBe('4@1,1');
        });
    });
});