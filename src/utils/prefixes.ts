export const getPrefixes = (words: Set<string>, n: number): Set<string> => {
  const prefixes = new Set<string>()

  words.forEach(word => {
    for (let i = 1; i <= n && i <= word.length; i++) {
      prefixes.add(word.substring(0, i))
    }
  })

  return prefixes
}
