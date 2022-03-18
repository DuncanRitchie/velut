const flatten = require('flat')
import Word from "../../models/Word"
import dbConnect from "../dbConnect"
import { noMacra } from "./diacritics"
import { findSubwordsInWordsFromMongo, deleteCharactersOptimised, generateRegexForSubwords, sortStringAlphabetically } from "./subwords"
const ANAGRAM_CHAR_LIMIT = 12;

//// Old controller from MERN app:
// const findAnagrams = function(req,res) {
// 	let input = req.query.input
// 	Word.find({"Length": {"$lte": input.length}})
// 		.select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "Length": 1, "_id": 0})
// 		.then(words=>{
// 			return sortedSubwords = findSubwordsFromMongo(input,words)
// 		})
// 		.then(subwords => {
// 			try {
// 				anagrams = Object.getOwnPropertyNames(flatten(findAnagramsAsObject(input,subwords),{delimiter: " "}))
// 				return anagrams
// 			} catch {
// 				return ["Internal server error"]
// 			}})
// 			.then(anagrams=>{res.json(anagrams)})
// }

// Variables used in `memoise`
let subwordsCache = new Map();
let anagramsCache = new Map();
let result;

// Memoisation function adapted from https://1loc.dev/#memoize-a-function
// Can be used on any function taking two arguments.
const memoise = (fn, cache = new Map()) => (arg1, arg2) => cache.get([arg1, arg2]) || (result = fn(arg1, arg2), cache.set([arg1, arg2], result), result);

const findSubwordsInWordsFromMongoMemoised = memoise(findSubwordsInWordsFromMongo, subwordsCache);

const findAnagramsAsObjectMemoised = memoise(findAnagramsAsObject, anagramsCache);

export default async function findAnagrams(input) {
    try {
        await dbConnect()
        const cleanInput = noMacra(input).toLowerCase().replace(/[^a-z]/g,"")

        if (cleanInput.length > ANAGRAM_CHAR_LIMIT) {
            return {
                success: false,
                error: `Input is too long. Please enter ${ANAGRAM_CHAR_LIMIT} or fewer letters.`,
                anagrams: null,
            }
        }

        const regexForSubwords = generateRegexForSubwords(cleanInput);
        const wordsFromMongo = await Word
            .find({"Length": {"$lte": input.length}, "AlphOrderNoMacra": {"$regex": regexForSubwords}})
		    .select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "AlphOrderNoMacra": 1, "Length": 1, "_id": 0})

        const subwords = findSubwordsInWordsFromMongoMemoised(cleanInput, wordsFromMongo)

        const inputInAlphOrder = sortStringAlphabetically(cleanInput)

        const anagrams = Object.getOwnPropertyNames(
            flatten(
                findAnagramsAsObjectMemoised(inputInAlphOrder, subwords), {delimiter: " "}
            )
        )
        return {
            success: true,
            error: null,
            anagrams,
         }
    }
    catch (error) {
        console.error(error)
        return {
            success: false,
            error,
            anagrams: null,
        }
    }
}

// This is a recursive function used in the controller for the lib/words/anagrams/ route.
// There, the first param is the input string, and the second param is the array
// returned by findSubwordsFromMongo().
// It produces an object, every key of which is a word in a possible anagram.
// The values are either true (if concatenating the keys in the path produces an anagram)
// or an object containing more words as keys recursively.
function findAnagramsAsObject (input, words) {
    let anagrams = {}
    // For every subword, an iteration of the for-loop runs.
    for (let i = 0; i < words.length; i++) {
        // If there are no letters remaining after the subword is deleted from the input,
        // we add the word to 'anagrams' as a key with the value true.
        const remaining = deleteCharactersOptimised(input,words[i].AlphOrderNoMacra)
        if (remaining === '') {
            anagrams[words[i].Word] = true
        }
        // But if there are letters remaining, we recurse.
        else {
            const subwords = findSubwordsInWordsFromMongo(remaining, words)
            // subwords is an array.
            if (subwords && subwords.length) {
                const subanagrams = findAnagramsAsObjectMemoised(remaining, subwords)
                // subanagrams is an object.
                // We only add 'subanagrams' into 'anagrams' if it is not empty.
                if (subanagrams && Object.keys(subanagrams).length) {
                    anagrams[words[i].Word] = subanagrams
                }
            }
        }
    }
    return anagrams
}

// The result with the input 'feels' is: { 
                                    //     'fēlēs': true,
                                    //     'flēs': {
                                    //         'ē': true
                                    //     },
                                    //     'fel': {
                                    //         'ēs': true,
                                    //         'es': true,
                                    //         'sē': true
                                    //     },
                                    //     'flē': {
                                    //         'ēs': true,
                                    //         'es': true,
                                    //         'sē': true
                                    //     },
                                    //     'es': {
                                    //         'fel': true,
                                    //         'flē': true
                                    //     },
                                    //     'ēs': {
                                    //         'fel': true,
                                    //         'flē': true
                                    //     },
                                    //     'sē': {
                                    //         'fel': true,
                                    //         'flē': true
                                    //     },
                                    //     'ē': {
                                    //         'flēs': true
                                    //     }
                                    //   }

// The controller flattens the result (with a space as delimiter), 
// then passes it into Object.getOwnPropertyNames()
// so what’s passed to the getServerSideProps is ['fēlēs','flēs ē','fel ēs','fel es','fel sē', …]
