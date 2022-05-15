const { Worker } = require('worker_threads');
import Word from "../../models/Word"
import dbConnect from "../dbConnect"
import { noMacra } from "./diacritics"
import { findSubwordsInWordsFromMongo, generateRegexForSubwords, sortStringAlphabetically } from "./subwords"
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
// let subwordsCache = new Map();
// let result;
// Memoisation function adapted from https://1loc.dev/#memoize-a-function
// Can be used on any function taking two arguments.
// const memoise = (fn, cache = new Map()) => (arg1, arg2) => cache.get([arg1, arg2]) || (result = fn(arg1, arg2), cache.set([arg1, arg2], result), result);

// const findSubwordsInWordsFromMongoMemoised = memoise(findSubwordsInWordsFromMongo, subwordsCache);


export default async function findAnagramsThreaded(input) {
    try {
        return await findAnagrams(input);
    } catch (error) {
        return {
            success: false,
            error: error,
            anagrams: [],
        }
    }
}

export async function findAnagrams(input) {
    try {
        await dbConnect()
        const cleanInput = noMacra(input).toLowerCase().replace(/[^a-z]/g,"")

        if (cleanInput.length > ANAGRAM_CHAR_LIMIT) {
            return {
                success: false,
                error: `Input is too long. Please enter ${ANAGRAM_CHAR_LIMIT} or fewer letters.`,
                anagrams: [],
            }
        }

        const regexForSubwords = generateRegexForSubwords(cleanInput);
        const wordsFromMongo = await Word
            .find({"Length": {"$lte": input.length}, "AlphOrderNoMacra": {"$regex": regexForSubwords}})
		    .select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "AlphOrderNoMacra": 1, "Length": 1, "_id": 0})

        const subwords = findSubwordsInWordsFromMongo(cleanInput, wordsFromMongo)


        const inputInAlphOrder = sortStringAlphabetically(cleanInput)


        const output = await runOnThread(inputInAlphOrder, subwords);

        return output;
    }
    catch (error) {
        console.error(error)
        return {
            success: false,
            error,
            anagrams: [],
        }
    }
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

// Worker thread code below.

let results = {
    success: false,
    error: 'Anagrams array was not set in back-end',
    anagrams: [],
};

function runOnThread(inputInAlphOrder, subwords) {
    let canRun = true;

    function startThread() {
        return new Promise((resolve) => {
            // Full path is needed inside a Worker.
            const worker = new Worker('./lib/words/threaded/thread-entry.js', {
                // `subwords` appears to be an array of word objects (as it should be) before it goes into `workerData`, but if I don’t do the `map` below it becomes an array of horrible MongoDB query objects inside `workerData`!
                workerData: {
                    inputInAlphOrder,
                    subwords: subwords.map(obj=>obj._doc || obj),
                },
            });
            worker.on('message', (value) => {
                results = value;
            })
            worker.on('exit', () => {
                resolve();
            });
        })
    }
    const resultsFromThread = startThread().then(() => {
        canRun = false;
        return results;
    });

    function loop() {
        setTimeout(() => {
            if (canRun) {
                loop();
            }
        }, 1000)
    }
    loop();

    return resultsFromThread;
}
