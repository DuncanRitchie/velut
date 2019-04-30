import React from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";
import lemmata from "../data/lemmata.json";
import Lemma from "./Lemma"

let Word = (props) => {
    let input = window.location.pathname.replace("/","");
    document.title = input+" on velut"
    let lemmaObjects = lemmata.filter((lemma)=>{return lemma["No Macra"] === input});
    console.log(lemmaObjects)
    console.log("Total lemmata count: "+lemmata.length)
    let randomLemma = lemmata[Math.ceil(Math.random()*lemmata.length)]["No Macra"];
    let mappedLemmata = lemmaObjects.map((lemma,index)=>{
        let cognates = lemmata.filter((lemmaForCognates)=>{return lemmaForCognates.Root === lemma.Root});
        console.log(cognates)
        let sortedCognates = cognates.sort((a,b)=>{
            if(b["No Macra"].toLowerCase() < a["No Macra"].toLowerCase()) {
                return 1
             } 
            else {
                return -1
            }
        });
        console.log(sortedCognates)
        let mappedCognates = sortedCognates.map((cognate,index)=>{return <Link to={`/${cognate["No Macra"]}`} key={index}> {cognate.Lemma} </Link>})
        return <Lemma key="index" lemma={lemma.Lemma} partOfSpeech={lemma["Part of Speech"]} meaning={lemma.Meaning} scansion={lemma.Scansion} cognates={mappedCognates}/>
    })
    return (
        <div className="word">
            <h1>velut</h1>
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p>I&rsquo;m still in the initial stages of creating this app&hellip;</p>
            <Search />
            <p>You searched for <strong>{window.location.pathname.replace("/","")}</strong>. {lemmaObjects.length} matching {lemmaObjects.length===1 ? "lemma" : "lemmata"} found.</p>
            {lemmaObjects.length===0 ? <p>Try searching for a Latin lemma, such as <strong><Link to={"./"+randomLemma}>{randomLemma}</Link></strong>. (If my app is vaguely working; maybe it&rsquo;s not!)</p> : mappedLemmata}
        </div>
    )
}

export default Word