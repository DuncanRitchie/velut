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

            const allDistinctWords = results
                .map(result => {
                    if (result.status === "fulfilled" && result.value.success) {
                        return {
                            success: true,
                            word: result.value.word.toObject().Word,
                            search: result.value.search,
                        }
                    }
                    else {
                        return {
                            success: false,
                            word: null,
                            search: result.value.search,
                        }
                    }
                })
            const allWords = searchWords
                .map(searchWord => {
                    //// Creating a new object means we can have duplicates
                    //// without referencing the same object twice.
                    //// This makes it easier to serialise to Json.
                    return {...allDistinctWords.find(word => word.search === searchWord)}
                })

            return {
                success: true,
                error: null,
                allWords,
                allDistinctWords,
            }
        });

    return allSettled
}
