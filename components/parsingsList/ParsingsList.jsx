import prettyPrintGrammaticalKey from '../../lib/lemmata/grammaticalKeys'
import { getLemmaId } from '../lemma/Lemma'
import superscriptLemmaTag from '../lemma/superscriptLemmaTag'
import styles from './ParsingsList.module.css'

const ParsingsList = ({ lemmata, form }) => {
  if (!form) {
    throw new Error('The prop `form` is required for ParsingsList.')
  }
  if (!lemmata) {
    throw new Error('The prop `lemmata` is required for ParsingsList.')
  }
  const formsObjects = lemmata.map((lemma) => lemma.Forms)
  if (formsObjects.includes(null)) {
    throw new Error('The prop `lemmata` on ParsingsList must have the `Forms` property in all its objects.')
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

  const parsingsJsx = lemmata.map((lemma) =>
    getParsings(lemma.Forms, form, []).map((parsing) => (
      <tr key={parsing}>
        <td>
          <a href={'#' + getLemmaId(lemma)}>{superscriptLemmaTag(lemma.Lemma)}</a>
        </td>
        <td>{parsing}</td>
      </tr>
    )),
  )

  return (
    <details className={styles.parsingsList}>
      <summary>Parsings</summary>
      <table>
        <thead>
          <tr>
            <th>Lemma</th>
            <th>Parsing</th>
          </tr>
        </thead>
        <tbody>{parsingsJsx}</tbody>
      </table>
    </details>
  )
}

export default ParsingsList
