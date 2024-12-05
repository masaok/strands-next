export function isCellUsed(
  usedCells: Set<string>,
  x: number,
  y: number
): boolean {
  return usedCells.has(JSON.stringify([x, y]))
}
