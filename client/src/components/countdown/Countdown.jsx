import React from 'react'
import {Link} from 'react-router-dom'
import Search from '../search/Search'
import Navbar from '../navbar/Navbar'
import words from '../../data/words_8fields.json'
import getWeightedLetters from '../../data/data-functions/countLetters'

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

// The same function as randomCountdownQuestion() above, but letters are more likely to appear 
// if they are more frequent in the NoMacra field of words_8fields.json

const randomCountdownQuestionWeighted = () => {
    // getWeightedLetters returns an object containing an array of vowels and an array of consonants,
    // repeated according to how frequently the letters appear in words.
    let weightedLetters = getWeightedLetters(words)
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

// delChars() removes every character (case-insensitive) in the second parameter from the first parameter, 
// e.g. delChars("Duncanus","nunc") = "Daus"
// e.g. delChars("Rīchardus","hinc") = "Rīardus"
// e.g. delChars("Richardus","hinc") = "Rardus"

const delChars = (superword,subword) => {
    let string = superword.toLowerCase()
    subword = subword.toLowerCase()
    let chars = subword.split("")
    for (let i=0; i<subword.length; i++) {
        string = string.replace(chars[i],"")
    }
    return string
}

// subwordObjects() returns an array of objects. words.json should be passed in as the second parameter.

const subwordObjects = (input,wordObjects) => {
    let filteredWordObjects = wordObjects.filter(word=>{
        if (delChars(input.toLowerCase(),word.AlphOrderNoMacra).length === input.length-word.AlphOrderNoMacra.length) {
            return true
        }
        else {
            return false
        }
    })
    let sortedWordObjects = filteredWordObjects.sort((a,b)=>{
        if (a.Word.length > b.Word.length) {
            return -1
        }
        else if (a.Word.length < b.Word.length) {
            return 1
        }
        else if (a.NoMacra.toLowerCase() < b.NoMacra.toLowerCase()) {
                return -1
            }
            else {
                return 1
            }
    })
    return sortedWordObjects
}

// <Countdown/> is a JSX element rendered at /countdown/:input

const Countdown = () => {
    let input = window.location.pathname.replace("/countdown","").replace("/","")
    document.title = "Subwords of "+input+" on velut"
    let sortedWordObjects = subwordObjects(input,words)
    let mappedWords = sortedWordObjects.map((word,index)=>{
        if (delChars(input,word.AlphOrderNoMacra)) {
            return <span key={index}><Link to={"./"+delChars(input,word.AlphOrderNoMacra)} title={"delete "+word.Word+" from "+input}>{word.Word}</Link> </span>
        }
        else {
            return <span key={index}><strong>{word.Word}</strong> </span>
        }
    })
    let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; Countdown &mdash; {input}</h1>
            <Navbar input={input} currentPage="countdown"/>
            <div>
                <Search prefix="countdown/"/>
                {mappedWords.length ? (
                    <div>
                        <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`}  that can be made out of letters in {input}. You can click on a word (other than a perfect anagram) to delete its letters from {input}.</p>
                        <p>{mappedWords}</p>
                    </div>
                ) : (
                    <p>No words found! Try a different input, such as <Link to={"./"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
                )}
            </div>
        </div>
    )
}

export default Countdown
export {randomCountdownQuestion, randomCountdownQuestionWeighted, delChars, subwordObjects}