import React from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";
import words from "../data/words.json";
import lemmata from "../data/lemmata.json";
import Lemma from "./Lemma"

let WordFromJson = (props) => {
    // The word searched for comes from the window location.
    let input = window.location.pathname.replace("/word","").replace("/","");
    document.title = input+" on velut"
    // foundWord is the first object that matches the input (macron-insensitive but case-sensitive).
    let foundWord = words.find(word=>{return word["No macra"]===input})
    // We will render an element for every lemma listed against the input.
    let wordLemmata = foundWord.Lemmata.split(" ")
    let mappedLemmata = wordLemmata.map((lemma,index)=>{ 
        // Let's find the lemma in the Json.
        let foundLemma = lemmata.find(jsonLemma=>{return jsonLemma.Lemma===lemma})
        // Let's get the cognates.
        let cognates = lemmata.filter((lemmaForCognates)=>{return lemmaForCognates.Root === foundLemma.Root});
        // If no etymology is given in the data, a message should appear in the cognates paragraph.
        let cognatesMessage = "";
        if (!foundLemma.Root) {
            cognatesMessage = "I have not assigned cognates for this word, or any of these..."
        }
        // This sorts the cognates alphabetically.
        let sortedCognates = cognates.sort((a,b)=>{
            if(b["No Macra"].toLowerCase() < a["No Macra"].toLowerCase()) {
                return 1
             } 
            else {
                return -1
            }
        });
        // A react-router-dom Link is rendered for every cognate.
        let mappedCognates = sortedCognates.map((cognate,index)=>{
            return <Link to={`/lemma/${cognate["No Macra"]}`} key={index}> {cognate.Lemma} </Link>
        })
        // Cognates are done. Let's put everything into the Lemma element.
        return (
            <Lemma 
            key={index} 
            lemma={foundLemma.Lemma} 
            partOfSpeech={foundLemma["Part of Speech"]} 
            meaning={foundLemma.Meaning} 
            scansion={foundLemma.Scansion} 
            cognates={mappedCognates}
            cognatesMessage={cognatesMessage}
            /> 
        )
    })
    return (
        <div className="word">
            <h1>velut</h1>
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p>Search for something Latin!</p>
            <Search/>
            <p>You searched for <strong>{input}</strong>. The word <strong>{foundWord.Word}</strong> belongs to the following {wordLemmata.length} {wordLemmata.length===1 ? "lemma" : "lemmata"}:</p>
            {mappedLemmata}
        </div>
    )
}

export default WordFromJson