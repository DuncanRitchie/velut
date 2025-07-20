import Word from '../../models/Word'
import dbConnect from '../dbConnect'
import { generateRegexForSubwords } from './subwordsHelpers'

export default async function findSubwords(input) {
  const subwordsAsObjects = await findSubwordsAsObjects(input)
  if (subwordsAsObjects.success) {
    const subwordsAsWords = subwordsAsObjects.subwords.map((object) => {
      return object.Word
    })
    return { success: true, subwords: subwordsAsWords }
  } else {
    return subwordsAsObjects
  }
}

export async function findSubwordsAsObjects(input) {
  try {
    await dbConnect()
    const regexForSubwords = generateRegexForSubwords(input)
    const wordsFromMongo = await Word.find({
      Length: { $lte: input.length },
      AlphOrderNoMacra: { $regex: regexForSubwords },
    }).select({ Word: 1, NoMacraLowerCase: 1, NoMacra: 1, Length: 1, _id: 0 })

    const subwordsAsObjects = sortWordObjects(wordsFromMongo)

    return { success: true, subwords: subwordsAsObjects }
  } catch (error) {
    console.error(error)
    return { success: false, error }
  }
}

// findSubwordsFromMongo() returns an array of objects.
// The array of objects from Mongo should be passed in as the second parameter.
// This second parameter must include AlphOrderNoMacra, Word, NoMacra, NoMacraLowerCase, and Length fields.

export const findSubwordsInWordsFromMongo = (input, wordObjects) => {
  // We assume input is already demacronized from the front-end.
  const regex = generateRegexForSubwords(input)
  const filteredWordObjects = wordObjects.filter((word) => {
    return regex.test(word.AlphOrderNoMacra)
  })
  return sortWordObjects(filteredWordObjects)
}

// Parameter must include Word, NoMacra, NoMacraLowerCase, and Length fields.
function sortWordObjects(wordObjects) {
  let sortedWordObjects = [...wordObjects]
  sortedWordObjects = sortedWordObjects.sort((a, b) => {
    if (a.Word.length > b.Word.length) {
      return -1
    } else if (a.Word.length < b.Word.length) {
      return 1
    } else if (a.NoMacraLowerCase < b.NoMacraLowerCase) {
      return -1
    } else if (a.NoMacraLowerCase > b.NoMacraLowerCase) {
      return 1
    } else if (a.NoMacra > b.NoMacra) {
      return 1
    } else if (a.NoMacra < b.NoMacra) {
      return -1
    } else if (a.Word > b.Word) {
      return 1
    } else if (a.Word < b.Word) {
      return -1
    } else {
      return 0
    }
  })
  return sortedWordObjects
}
