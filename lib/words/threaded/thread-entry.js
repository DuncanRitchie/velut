const { parentPort, workerData } = require('worker_threads');
const flatten = require('flat');

// This is a recursive function used in the controller in lib/words/anagramphrases.
// There, the first param is the input string, and the second param is the array
// returned by findSubwordsFromMongo().
// It produces an object, every key of which is a word in a possible anagram.
// The values are either true (if concatenating the keys in the path produces an anagram)
// or an object containing more words as keys recursively.
function findAnagrams(inputInAlphOrder, subwords) {
    try {
        return Object.getOwnPropertyNames(
            flatten(
                findAnagramsAsObject(inputInAlphOrder, subwords), {delimiter: " "}
            )
        )
    } catch (error) {
        return new Promise([error.toString()]);
    }
}
// let anagramsCache = new Map();
// let result;

// Memoisation function adapted from https://1loc.dev/#memoize-a-function
// Can be used on any function taking two arguments.
// const memoise = (fn, cache = new Map()) => (arg1, arg2) => cache.get([arg1, arg2]) || (result = fn(arg1, arg2), cache.set([arg1, arg2], result), result);

// const findAnagramsAsObjectMemoised = memoise(findAnagramsAsObject, anagramsCache);

function findAnagramsAsObject(input, words) {
    let anagrams = {}
    // For every subword, an iteration of the for-loop runs.
    for (let i = 0; i < words.length; i++) {
        // If there are no letters remaining after the subword is deleted from the input,
        // we add the word to 'anagrams' as a key with the value true.
        const remaining = deleteCharactersOptimised(input, words[i].AlphOrderNoMacra)
        if (remaining === '') {
            anagrams[words[i].Word] = true
        }
        // But if there are letters remaining, we recurse.
        else {
            const subwords = findSubwordsInWordsFromMongo(remaining, words)
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

// deleteCharactersOptimised takes two strings as parameters.
// Both strings need to have their letters lower-case, without diacritics, and in alphabetical order, with no other characters.
// This function returns null if there are letters in the subword that are not in the superword.
// e.g. deleteCharactersOptimised("acdnnsuu","cnnu") = "adsu"
// e.g. deleteCharactersOptimised("acdhirrsu","chi") = "adrrsu"
// e.g. deleteCharactersOptimised("ailnstu","ailnstu") = ""
// e.g. deleteCharactersOptimised("acdnnsuu","chin") = null
function deleteCharactersOptimised(superwordAlphOrder, subwordAlphOrder) {
    const superwordChars = superwordAlphOrder.split("");
    const subwordChars = subwordAlphOrder.split("");
    let remainingChars = "";
    let indexInSubword = 0;
    let indexInSuperword = 0;

    // Walk through the letters of subword and superword.
    // If the letter in subword matches the letter in superword, we move onto the next letter in both words because we have found that letter in superword.
    // If the letter in subword is later alphabetically than the letter in the superword, we move onto the next letter in superword but stay with the letter in subword.
    // If the letter in subword is earlier alphabetically than the letter in the superword, this means the letter in subword was not in the superword, so we abort the function, returning null.
    // This works because the letters are arranged alphabetically, so when we find a letter in subword that is later alphabetically than the letter in the superword, we know we’ve gone too far and are not going to find the subword letter in the superword.
    while (indexInSuperword < superwordAlphOrder.length
        && indexInSubword < subwordAlphOrder.length) {
            let currentSubwordChar = subwordChars[indexInSubword]
            let currentSuperwordChar = superwordChars[indexInSuperword]

            if (currentSuperwordChar > currentSubwordChar) {
                return null;
            }
            if (currentSuperwordChar === currentSubwordChar) {
                indexInSubword++;
            }
            else {
                remainingChars += currentSuperwordChar
            }
            indexInSuperword++;
    }
    // If we have gone through all the letters of superword and there are letters left in subword.
    if (indexInSuperword === superwordAlphOrder.length
        && indexInSubword < subwordAlphOrder.length) {
        return null
    }
    // If we have gone through all the letters in subword and there are letters left in superword.
    while (indexInSuperword < superwordAlphOrder.length) {
        remainingChars += superwordChars[indexInSuperword];
        indexInSuperword++;
    }

    return remainingChars
}
// findSubwordsFromMongo() returns an array of objects.
// The array of objects from Mongo should be passed in as the second parameter.
// This second parameter must include AlphOrderNoMacra, Word, NoMacra, NoMacraLowerCase, and Length fields.

function findSubwordsInWordsFromMongo(input, wordObjects) {
    // We assume input is already demacronized from the front-end.
    const regex = generateRegexForSubwords(input)
    const filteredWordObjects = wordObjects.filter(word => {
        return regex.test(word.AlphOrderNoMacra)
    })
    return sortWordObjects(filteredWordObjects)
}

// Parameter must include Word, NoMacra, NoMacraLowerCase, and Length fields.
function sortWordObjects(wordObjects) {
    let sortedWordObjects = [...wordObjects]
    sortedWordObjects = sortedWordObjects.sort((a,b)=>{
        if (a.Word.length > b.Word.length) {
            return -1
        }
        else if (a.Word.length < b.Word.length) {
            return 1
        }
        else if (a.NoMacraLowerCase < b.NoMacraLowerCase) {
            return -1
        }
        else if (a.NoMacraLowerCase > b.NoMacraLowerCase) {
            return 1
        }
        else if (a.NoMacra > b.NoMacra) {
            return 1
        }
        else if (a.NoMacra < b.NoMacra) {
            return -1
        }
        else if (a.Word > b.Word) {
            return 1
        }
        else if (a.Word < b.Word) {
            return -1
        }
        else {
            return 0
        }
    })
    return sortedWordObjects
}

function sortStringAlphabetically(input) {
    return input.split("").sort((a,b)=>{return (a>b) - 0.5}).join("")
}

// eg "duncan" => /^a?c?d?n?n?u?$/
function generateRegexForSubwords(superword) {
    const wordInAlphOrder = sortStringAlphabetically(superword)
    let pattern = "^"
    for (let i = 0; i < wordInAlphOrder.length; i++) {
        pattern += wordInAlphOrder[i]
        pattern += "?"
    }
    pattern += "$"
    return new RegExp(pattern)
}

console.log('Hello world!');

try {
    console.log(`workerData.subwords: `, workerData.subwords);

    const anagramsResult = findAnagrams(
        workerData.inputInAlphOrder,
        workerData.subwords
    )
    
    parentPort.postMessage(anagramsResult);
} catch (error) {
    parentPort.postMessage([`${error}`])
}


parentPort.close();
