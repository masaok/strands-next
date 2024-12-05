export function getPrefixes(
  words: Set<string>,
  minLength: number,
  maxLength: number
): Set<string> {
  const prefixes = new Set<string>()

  words.forEach(word => {
    for (let length = minLength; length <= maxLength; length++) {
      const prefix = word.slice(0, length).toLowerCase()

      if (prefix.length >= minLength && prefix.length <= maxLength)
        prefixes.add(prefix)
    }
  })

  return prefixes
}
