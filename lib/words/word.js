import dbConnect from '../dbConnect'
import Word from '../../models/Word'
import { hyphensToMacra, noMacra } from './diacritics'
import expandPraenomen from './praenomina'

const selectionForOneWord = {
  Word: 1,
  NoMacra: 1,
  NoMacraLowerCase: 1,
  PerfectRhyme: 1,
  AlphOrderNoMacra: 1,
  LemmaArray: 1,
  Scansion: 1,
  EcclesPerfectRhyme: 1,
  RhymeVowels: 1,
  RhymeVowelsAndUltimaCoda: 1,
  EcclesRhymeVowels: 1,
  EcclesRhymeVowelsAndUltimaCoda: 1,
  AllConsonants: 1,
  _id: 0,
}

//// w is interpreted as v if it’s preceding a vowel but not succeeding a consonant.
//// (In other positions, w is interpreted as u — next to a consonant or at word-end.)
const anyConsonant = '[BbCcDdFfGgHhKkLlMmNnPpQqRrSsTtVvWwXxZz]'
const regexWMeaningVUpperCase = RegExp(
  `(?<!${anyConsonant})W(?!${anyConsonant})(?=.)`,
  'g',
)
const regexWMeaningVLowerCase = RegExp(
  `(?<!${anyConsonant})w(?!${anyConsonant})(?=.)`,
  'g',
)

const findOneWord = async function (searchWord, selection) {
  await dbConnect()

  //// Hyphens etc are handled in `hyphensToMacra`, but ligatures & J/W aren’t.
  const normalisedSpelling = searchWord
    .replaceAll('Æ', 'Ae')
    .replaceAll('æ', 'ae')
    .replaceAll('Œ', 'Oe')
    .replaceAll('œ', 'oe')
    .replaceAll('J', 'I')
    .replaceAll('j', 'i')
    .replace(regexWMeaningVUpperCase, 'V')
    .replace(regexWMeaningVLowerCase, 'v')
    .replaceAll('W', 'U')
    .replaceAll('w', 'u')

  //// Handle praenominal abbreviations, eg Q. -> Quīntus
  //// (If the word is not an abbreviation, this has no effect.)
  const normalisedWord = expandPraenomen(normalisedSpelling)

  //// Possible queries, wrapped in functions so that `noMacra(searchWord)` etc will not be evaluated unless needed for a query.
  const funcsReturningQueries = [
    (searchWord) => {
      return { Word: hyphensToMacra(searchWord) }
    },
    (searchWord) => {
      return { NoMacra: noMacra(searchWord) }
    },
    (searchWord) => {
      return { NoMacraLowerCase: noMacra(searchWord).toLowerCase() }
    },
  ]
  //// Recursive local function to generate and execute each query until a word is found.
  const executeQuery = async (indexOfQuery) => {
    try {
      const foundWord = await Word.findOne(
        funcsReturningQueries[indexOfQuery](normalisedWord),
      )
        .select(selection)
        .exec()
      //// If the current query found a word, send the data to the front-end.
      if (foundWord) {
        return { word: foundWord, success: true, search: normalisedWord }
      }
      //// If there are no more possible queries, send `null`.
      else if (indexOfQuery == funcsReturningQueries.length - 1) {
        return { word: null, success: false, search: normalisedWord }
      }
      //// Otherwise, recurse to try the next query.
      else {
        return executeQuery(indexOfQuery + 1)
      }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        error: err,
        word: null,
        search: searchWord,
        normalisedWord,
      }
    }
  }
  //// Launch the recursive function, starting with the first query.
  return executeQuery(0)
}

const findOneWordSelectSeveralFields = async function (searchWord) {
  return await findOneWord(searchWord, selectionForOneWord)
}

export default findOneWordSelectSeveralFields

export async function findOneWordSelectOnlyWord(searchWord) {
  return await findOneWord(searchWord, { Word: 1, _id: 0 })
}
