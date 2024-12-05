import { getPrefixes } from './prefixes' // Adjust the import path if needed

describe('getPrefixes', () => {
  it('should return correct prefixes up to length n', () => {
    const words = new Set(['apple', 'banana', 'cherry'])
    const n = 3

    const result = getPrefixes(words, n)

    expect(result).toEqual(
      new Set(['a', 'ap', 'app', 'b', 'ba', 'ban', 'c', 'ch', 'che'])
    )
  })

  it('should handle an empty Set', () => {
    const words = new Set<string>()
    const n = 3

    const result = getPrefixes(words, n)

    expect(result).toEqual(new Set())
  })

  it('should handle a Set with one word', () => {
    const words = new Set(['dog'])
    const n = 2

    const result = getPrefixes(words, n)

    expect(result).toEqual(new Set(['d', 'do']))
  })

  it('should handle a Set with words shorter than n', () => {
    const words = new Set(['cat', 'dog'])
    const n = 5

    const result = getPrefixes(words, n)

    expect(result).toEqual(new Set(['c', 'ca', 'cat', 'd', 'do', 'dog']))
  })

  it('should not return duplicates', () => {
    const words = new Set(['cat', 'catalog', 'dog'])
    const n = 4

    const result = getPrefixes(words, n)

    // Ensure there are no duplicates and correct prefixes are returned
    expect(result).toEqual(
      new Set(['c', 'ca', 'cat', 'cat', 'cata', 'd', 'do', 'dog'])
    )
  })
})
