import React from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";
import words from "../data/words_8fields.json";
import lemmata from "../data/lemmata.json";
import Lemma from "./Lemma"
import macraToHyphens from "./macraToHyphens"
import './WordFromJson.css'

let WordFromJson = (props) => {
    // The word searched for comes from the window location.
    let input = window.location.pathname.replace("/word","").replace("/","");
    document.title = input+" on velut"
    // Let's pick a random word to show if no words match the search.
    let randomWord = words[Math.ceil(Math.random()*words.length)].Word;
    // foundWord is the first object that matches the input.
    // It looks for an exact match, then ignores macra and looks again, then ignores case and looks again.
    let foundWord = words.find(word=>{return macraToHyphens(word.Word)===input})
    if (!foundWord) {
        foundWord = words.find(word=>{return word.Word===input})
    }
    if (!foundWord) {
        foundWord = words.find(word=>{return word["No macra"]===input.replace(/[-/.]/g,"").replace(/\[.*\]/g,"")})
    }
    if (!foundWord) {
        foundWord = words.find(word=>{return word["No macra"].toLowerCase()===input.replace(/[-/.]/g,"").replace(/\[.*\]/g,"").toLowerCase()})
    }
    let mappedRhymes = [];
    let mappedAnagrams = [];
    let wordLemmata = [];
    let mappedLemmata = [];
    if (foundWord) {
        // Let's set the document title to the word we found.
        document.title = foundWord["Word"]+" on velut"
        // Let's find the rhymes.
        let rhymes = words.filter((word)=>{return word["Perfect rhyme"]===foundWord["Perfect rhyme"]})
        // The rhymes get sorted by syllable count, then by Sort Column.
        let sortedRhymes = rhymes.sort((a,b)=>{
            if (a["Scansion"].length===b["Scansion"].length) {
                if (a["Sort column"]>b["Sort column"]) {
                return 1
            }
            else {
                return -1
            }
            }
            else {
                return a["Scansion"].length-b["Scansion"].length
            }
        })
        // A react-router-dom Link is rendered for every rhyme.
        mappedRhymes = sortedRhymes.map((rhyme,index)=>{return (
            <Link key={index} to={"/"+macraToHyphens(rhyme.Word)} title={rhyme.Word}>{rhyme.Word} </Link>
        )})
        // Let's find the anagrams.
        let anagrams = words.filter((word)=>{return word["Alph order no macra"]===foundWord["Alph order no macra"]})
        // The anagrams get sorted alphabetically.
        let sortedAnagrams = anagrams.sort((a,b)=>{
            if (a["No macra"].toLowerCase()>b["No macra"].toLowerCase()) {
                return 1
            }
            else {
                return -1
            }
        })
        // A react-router-dom Link is rendered for every anagram.
        mappedAnagrams = sortedAnagrams.map((anagram,index)=>{return (
            <Link key={index} to={"/"+macraToHyphens(anagram.Word)} title={anagram.Word}>{anagram.Word} </Link>
        )})
        // Let's do the lemmata. We will render an element for every lemma listed against the input.
        wordLemmata = foundWord.LemmaArray
        mappedLemmata = wordLemmata.map((lemma,index)=>{ 
            // Let's find the lemma in the Json.
            let foundLemma = lemmata.find(jsonLemma=>{return jsonLemma.Lemma===lemma})
            // Let's get the inflected forms.
            let forms = words.filter(word=>{return word.LemmaArray.includes(foundLemma.Lemma)})
            // Let's render a Link for every form.
            let mappedForms = forms.map((form,index)=>{return <Link key={index} title={form.Word} to={"/"+macraToHyphens(form.Word)}>{form.Word} </Link>})
            // Let's get the cognates.
            let cognates = lemmata.filter((lemmaForCognates)=>{return lemmaForCognates.Root === foundLemma.Root});
            // If no etymology is given in the data, a message should appear in the cognates paragraph.
            let cognatesMessage = "";
            if (!foundLemma.Root) {
                cognatesMessage = "I have not assigned cognates for this word, sorry!"
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
                return <span key={index}><Link to={`/${macraToHyphens(cognate.Lemma).replace(/\[.*\]/g,"")}`} key={index} title={cognate.Lemma}> {cognate.Lemma}</Link> </span>
            })
            // Cognates are done. Let's put everything into the Lemma element.
            return (
                <Lemma 
                key={index} 
                lemma={foundLemma.Lemma} 
                partOfSpeech={foundLemma["Part of Speech"]} 
                meaning={foundLemma.Meaning} 
                scansion={foundLemma.Scansion}
                forms={mappedForms}
                cognates={mappedCognates}
                cognatesMessage={cognatesMessage}
                /> 
            )
        })
    }
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; {foundWord ? foundWord.Word : input}</h1>
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p className="warning-message">
                This is a demonstration of the user experience without connection to the database I will be using, so this website will be slow to load initially.<br/>
                Eventually I&rsquo;ll have connected my database up successfully, and this website will load a lot quicker. 
            </p>
            <Search/>
            <div className="divider"/>
            {foundWord ? <div><p>The word <strong>{foundWord.Word}</strong> could scan as {foundWord.Scansion}</p>
            <p>Perfect rhymes: {mappedRhymes}</p>
            <p>Anagrams: {mappedAnagrams}</p>
            <div className="divider"/>
            <p><strong>{foundWord.Word}</strong> belongs to the following {wordLemmata.length} {wordLemmata.length===1 ? "lemma" : "lemmata"}:</p></div> : <p>Nothing was found. Try <Link to={"/"+macraToHyphens(randomWord)} title={randomWord}>{randomWord}</Link>.</p>}
            {mappedLemmata ? mappedLemmata : null}
        </div>
    )
}

export default WordFromJson