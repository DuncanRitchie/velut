import React from 'react';
import lemmata from "../data/lemmata.json";
import Lemma from "./Lemma"

let Word = (props) => {
    let lemmaObjects = lemmata.filter((lemma)=>{return lemma["No Macra"] === window.location.pathname.replace("/","")});
    console.log(lemmaObjects)
    let randomLemma = lemmata[Math.ceil(Math.random()*lemmata.length)];
    let mappedLemmata = lemmaObjects.map((lemma,index)=>{return <Lemma lemma={lemma.Lemma} partOfSpeech={lemma["Part of Speech"]} meaning={lemma.Meaning} scansion={lemma.Scansion}/>})
    return (
        <div>
            <p>Welcome to Velut Word!</p>
            <p>I&rsquo;m still in the initial stages of creating this app&hellip;</p>
            <p>You searched for <strong>{window.location.pathname.replace("/","")}</strong>. {lemmaObjects.length} matching lemmata found.</p>
            {lemmaObjects.length===0 ? <p>Try searching for a Latin lemma, such as <strong>{randomLemma["No Macra"]}</strong>.</p> : {mappedLemmata}}
        </div>
    )
}

export default Word