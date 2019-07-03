// randomCountdownQuestion() returns a string of nine random letters, four or five of which are vowels.
// This function does not get used; I use randomCountdownQuestionWeighted() instead.

const randomCountdownQuestion = () => {
    // The total length of the return is 9.
    const length = 9
    // The number of vowels is either 4 or 5.
    const numberOfVowels = 4 + Math.floor(Math.random()*2)
    // Start with a blank array.
    let letterArray = []
    // Add the vowels.
    for (let i = 0; i < numberOfVowels; i++) {
        let randomNumber = Math.floor(Math.random()*5)
        let randomVowel = ["a","e","i","o","u"][randomNumber]
        letterArray.push(randomVowel)
    }
    // Add the consonants.
    const numberOfConsonants = length - numberOfVowels
    for (let i = 0; i < numberOfConsonants; i++) {
        let randomNumber = Math.floor(Math.random()*18)
        let randomConsonant = ["b","c","d","f","g","h","l","m","n","p","q","r","s","t","v","x","y","z"][randomNumber]
        letterArray.push(randomConsonant)
    }
    // Sort randomly.
    const sortedLetterArray = letterArray.sort(()=>{return Math.random()-0.5})
    // Return the letters joined into a string.
    return sortedLetterArray.join("")
}

export default randomCountdownQuestion