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
    // foundWord is the first object that matches the input.
    // It looks for an exact match, then ignores macra and looks again, then ignores case and looks again.
    let foundWord = words.find(word=>{return word.Word===input})
    if (!foundWord) {
        foundWord = words.find(word=>{return word["No macra"]===input})
    }
    if (!foundWord) {
        foundWord = words.find(word=>{return word["No macra"].toLowerCase()===input.toLowerCase()})
    }
    let mappedRhymes = []
    let wordLemmata = [];
    let mappedLemmata = [];
    if (foundWord) {
        // Let's find the rhymes.
        let rhymes = words.filter((word)=>{return word["Perfect rhyme"]===foundWord["Perfect rhyme"]})
        // The rhymes get sorted by syllable count, then by Sort Column.
        let sortedRhymes = rhymes.sort((a,b)=>{
            if (a["Syllable count"]===b["Syllable count"]) {
                if (a["Sort column"]>b["Sort column"]) {
                return 1
            }
            else {
                return -1
            }
            }
            else {
                return a["Syllable count"]-b["Syllable count"]
            }
        })
        // A react-router-dom Link is rendered for every rhyme.
        mappedRhymes = sortedRhymes.map((rhyme,index)=>{return (
            <Link to={"/"+rhyme["No macra"]}>{rhyme.Word} </Link>
        )})
        // Let's do the lemmata. We will render an element for every lemma listed against the input.
        wordLemmata = foundWord.Lemmata.split(" ")
        mappedLemmata = wordLemmata.map((lemma,index)=>{ 
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
                return <span><Link to={`/${cognate["No Macra"]}`} key={index}> {cognate.Lemma}</Link> </span>
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
    }
    return (
        <div className="word">
            <h1>velut</h1>
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p>I&rsquo;m still in the initial stages of creating this app&hellip;</p>
            <Search/>
            <p>You searched for the word <strong>{input}</strong>.</p>
            {foundWord ? <div><p>The word <strong>{foundWord.Word}</strong> could scan as {foundWord.Scansion}</p>
            <p>Perfect rhymes: {mappedRhymes}</p>
            <div className="divider"/>
            <p>{foundWord.Word} belongs to the following {wordLemmata.length} {wordLemmata.length===1 ? "lemma" : "lemmata"}:</p></div> : <p>Nothing was found.</p>}
            {mappedLemmata ? mappedLemmata : null}
        </div>
    )
}

export default WordFromJson