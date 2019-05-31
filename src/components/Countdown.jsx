import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search'
import Navbar from './Navbar'
import words from "../data/words_8fields.json";

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
        if (delChars(input.toLowerCase(),word["Alph order no macra"]).length === input.length-word["Alph order no macra"].length) {
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
        else if (a["No macra"] < b["No macra"]) {
                return -1
            }
            else {
                return 1
            }
    })
    return sortedWordObjects
}

// subwordStrings() returns an array of strings, e.g. subwordStrings("duncanusrichardus",words) = 
// ["charādrius","Dīnarchus","Hadriacus","Hadriānus","Rīchardus","cachinnās","cachinnus","candidāns", ...]

const subwordStrings = (input,wordObjects) => {
    return subwordObjects(input,wordObjects).map((object,index)=>{
        return object.Word
    })
}

// subwordStringsNoMacra() returns an array of demacronized strings, e.g. subwordStrings("duncanusrichardus") = 
// ["charadrius","Dinarchus","Hadriacus","Hadrianus","Richardus","cachinnas","cachinnus","candidans", ...]

const subwordStringsNoMacra = (input,wordObjects) => {
    return subwordObjects(input,wordObjects).map((object,index)=>{
        return object["No macra"]
    })
}

// <Countdown/> is a JSX element rendered at /countdown/:input

const Countdown = () => {
    let input = window.location.pathname.replace("/countdown","").replace("/","")
    document.title = "Subwords of "+input+" on velut"
    let sortedWordObjects = subwordObjects(input,words)
    let mappedWords = sortedWordObjects.map((word,index)=>{
        if (delChars(input,word["Alph order no macra"])) {
            return <span key={index}><Link to={"./"+delChars(input,word["Alph order no macra"])} title={"delete "+word.Word+" from "+input}>{word.Word}</Link> </span>
        }
        else {
            return <span key={index}><strong>{word.Word}</strong> </span>
        }
    })
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; Countdown &mdash; {input}</h1>
            <Navbar input={input} currentPage="countdown"/>
            {mappedWords.length ? (
                <div>
                    <Search prefix="countdown/"/>
                    <p>Here are the Latin words that can be made out of letters in {input}. You can click on a word (other than a perfect anagram) to delete its letters from {input}.</p>
                    <p>{mappedWords}</p>
                </div>
            ) : (
                <p>No words found! Try a different input, such as <Link to="./DuncanusRichardus" title="Subwords of DuncanusRichardus">DuncanusRichardus</Link></p>
            )}
        </div>
    )
}

export default Countdown
export {delChars, subwordObjects}