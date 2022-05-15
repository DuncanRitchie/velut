import { findOneWordSelectOnlyWord } from './word'

export function splitIntoWords(input) {
    return input
        .replace(/[^A-Za-zĀāĒēĪīŌōŪūȲȳËëÏïÉáéíóúýÁüṻḗ.:-]+/g, " ")
        .split(" ")
        .filter(word=>word!=="");
}

/* My velut-dictionary-links site generates links to several Latin websites, based on the "words" parameter in the query-string. */
export function getHrefForDictionaryLinks(wordsToGetLinksFor) {
    const missingWordsAsArray = [...wordsToGetLinksFor];
    const dictionaryLinksQuery = new URLSearchParams([["words", missingWordsAsArray.join(" ")]]);
    return `https://www.duncanritchie.co.uk/velut-dictionary-links/?${dictionaryLinksQuery}`;
}

export default async function findManyWords(searchWordsAsString) {
    const searchWords = splitIntoWords(searchWordsAsString)

    const distinctWords = [...new Set(searchWords)]

    const promises = distinctWords.map(word => {
        return findOneWordSelectOnlyWord(word)
    })

    return await Promise.allSettled(promises).
        then((results) => {

            const allDistinctWordObjects = results
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
            const allWordObjects = searchWords
                .map(searchWord => {
                    //// Creating a new object means we can have duplicates
                    //// without referencing the same object twice.
                    //// This makes it easier to serialise to Json.
                    return {...allDistinctWordObjects.find(wordObject => wordObject.search === searchWord)}
                })

            return {
                success: true,
                error: null,
                allWordObjects,
                allDistinctWordObjects,
            }
        });
}
