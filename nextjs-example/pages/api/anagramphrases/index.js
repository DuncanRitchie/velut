const flatten = require('flat')
import Word from "../../../models/Word"
import dbConnect from "../../../lib/dbConnect"
import { noMacra } from "../diacritics"
import { findSubwordsInWordsFromMongo } from "../subwords"
import { deleteCharacters } from "../subwords"

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

export default async function findAnagrams(input) {
    try {
        await dbConnect()
        const cleanInput = noMacra(input).toLowerCase().replace(/ /g,"")

        const wordsFromMongo = await Word
            .find({"Length": {"$lte": cleanInput.length}})
		    .select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "Length": 1, "_id": 0})

        const subwords = findSubwordsInWordsFromMongo(input, wordsFromMongo)

        const anagrams = Object.getOwnPropertyNames(
            flatten(
                findAnagramsAsObject(input, subwords), {delimiter: " "}
            )
        )

        return { success: true, anagrams }
    }
    catch (error) {
        console.error(error)
        return { success: false, error: error || null }
    }
}

// Variables used in `memoise`
let subwordsCache = new Map();
let result;

// Memoisation function adapted from https://1loc.dev/#memoize-a-function
// Can be used on any function taking two arguments.
const memoise = (fn, cache = new Map()) => (arg1, arg2) => cache.get([arg1, arg2]) || (result = fn(arg1, arg2), cache.set([arg1, arg2], result), result);

const findSubwordsMemoised = memoise(findSubwordsInWordsFromMongo, subwordsCache);

// This is a recursive function used in the controller for the api/words/anagrams/ route.
// There, the first param is the input string, and the second param is the array
// returned by findSubwordsFromMongo().
// It produces an object, every key of which is a word in a possible anagram.
// The values are either true (if concatenating the keys in the path produces an anagram)
// or an object containing more words as keys recursively.
const findAnagramsAsObject = (input, words) => {
    let anagrams = {}
    // For every subword, an iteration of the for-loop runs.
    for (let i = 0; i < words.length; i++) {
        // If there are no letters remaining after the subword is deleted from the input,
        // we add the word to 'anagrams' as a key with the value true.
        const remaining = deleteCharacters(input,words[i].NoMacra)
        if (remaining.length === 0) {
            anagrams[words[i].Word] = true
        }
        // But if there are letters remaining, we recurse.
        else {
            const subwords = findSubwordsMemoised(remaining, words)
            // subwords is an array.
            if (subwords && subwords.length) {
                const subanagrams = findAnagramsAsObject(remaining, subwords)
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
