import React from 'react';
import {Link} from "react-router-dom";
import Search from "../search/Search";
import lemmata from "../../data/lemmata.json";
import words from "../../data/words_8fields.json";
import Lemma from "../word/Lemma"

let Lemmata = (props) => {
    // The word searched for comes from the window location.
    let input = window.location.pathname.replace("/lemma","").replace("/","");
    document.title = input+" on velut"
    // Let's pick a random lemma to show if no lemmata match the search.
    let randomLemma = lemmata[Math.ceil(Math.random()*lemmata.length)].NoMacra;
    // We're filtering the Json data to lemmata that match the search.
    let lemmaObjects = lemmata.filter((lemma)=>{return lemma.NoMacra.toLowerCase() === input.toLowerCase()});
    // mappedLemmata will be an array of JSX elements.
    let mappedLemmata = lemmaObjects.map((lemma,index)=>{
        // Let's get the inflected forms.
        let forms = words.filter(word=>{return word.LemmaArray.includes(lemma.Lemma)})
        // Let's render a Link for every form.
        let mappedForms = forms.map((form,index)=>{return <Link key={index} title={form.NoMacra} to={"/"+form.NoMacra}>{form.Word} </Link>})
        // Let's get the cognates.
        let cognates = lemmata.filter((lemmaForCognates)=>{return lemmaForCognates.Root === lemma.Root});
        // If no etymology is given in the data, a message should appear in the cognates paragraph.
        let cognatesMessage = "";
        if (!lemma.Root) {
            cognatesMessage = "I have not assigned cognates for this word, sorry!"
        }
        // This sorts the cognates alphabetically.
        let sortedCognates = cognates.sort((a,b)=>{
            if(b.NoMacra.toLowerCase() < a.NoMacra.toLowerCase()) {
                return 1
             } 
            else {
                return -1
            }
        });
        // A react-router Link is rendered for every cognate.
        let mappedCognates = sortedCognates.map((cognate,index)=>{
            return <Link to={`/lemma/${cognate.NoMacra}`} key={index} title={cognate.NoMacra}> {cognate.Lemma} </Link>
        })
        // Cognates are done. Let's put everything into the Lemma element.
        return (
            <Lemma 
            key={index} 
            lemma={lemma.Lemma} 
            partOfSpeech={lemma["Part of Speech"]} 
            meaning={lemma.Meaning} 
            scansion={lemma.Scansion} 
            forms={mappedForms}
            cognates={mappedCognates}
            cognatesMessage={cognatesMessage}
            /> 
        )
    })
    // Building the actual page.
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; lemma &mdash; {input}</h1>
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p>I&rsquo;m still in the initial stages of creating this app&hellip;</p>
            {/* Search bar and submit link */}
            <Search prefix="lemma/" />
            {/* Telling the user what they searched for and how many results were found. */}
            <p>
                You searched for the lemma <strong>{window.location.pathname.replace("/lemma","").replace("/","")}</strong>. {lemmaObjects.length} matching {lemmaObjects.length===1 ? "lemma" : "lemmata"} found.
            </p>
            {/* If there are no results, it suggests the random lemma. If there are results, they're displayed. */}
            {lemmaObjects.length===0 ? 
                <p>
                    Try searching for a Latin lemma, such as <strong><Link to={"./"+randomLemma} title={randomLemma}>{randomLemma}</Link></strong>. 
                    (If my app is vaguely working; maybe it&rsquo;s not!)
                </p>
            : mappedLemmata}
        </div>
    )
}

export default Lemmata