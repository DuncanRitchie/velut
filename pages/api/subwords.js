import objectToArray from "../../data/data-functions/objectToArray"
import letterCountsJson from "../../data/letterCounts.json"
import Word from "../../models/Word"
import dbConnect from "../../lib/dbConnect"

//// Old controller from CRA app:
// const findSubwords = function(req,res) {
// 	let input = req.query.input
// 	Word.find({"Length": {"$lte": input.length}})
// 		.select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "Length": 1, "_id": 0})
// 		.then(words=>{
// 			let sortedSubwords = findSubwordsFromMongo(input,words)
// 			let subwordsOnlyWord = sortedSubwords.map((object)=>{
// 				return object.Word
// 			})
// 			return subwordsOnlyWord
// 		})
// 		.then(subwords=>{res.json(subwords)})
// }

export default async function findSubwords(input) {
    const subwordsAsObjects = await findSubwordsAsObjects(input)
    if (subwordsAsObjects.success) {
        const subwordsAsWords = subwordsAsObjects.subwords.map((object)=>{
            return object.Word
        })
        return { success: true, subwords: subwordsAsWords }
    }
    else {
        return subwordsAsObjects
    }
}

export async function findSubwordsAsObjects(input) {
    try {
        await dbConnect()
        const wordsFromMongo = await Word
            .find({"Length": {"$lte": input.length}})
		    .select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "Length": 1, "_id": 0})

        const subwordsAsObjects = findSubwordsInWordsFromMongo(input, wordsFromMongo)

        return { success: true, subwords: subwordsAsObjects }
    }
    catch (error) {
        console.error(error)
        return { success: false, error }
    }
}


// findSubwordsFromMongo() returns an array of objects.
// The array of objects from Mongo should be passed in as the second parameter.
// This second parameter must include Word, NoMacra, NoMacraLowerCase, and Length fields.

export const findSubwordsInWordsFromMongo = (input, wordObjects) => {
    // We assume input is already demacronized from the front-end.
    let filteredWordObjects = wordObjects.filter(word=>{
        if (deleteCharacters(input,word.NoMacraLowerCase).length === input.length-word.Word.length) {
            return true
        }
        else {
            return false
        }
    })
    // Now we sort the array.
    let sortedWordObjects = filteredWordObjects
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



// deleteCharacters takes two strings as parameters.
// It removes every character (case-insensitive) in the second parameter from the first parameter,
// e.g. deleteCharacters("Duncanus","nunc") = "Daus"
// e.g. deleteCharacters("Rīchardus","hinc") = "Rīardus"
// e.g. deleteCharacters("Richardus","hinc") = "Rardus"

export function deleteCharacters(superword, subword) {
    let string = superword.toLowerCase()
    subword = subword.toLowerCase()
    let chars = subword.split("")
    for (let i=0; i<subword.length; i++) {
        string = string.replace(chars[i],"")
    }
    return string
}

// getWeightedLetters() = {vowels: ["o","o","o","o","o","o","o","u","u","u","u", … ],
//                         consonants: ["k","y","y","q","q","q","x","x","x","x", … ]}
// I.e. it’s an object with two keys, each referring to an array of letters.
// The least frequent letter appears once, the second least frequent twice, etc.
// This is the function that the Subwords page uses to generate random Subwords strings.

const getWeightedLetters = () => {
    let weightedVowels = []
    let weightedConsonants = []
    let letterCountsArray = objectToArray(letterCountsJson).reverse()
    for (let i = 0; i < letterCountsArray.length; i++) {
        let currentLetter = letterCountsArray[i][0]
        for (let j = 0; j < i; j++) {
            if (currentLetter === "a" || currentLetter === "e" || currentLetter === "i" || currentLetter === "o" || currentLetter === "u") {
                weightedVowels.push(currentLetter)
            }
            else {
                weightedConsonants.push(currentLetter)
            }
        }
    }
    return {vowels: weightedVowels, consonants: weightedConsonants}
}

// The same function as the unused randomCountdownQuestion(), but letters are more likely to appear
// if they are more frequent according to letterCounts.json.

export function randomCountdownQuestionWeighted() {
    // getWeightedLetters returns an object containing an array of vowels and an array of consonants,
    // repeated according to how frequently the letters appear in words.
    let weightedLetters = getWeightedLetters()
    const weightedVowels = weightedLetters.vowels
    const weightedConsonants = weightedLetters.consonants
    // The total length of the return is 9.
    const length = 9
    // The number of vowels is either 4 or 5.
    const numberOfVowels = 4 + Math.floor(Math.random()*2)
    // Start with a blank array.
    let letterArray = []
    // Add the vowels.
    for (let i = 0; i < numberOfVowels; i++) {
        let randomNumber = Math.floor(Math.random()*weightedVowels.length)
        let randomVowel = weightedVowels[randomNumber]
        letterArray.push(randomVowel)
    }
    // Add the consonants.
    const numberOfConsonants = length - numberOfVowels
    for (let i = 0; i < numberOfConsonants; i++) {
        let randomNumber = Math.floor(Math.random()*weightedConsonants.length)
        let randomConsonant = weightedConsonants[randomNumber]
        letterArray.push(randomConsonant)
    }
    // Sort randomly.
    const sortedLetterArray = letterArray.sort(()=>{return Math.random()-0.5})
    // Return the letters joined into a string.
    return sortedLetterArray.join("")
}
