import prettyPrintGrammaticalKey from '../../lib/lemmata/grammaticalKeys'
import { getLemmaId } from '../lemma/Lemma'
import superscriptLemmaTag from '../lemma/superscriptLemmaTag'
import styles from './ParsingsList.module.css'
import { Fragment } from 'react/jsx-runtime'

const ParsingsList = ({ lemmata, form }) => {
  if (!form) {
    throw new Error('The prop `form` is required for ParsingsList.')
  }
  if (!lemmata) {
    throw new Error('The prop `lemmata` is required for ParsingsList.')
  }

  // Recursive function that trawls an object of forms looking for the given form, and returns the sequences of grammatical keys.
  // Example return value:
  // ["ablative singular masculine unencliticized", "nominative singular masculine -ne", "vocative singular masculine -ne"]
  const getParsings = (formsObject, form, accumulatedTags) => {
    if (!formsObject) {
      return ['']
    }
    return Object.entries(formsObject).flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.includes(form)) {
          return [key, ...accumulatedTags].map(prettyPrintGrammaticalKey).join(' ')
        } else return []
      }
      return getParsings(value, form, [key, ...accumulatedTags])
    })
  }

  // The parsing should look like "nominative singular neuter noun, with -ne" or "nominative singular neuter noun" if the word is unencliticized.
  // Including the part of speech is particularly useful for prepositions, conjunctions, and interjections, which might not have grammatical tags otherwise.
  const prettyPrintParsing = (parsing, partOfSpeech) => {
    return (
      parsing
        .split(' ')
        // Insert the part of speech before the last tag (which is either the enclitic or "unencliticized")
        .toSpliced(-1, 0, partOfSpeech.toLowerCase())
        .filter((tag) => tag !== 'unencliticized')
        .map((tag) => {
          if (tag.startsWith('-')) {
            return (
              <Fragment key={tag}>
                , with <span lang="la">{tag}</span>
              </Fragment>
            )
          }
          return <Fragment key={tag}> {tag}</Fragment>
        })
    )
  }

  const parsingsJsx = lemmata.map((lemma) =>
    getParsings(lemma.Forms, form, []).map((parsing) => (
      <tr key={parsing}>
        <td>
          <a href={'#' + getLemmaId(lemma)}>{superscriptLemmaTag(lemma.Lemma)}</a>
        </td>
        <td>{prettyPrintParsing(parsing, lemma.PartOfSpeech)}</td>
      </tr>
    )),
  )

  return (
    <table className={styles.parsingsList}>
      <thead>
        <tr>
          <th>Lemma</th>
          <th>Parsing</th>
        </tr>
      </thead>
      <tbody>{parsingsJsx}</tbody>
    </table>
  )
}

export default ParsingsList
