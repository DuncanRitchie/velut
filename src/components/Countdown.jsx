import React from 'react';
import {Link} from "react-router-dom";
import words from "../data/words.json";

const delChars = (superword,subword) => {
    let string = superword
    let chars = subword.split("")
    for (let i=0; i<subword.length; i++) {
        string = string.replace(chars[i],"")
    }
    return string
}

let Countdown = () => {
    let input = window.location.pathname.replace("/countdown","").replace("/","").toLowerCase();
    let filteredWordObjects = words.filter(word=>{
        if (delChars(input,word["Alph order no macra"]).length === input.length-word["Alph order no macra"].length) {
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
    let filteredWords = sortedWordObjects.map((word,index)=>{return <Link to={"./"+delChars(input,word["Alph order no macra"])} title={"delete "+word.Word+" from "+input}>{word.Word} </Link>})
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; Countdown &mdash; {input}</h1>
            <p>{filteredWords}</p> 
        </div>
    )
}

export default Countdown