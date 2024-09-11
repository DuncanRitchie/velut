import prettyPrintGrammaticalKey from '../../lib/lemmata/grammaticalKeys'

const ParsingsList = ({ lemma, form }) => {
  let { Forms } = lemma

  if (!form) {
    throw new Error('The prop `form` is required for ParsingsList.')
  }
  if (!Forms) {
    throw new Error('The prop `lemma` is required for ParsingsList and must have the `Forms` property.')
  }

  // Recursive function that trawls an object of forms looking for the given form, and returns the sequences of grammatical keys.
  // Example return value:
  // ["ablative singular masculine unencliticized", "nominative singular masculine -ne", "vocative singular masculine -ne"]
  const getParsings = (formsObject, form, accumulatedTags) => {
    return Object.entries(formsObject).flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.includes(form)) {
          return [key, ...accumulatedTags].map(prettyPrintGrammaticalKey).join(' ')
        } else return []
      }
      return getParsings(value, form, [key, ...accumulatedTags])
    })
  }

  // This formats the list with commas but no conjunction, eg
  // “ablative singular masculine unencliticized, nominative singular masculine -ne, vocative singular masculine -ne”
  const listFormatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'unit',
  })

  return (
    <>
      <p>
        Parsings of <strong lang="la">{form}</strong>: {listFormatter.format(getParsings(Forms, form, []))}
      </p>
    </>
  )
}

export default ParsingsList
