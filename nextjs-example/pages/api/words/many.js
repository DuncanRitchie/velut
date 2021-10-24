import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'
import { findOneWordSelectOnlyWord } from './word'

export default async function findManyWords(searchWordsAsString) {
	console.log(`Calling findManyWords on ${searchWordsAsString}...`)

    const searchWords = searchWordsAsString.split(" ")

    const distinctWords = [...new Set(searchWords)]
    const promises = distinctWords.map(word => {
        return findOneWordSelectOnlyWord(word)
    })

    const allSettled = await Promise.allSettled(promises).
        then((results) => {
            const foundWords = results
                .filter(result => result.status === "fulfilled" && result.value.success)
                .map(result => result.value.word.toObject().Word)
            const missingWords = results
                .filter(result => result.status !== "fulfilled" || !result.value.success)
                .map(result => result.value.search)

            return {
                success: true,
                error: null,
                searchWords,
                distinctWords,
                foundWords,
                missingWords,
            }
        });

    return allSettled
}
