// isCellUsed.test.ts
import { isCellUsed } from './cells'

describe('isCellUsed', () => {
  let usedCells: Set<string>

  beforeEach(() => {
    usedCells = new Set<string>([
      JSON.stringify([4, 3]),
      JSON.stringify([5, 3]),
      JSON.stringify([6, 3]),
      JSON.stringify([7, 3]),
      JSON.stringify([7, 2]),
    ])
  })

  it('should return true if the cell is used', () => {
    expect(isCellUsed(usedCells, 4, 3)).toBe(true)
    expect(isCellUsed(usedCells, 7, 3)).toBe(true)
    expect(isCellUsed(usedCells, 7, 2)).toBe(true)
  })

  it('should return false if the cell is not used', () => {
    expect(isCellUsed(usedCells, 5, 4)).toBe(false)
    expect(isCellUsed(usedCells, 8, 3)).toBe(false)
    expect(isCellUsed(usedCells, 4, 4)).toBe(false)
  })
})
