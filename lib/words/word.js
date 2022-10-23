import dbConnect from '../dbConnect'
import Word from '../../models/Word'
import { hyphensToMacra, noMacra } from './diacritics'

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

const findOneWord = async function (searchWord, selection) {
  await dbConnect()

  //// Hyphens etc are handled in `hyphensToMacra`, but ligatures aren’t.
  const normalisedWord = searchWord
    .replaceAll('Æ', 'Ae')
    .replaceAll('æ', 'ae')
    .replaceAll('Œ', 'Oe')
    .replaceAll('œ', 'oe')

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
