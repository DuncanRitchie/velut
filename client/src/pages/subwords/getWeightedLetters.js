import letterCountsJson from '../../data/letterCounts.json'
import objectToArray from '../../data/data-functions/objectToArray'

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

export default getWeightedLetters