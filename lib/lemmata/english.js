import { getLemmata } from '.'

export default async function english(input) {
  // Because this controller uses regex, we escape characters that have
  // special meanings in regex. This escaping function is taken from MDN:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  const escapedInput = input.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')

  if (!escapedInput) {
    return { success: false, error: 'Please provide a valid query.' }
  }

  // Regex used here only to match lemmata where `escapedInput` is a substring of Meanings.
  const query = {
    Meanings: {
      $regex: escapedInput,
      $options: 'i',
    },
  }
  const sort = getSortFunction(escapedInput)
  const limit = 100

  return getLemmata(query, sort, limit)
}

//// Returns a sort function that will sort an array of lemmata to
//// prioritise the closest matches for `queryWord` in the Meanings field.
//// The returned function can then be passed into the `array.sort` method.
const getSortFunction = (queryWord) => {
  //// Local helper function to use within the sort function.
  const lemmaHasTheQueriedMeaning = (lemma) => {
    const meaningsArray = lemma.Meanings.split('; ')
    for (let i = 0; i < meaningsArray.length; i++) {
      if (meaningsArray[i].toLowerCase() === queryWord.toLowerCase()) {
        return true
      }
    }
    return false
  }

  return (a, b) => {
    // A lemma with the query as an entire meaning gets prioritised.
    // Eg, homō “man; person…” precedes adulēscentulus “young man” if the query is “man”.
    const aHasTheQueriedMeaning = lemmaHasTheQueriedMeaning(a)
    const bHasTheQueriedMeaning = lemmaHasTheQueriedMeaning(b)
    if (aHasTheQueriedMeaning && !bHasTheQueriedMeaning) {
      return -1
    } else if (!aHasTheQueriedMeaning && bHasTheQueriedMeaning) {
      return 1
    }

    // A lemma with Meanings containing query as an entire word gets prioritised.
    // Eg, Oriēns “the East” precedes belua “beast” if query is “east”.
    const regex = RegExp('[\\b\\s\\W\\A ]' + queryWord + '[\\b\\s\\W\\Z ]', 'i')
    const aContainsWholeWord = regex.test(' ' + a.Meanings + ' ')
    const bContainsWholeWord = regex.test(' ' + b.Meanings + ' ')
    if (aContainsWholeWord && !bContainsWholeWord) {
      return -1
    } else if (!aContainsWholeWord && bContainsWholeWord) {
      return 1
    }

    // A lemma with shorter Meanings gets prioritised.
    // Eg, Thalīa “muse of comedy” (14 chars) precedes Ūrania “muse of astronomy” (17 chars) if query is “muse”.
    else if (a.Meanings.length !== b.Meanings.length) {
      return a.Meanings.length - b.Meanings.length
    }

    // No comparison is made between lemmata with identical Meanings.
    // Eg, cattus “cat” may precede or succeed fēlēs “cat” regardless of the query.
    else if (a.Meanings === b.Meanings) {
      return 0
    }

    // A lemma with Meanings alphabetically earlier gets prioritised.
    // Eg, pausa “cessation” precedes fōrmātiō “formation” (unless the query is “formation”).
    else if (a.Meanings < b.Meanings) {
      return -1
    } else {
      return 1
    }
  }
}
