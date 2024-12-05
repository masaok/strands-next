// import the list of words text file at ../data/words.txt

import { isCellUsed } from '@/utils/cells'
import { sleep } from '@/utils/controlFlow'
import { getPrefixes } from '@/utils/prefixes'
import fs from 'fs'
import path from 'path'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const MIN_WORD_LENGTH = 4
const MAX_WORD_LENGTH = 7

const MIN_PREFIX_LENGTH = 1
const MAX_PREFIX_LENGTH = 3

const counter = { strings_checked: 0 }

const argv = await yargs(hideBin(process.argv))
  .help('h') // Enable help via -h
  .alias('h', '?') // Alias -? to -h
  .alias('h', 'help') // Ensure both -h and --help work
  .options({
    sleepMilliseconds: {
      alias: 's',
      description: 'Sleep time in milliseconds',
      type: 'number',
      default: 500,
    },
    foundPause: {
      alias: 'f',
      description: 'Sleep ms when word found',
      type: 'number',
      default: 500,
    },
    verbose: {
      alias: 'v',
      description: 'Enable verbose output',
      type: 'boolean',
      default: false,
    },
    debug: {
      alias: 'd',
      description: 'Enable debug output',
      type: 'boolean',
      default: false,
    },
  })
  .parseAsync()

// Define the relative path to the text file
const filePath = path.join(__dirname, '../data/words.txt')

// Read the file synchronously
const fileContents = fs.readFileSync(filePath, 'utf-8')

// Split the contents into an array of words, trimming whitespace and convert to a Set
const dictionary = new Set(
  fileContents
    .split('\n')
    .map(word => word.trim().toLocaleLowerCase())
    .filter(Boolean)
)

// Dump the dictionary to a file dictionary.txt
const dictionaryFilePath = path.join(__dirname, '../data/dictionary.txt')
fs.writeFileSync(dictionaryFilePath, Array.from(dictionary).join('\n'))

// Output the words
console.log('Dictionary Size:', Array.from(dictionary).length)

const prefixes = getPrefixes(dictionary, MIN_PREFIX_LENGTH, MAX_PREFIX_LENGTH)
console.log('Prefixes Size:', Array.from(prefixes).length)

// Print the list of prefixes to a file prefixes.txt
const prefixesFilePath = path.join(__dirname, '../data/prefixes.txt')
fs.writeFileSync(prefixesFilePath, Array.from(prefixes).join('\n'))

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

const usedCells = new Set<string>([
  JSON.stringify([4, 3]), // G
  JSON.stringify([5, 3]), // R
  JSON.stringify([6, 3]), // A
  JSON.stringify([7, 3]), // V
  JSON.stringify([7, 2]), // E

  JSON.stringify([4, 1]), // A
  JSON.stringify([5, 1]), // C
  JSON.stringify([5, 0]), // U
  JSON.stringify([6, 0]), // T
  JSON.stringify([7, 0]), // E

  JSON.stringify([3, 1]), // T
  JSON.stringify([2, 1]), // I
  JSON.stringify([2, 0]), // L
  JSON.stringify([3, 0]), // D
  JSON.stringify([4, 0]), // E

  JSON.stringify([1, 1]), // U
  JSON.stringify([1, 2]), // M
  JSON.stringify([0, 2]), // L
  JSON.stringify([0, 1]), // A
  JSON.stringify([1, 0]), // U
  JSON.stringify([0, 0]), // T

  JSON.stringify([4, 5]), // C
  JSON.stringify([5, 5]), // E
  JSON.stringify([5, 4]), // D
  JSON.stringify([6, 4]), // I
  JSON.stringify([6, 5]), // L
  JSON.stringify([7, 5]), // L
  JSON.stringify([7, 4]), // A
])

async function findWords(
  grid: string[][],
  dictionary: Set<string>
): Promise<string[]> {
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
  async function backtrack(
    x: number,
    y: number,
    currentWord: string,
    breadcrumbs: number[][]
  ) {
    counter.strings_checked += 1

    // // If counter.strings_checked % 1000 === 0, print a '.' without newline
    // if (counter.strings_checked % 1000 === 0) process.stdout.write('.')

    // // If counter.strings_checked % 10000 === 0, print a newline
    // if (counter.strings_checked % 10000 === 0) process.stdout.write('\n')

    if (argv.sleepMilliseconds) await sleep(argv.sleepMilliseconds)
    if (argv.debug)
      console.log(`${x}, ${y}: BACKTRACKING CHECK CURRENT WORD: `, currentWord)
    // if (currentWord.length < MIN_WORD_LENGTH) return
    if (currentWord.length > MAX_WORD_LENGTH) return

    // Get the first 3 letters of the current word
    const prefix = currentWord.slice(0, MAX_PREFIX_LENGTH)
    if (!prefixes.has(prefix)) return

    if (argv.verbose)
      console.log(`${x}, ${y}: BACKTRACKING ALLOWED: `, currentWord)

    // Check if the current word is in the dictionary
    if (
      currentWord.length >= MIN_WORD_LENGTH &&
      dictionary.has(currentWord) &&
      !foundWords.has(currentWord)
    ) {
      console.log('FOUND WORD: ', currentWord, breadcrumbs, counter)
      foundWords.add(currentWord)
      if (argv.foundPause) await sleep(argv.foundPause)
    }

    // Explore all 8 directions
    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy

      // If [nx, ny] exists in breadcrumbs, skip
      if (breadcrumbs.some(([bx, by]) => bx === nx && by === ny)) continue

      // Check if [nx, ny] is already used
      if (isCellUsed(usedCells, nx, ny)) continue

      // Check bounds and if the cell is already visited
      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && !visited[nx][ny]) {
        visited[nx][ny] = true
        await backtrack(
          nx,
          ny,
          currentWord + grid[nx][ny].toLocaleLowerCase(),
          [...breadcrumbs, [nx, ny]]
        )
        visited[nx][ny] = false // Backtrack
      }
    }
  }

  // Start backtracking from every cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isCellUsed(usedCells, i, j)) continue

      console.log('STARTING BACKTRACKING FROM: ', i, j)

      visited[i][j] = true
      await backtrack(i, j, grid[i][j].toLocaleLowerCase(), [[i, j]])
      visited[i][j] = false
    }
  }

  return Array.from(foundWords)
}

const words = await findWords(array2D, dictionary)
console.log('Found Words:', words)
