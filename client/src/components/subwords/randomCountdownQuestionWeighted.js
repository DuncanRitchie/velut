import getWeightedLetters from './getWeightedLetters'

// The same function as the unused randomCountdownQuestion(), but letters are more likely to appear 
// if they are more frequent according to letterCounts.json.

const randomCountdownQuestionWeighted = () => {
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

export default randomCountdownQuestionWeighted