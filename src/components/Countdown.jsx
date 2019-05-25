import React from 'react';
import {Link} from "react-router-dom";
import words from "../data/words.json";

// delChars() removes every character (case-sensitive) in the second parameter from the first parameter, 
// e.g. delChars("Duncanus","nunc") = "Daus"
// e.g. delChars("Rīchardus","hinc") = "Rīardus"
// e.g. delChars("Richardus","hinc") = "Rardus"

const delChars = (superword,subword) => {
    let string = superword
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
    let sortedWordObjects = subwordObjects(input,words)
    let mappedWords = sortedWordObjects.map((word,index)=>{
        return <Link key={index} to={"./"+delChars(input,word["Alph order no macra"])} title={"delete "+word.Word+" from "+input}>{word.Word} </Link>
    })
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; Countdown &mdash; {input}</h1>
            <p>{mappedWords}</p>
        </div>
    )
}

export default Countdown
export {delChars, subwordObjects}