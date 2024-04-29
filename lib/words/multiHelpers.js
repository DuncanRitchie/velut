// This file (multiHelpers) is safe to import on the front-end because it does not use Mongoose.

export function splitIntoWords(input) {
  return (
    input
      // If adding characters to the group in the regex, keep the final hyphen at the end so it is interpreted literally.
      .replace(/[^A-Za-zĀāĒēĪīŌōŪūȲȳËëÏïÉáéíóúýÁüṻḗÆæŒœ.:-]+/g, ' ')
      .split(' ')
      .filter((word) => word !== '')
  )
}

/* My velut-dictionary-links site generates links to several Latin websites, based on the "words" parameter in the query-string. */
export function getHrefForDictionaryLinks(wordsToGetLinksFor) {
  const missingWordsAsArray = [...wordsToGetLinksFor]
  const dictionaryLinksQuery = new URLSearchParams([
    ['words', missingWordsAsArray.join(' ')],
    // The words that the Multi-word Look-up page passes into this function are words that are *not* already in velut.
    // If the `dictionaries` param weren’t specified, the default is velut, which wouldn’t make sense here because
    // we know the words are not in velut. So we specify a different dictionary site (Logeion) instead.
    ['dictionaries', 'logeion'],
  ])
  return `https://www.duncanritchie.co.uk/velut-dictionary-links/?${dictionaryLinksQuery}`
}
