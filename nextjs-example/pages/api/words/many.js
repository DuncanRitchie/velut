import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'
import findOneWordSelectSeveralFields from './word'

export default async function findManyWords(searchWordsAsString) {
	console.log(`Calling findManyWords on ${searchWordsAsString}...`)

    const searchWords = searchWordsAsString.split(" ")

    const distinctWords = [...new Set(searchWords)]

    const returnedWords = distinctWords
    // const allWords = await searchWords.map(searchWord => {
    //     return findOneWordSelectSeveralFields(searchWord)
    // })

    console.log(returnedWords)

    const foundWords = returnedWords.filter(Boolean)

    const missingWords = returnedWords.filter(word => !word)
    return {
        success: true,
        error: null,
        searchWords,
        distinctWords,
        foundWords,
        missingWords,
    }
}
