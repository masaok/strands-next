// import the list of words text file at ../data/words.txt

import fs from 'fs'
import path from 'path'

const MIN_WORD_LENGTH = 4
const MAX_WORD_LENGTH = 8

// Define the relative path to the text file
const filePath = path.join(__dirname, '../data/words.txt')

// Read the file synchronously
const fileContents = fs.readFileSync(filePath, 'utf-8')

// Split the contents into an array of words, trimming whitespace and convert to a Set
const dictionary = new Set(
  fileContents
    .split('\n')
    .map(word => word.trim())
    .filter(Boolean)
)

// Output the words
console.log('Dictionary Size:', Array.from(dictionary).length)

const array2D: string[][] = [
  ['T', 'A', 'L', 'D', 'C', 'I'],
  ['U', 'U', 'M', 'I', 'U', 'R'],
  ['L', 'I', 'C', 'A', 'M', 'C'],
  ['D', 'T', 'R', 'F', 'X', 'E'],
  ['E', 'A', 'I', 'G', 'L', 'C'],
  ['U', 'C', 'T', 'R', 'D', 'E'],
  ['T', 'C', 'I', 'A', 'I', 'L'],
  ['E', 'S', 'E', 'V', 'A', 'L'],
]

function findWords(grid: string[][], dictionary: Set<string>): string[] {
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
  const foundWords = new Set<string>()

  // Directions for 8 possible moves (horizontal, vertical, diagonal)
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Diagonal up-left
    [-1, 1], // Diagonal up-right
    [1, -1], // Diagonal down-left
    [1, 1], // Diagonal down-right
  ]

  // Backtracking function to explore words
  function backtrack(x: number, y: number, currentWord: string) {
    if (currentWord.length > MAX_WORD_LENGTH) return
    console.log('BACKTRACKING CURRENT WORD: ', currentWord)

    // Check if the current word is in the dictionary
    if (currentWord.length >= MIN_WORD_LENGTH && dictionary.has(currentWord)) {
      console.log('FOUND WORD: ', currentWord)
      foundWords.add(currentWord)
    }

    // Explore all 8 directions
    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy

      // Check bounds and if the cell is already visited
      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && !visited[nx][ny]) {
        visited[nx][ny] = true
        backtrack(nx, ny, currentWord + grid[nx][ny])
        visited[nx][ny] = false // Backtrack
      }
    }
  }

  // Start backtracking from every cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      visited[i][j] = true
      backtrack(i, j, grid[i][j])
      visited[i][j] = false
    }
  }

  return Array.from(foundWords)
}

const words = findWords(array2D, dictionary)
console.log('Found Words:', words)
