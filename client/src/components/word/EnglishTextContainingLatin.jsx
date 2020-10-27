//import React from 'react';
//import LatinLink from './LatinLink';

const EnglishTextContainingLatin = (linkBase, text, currentWordHyphenated) => {
    if (!currentWordHyphenated) {currentWordHyphenated = "";}
    // console.log(`linkBase: ${linkBase}`);
    // console.log(`text: ${text}`);
    // console.log(`currentWordHyphenated: ${currentWordHyphenated}`);
    // const splitArray = text.replace("G","¦G").replace("k","k¦").split("¦");
    // console.log(splitArray);
    // const jsxArray = splitArray.map((fragment, index) => {
    //     if (fragment.startsWith("G")) {
    //         const wordsArray = fragment.split(" ").map((targetWord)=>{
    //             return <>{LatinLink(linkBase, targetWord, currentWordHyphenated, false)} </>;
    //         })
    //         return <span key={index}>{wordsArray}</span>
    //     }
    //     else {
    //         return <span key={index}>{fragment}</span>;
    //     }
    // })
    // console.log(jsxArray);
    // return <>{jsxArray}</>;
    return text;
}

export default EnglishTextContainingLatin;