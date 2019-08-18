const findSubwords = require('./findSubwords')
const delChars = require('./delChars')

// This is a recursive function used in the controller for the api/words/anagrams/ route.
// There, the first param is the input string, and the second param is the array
// returned by findSubwordsFromMongo().
// It produces an object, every key of which is a word in a possible anagram.
// The values are either true (if concatenating the keys in the path produces an anagram)
// or an object containing more words as keys recursively.
const findAnagrams = (input, words) => {
    let anagrams = {}
    for (let i = 0; i < words.length; i++) {
        remaining = delChars(input,words[i].NoMacra)
        if (remaining.length === 0) {
            anagrams[words[i].Word] = true
        }
        else {
            subwords = findSubwords(remaining,words)
            if (subwords && subwords.length) {
                subanagrams = findAnagrams(remaining, subwords)
                if (subanagrams && Object.keys(subanagrams).length) {
                    anagrams[words[i].Word] = subanagrams
                }
            }
        }
    }
    return anagrams
}

module.exports = findAnagrams


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

// The controller flattens the result, then passes it into Object.getOwnPropertyNames()
// so what's passed to the client is ['fēlēs','flēs.ē','fel.ēs','fel.es','fel.sē', ...]