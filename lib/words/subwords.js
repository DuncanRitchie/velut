import objectToArray from '../../data/data-functions/objectToArray'
import letterCountsJson from '../../data/letterCounts.json'
import Word from '../../models/Word'
import dbConnect from '../dbConnect'

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

// deleteCharacters takes two strings as parameters.
// It removes every character (case-insensitive) in the second parameter from the first parameter,
// eg, deleteCharacters("Duncanus","nunc") = "Daus"
// eg, deleteCharacters("Rīchardus","hinc") = "Rīardus"
// eg, deleteCharacters("Richardus","hinc") = "Rardus"

export function deleteCharacters(superword, subword) {
  let string = superword.toLowerCase()
  subword = subword.toLowerCase()
  const chars = subword.split('')
  for (let i = 0; i < subword.length; i++) {
    string = string.replace(chars[i], '')
  }
  return string
}

// deleteCharactersOptimised takes two strings as parameters.
// Both strings need to have their letters lower-case, without diacritics, and in alphabetical order, with no other characters.
// This function returns null if there are letters in the subword that are not in the superword.
// eg, deleteCharactersOptimised("acdnnsuu","cnnu") = "adsu"
// eg, deleteCharactersOptimised("acdhirrsu","chi") = "adrrsu"
// eg, deleteCharactersOptimised("ailnstu","ailnstu") = ""
// eg, deleteCharactersOptimised("acdnnsuu","chin") = null
export function deleteCharactersOptimised(
  superwordAlphOrder,
  subwordAlphOrder,
) {
  const superwordChars = superwordAlphOrder.split('')
  const subwordChars = subwordAlphOrder.split('')
  let remainingChars = ''
  let indexInSubword = 0
  let indexInSuperword = 0

  // Walk through the letters of subword and superword.
  // If the letter in subword matches the letter in superword, we move onto the next letter in both words because we have found that letter in superword.
  // If the letter in subword is later alphabetically than the letter in the superword, we move onto the next letter in superword but stay with the letter in subword.
  // If the letter in subword is earlier alphabetically than the letter in the superword, this means the letter in subword was not in the superword, so we abort the function, returning null.
  // This works because the letters are arranged alphabetically, so when we find a letter in subword that is later alphabetically than the letter in the superword, we know we’ve gone too far and are not going to find the subword letter in the superword.
  while (
    indexInSuperword < superwordAlphOrder.length &&
    indexInSubword < subwordAlphOrder.length
  ) {
    let currentSubwordChar = subwordChars[indexInSubword]
    let currentSuperwordChar = superwordChars[indexInSuperword]

    if (currentSuperwordChar > currentSubwordChar) {
      return null
    }
    if (currentSuperwordChar === currentSubwordChar) {
      indexInSubword++
    } else {
      remainingChars += currentSuperwordChar
    }
    indexInSuperword++
  }
  // If we have gone through all the letters of superword and there are letters left in subword.
  if (
    indexInSuperword === superwordAlphOrder.length &&
    indexInSubword < subwordAlphOrder.length
  ) {
    return null
  }
  // If we have gone through all the letters in subword and there are letters left in superword.
  while (indexInSuperword < superwordAlphOrder.length) {
    remainingChars += superwordChars[indexInSuperword]
    indexInSuperword++
  }

  return remainingChars
}

// export function testDeletCharactersOptimised() {
//     console.log(deleteCharactersOptimised('abc', 'abc') === '')
//     console.log(deleteCharactersOptimised('abcf', 'abc') === 'f')
//     console.log(deleteCharactersOptimised('abf', 'abc') === null)
//     console.log(deleteCharactersOptimised('abc', 'abf') === null)
//     console.log(deleteCharactersOptimised('abc', 'ab') === 'c')
//     console.log(deleteCharactersOptimised('abc', 'bf') === null)
//     console.log(deleteCharactersOptimised('abc', 'c') === 'ab')
//     console.log(deleteCharactersOptimised('ailnt', 'aintu') === null)
//     console.log(deleteCharactersOptimised('ailnt', 'inty') === null)
// }

export function sortStringAlphabetically(input) {
  return input
    .split('')
    .sort((a, b) => {
      return (a > b) - 0.5
    })
    .join('')
}

// eg, "duncan" => /^a?c?d?n?n?u?$/
export function generateRegexForSubwords(superword) {
  const wordInAlphOrder = sortStringAlphabetically(superword)
  let pattern = '^'
  for (let i = 0; i < wordInAlphOrder.length; i++) {
    pattern += wordInAlphOrder[i]
    pattern += '?'
  }
  pattern += '$'
  return new RegExp(pattern)
}

// getWeightedLetters() = {vowels: ["o","o","o","o","o","o","o","u","u","u","u", … ],
//                         consonants: ["k","y","y","q","q","q","x","x","x","x", … ]}
// Ie, it’s an object with two keys, each referring to an array of letters.
// The least frequent letter appears once, the second least frequent twice, etc.
// This is the function that the Subwords page uses to generate random Subwords strings.

const getWeightedLetters = () => {
  let weightedVowels = []
  let weightedConsonants = []
  let letterCountsArray = objectToArray(letterCountsJson).reverse()
  for (let i = 0; i < letterCountsArray.length; i++) {
    let currentLetter = letterCountsArray[i][0]
    for (let j = 0; j < i; j++) {
      if (
        currentLetter === 'a' ||
        currentLetter === 'e' ||
        currentLetter === 'i' ||
        currentLetter === 'o' ||
        currentLetter === 'u'
      ) {
        weightedVowels.push(currentLetter)
      } else {
        weightedConsonants.push(currentLetter)
      }
    }
  }
  return { vowels: weightedVowels, consonants: weightedConsonants }
}

// Returns a string of nine letters, such as "lpuiqopno".
// Letters are more likely to appear if they are
// more frequent according to letterCounts.json.

export function randomCountdownQuestionWeighted() {
  // getWeightedLetters returns an object containing an array of vowels and an array of consonants,
  // repeated according to how frequently the letters appear in words.
  let weightedLetters = getWeightedLetters()
  const weightedVowels = weightedLetters.vowels
  const weightedConsonants = weightedLetters.consonants
  // The total length of the return is 9.
  const length = 9
  // The number of vowels is either 4 or 5.
  const numberOfVowels = 4 + Math.floor(Math.random() * 2)
  // Start with a blank array.
  let letterArray = []
  // Add the vowels.
  for (let i = 0; i < numberOfVowels; i++) {
    let randomNumber = Math.floor(Math.random() * weightedVowels.length)
    let randomVowel = weightedVowels[randomNumber]
    letterArray.push(randomVowel)
  }
  // Add the consonants.
  const numberOfConsonants = length - numberOfVowels
  for (let i = 0; i < numberOfConsonants; i++) {
    let randomNumber = Math.floor(Math.random() * weightedConsonants.length)
    let randomConsonant = weightedConsonants[randomNumber]
    letterArray.push(randomConsonant)
  }
  // Sort randomly.
  const sortedLetterArray = letterArray.sort(() => {
    return Math.random() - 0.5
  })
  // Return the letters joined into a string.
  return sortedLetterArray.join('')
}
