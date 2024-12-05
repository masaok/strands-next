import { getPrefixes } from './prefixes'

describe('getPrefixes', () => {
  it('should return correct prefixes within the specified length range', () => {
    const words = new Set(['apple', 'banana', 'grape', 'grapefruit'])
    const minLength = 2
    const maxLength = 4

    const result = getPrefixes(words, minLength, maxLength)

    // The expected prefixes (from the example words with minLength 2 and maxLength 4)
    const expected = new Set([
      'ap',
      'app',
      'appl',
      'ba',
      'bana',
      'ban',
      'gra',
      'grap',
      'gr',
      'gra',
      'grap',
    ])

    expect(result).toEqual(expected)
  })

  it('should return an empty set for an empty input set', () => {
    const words = new Set<string>()
    const minLength = 2
    const maxLength = 4

    const result = getPrefixes(words, minLength, maxLength)

    expect(result).toEqual(new Set())
  })

  it('should handle cases where no prefixes are within the length range', () => {
    const words = new Set(['a', 'b', 'c'])
    const minLength = 3
    const maxLength = 5

    const result = getPrefixes(words, minLength, maxLength)

    expect(result).toEqual(new Set())
  })

  it('should return prefixes for single-word input', () => {
    const words = new Set(['test'])
    const minLength = 2
    const maxLength = 3

    const result = getPrefixes(words, minLength, maxLength)

    expect(result).toEqual(new Set(['te', 'tes']))
  })
})
