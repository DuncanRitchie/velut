import React from 'react';
import words from "../data/words_batch1.json";
import {delChars, subwordObjects} from "./Countdown"

// anagrams() returns an array of strings that are multiword anagrams of input

const anagrams = (input) => {
    input = input.toLowerCase()
    let arrayOfAnagrams = []
    let allSubwords = subwordObjects(input,words)
    console.log("Number of subwords: "+allSubwords.length)
    for (let i=0; i<allSubwords.length; i++) {
        let remainingLetters = delChars(input,allSubwords[i]["Alph order no macra"])
        if (remainingLetters.length === 0) {
            arrayOfAnagrams.push(allSubwords[i]["Word"])
        }
        else {
            let subwordsOne = subwordObjects(remainingLetters,allSubwords)
            for (let j=0; j<subwordsOne.length; j++) {
                let remainingLettersOne = delChars(remainingLetters,subwordsOne[j]["Alph order no macra"])
                if (remainingLettersOne.length === 0) {
                    arrayOfAnagrams.push(allSubwords[i]["Word"]+" "+subwordsOne[j]["Word"])
                }
                else {
                    let subwordsTwo = subwordObjects(remainingLettersOne,allSubwords)
                    for (let k=0; k<subwordsTwo.length; k++) {
                        let remainingLettersTwo = delChars(remainingLettersOne,subwordsTwo[k]["Alph order no macra"])
                        if (remainingLettersTwo.length === 0) {
                            arrayOfAnagrams.push(allSubwords[i]["Word"]+" "+subwordsOne[j]["Word"]+" "+subwordsTwo[k]["Word"])
                        }
                        else {
                            let subwordsThree = subwordObjects(remainingLettersTwo,allSubwords)
                            for (let l=0; l<subwordsThree.length; l++) {
                                let remainingLettersThree = delChars(remainingLettersTwo,subwordsThree[l]["Alph order no macra"])
                                if (remainingLettersThree.length === 0) {
                                    arrayOfAnagrams.push(allSubwords[i]["Word"]+" "+subwordsOne[j]["Word"]+" "+subwordsTwo[k]["Word"]+" "+subwordsThree[l]["Word"])
                                }
                                else {
                                    // let subwordsFour = subwordObjects(remainingLettersThree,allSubwords)
                                    // for (let m=0; m<subwordsFour.length; m++) {
                                    //     let remainingLettersFour = delChars(remainingLettersThree,subwordsFour[m]["Alph order no macra"])
                                    //     arrayOfAnagrams.push(allSubwords[i]["Word"]+" "+subwordsOne[j]["Word"]+" "+subwordsTwo[k]["Word"]+" "+subwordsThree[l]["Word"]+" "+subwordsFour[m]["Word"]+" - "+remainingLettersFour)
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return arrayOfAnagrams
}

const Anagrams = () => {
    let input = window.location.pathname.replace("/anagrams","").replace("/","")
    let mappedAnagrams = anagrams(input).map((anagram,index)=>{
        return <span key={index}>{anagram}<br/></span>
    })
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; Anagrams &mdash; {input}</h1>
            <p>{mappedAnagrams.length ? mappedAnagrams : "No anagrams found"}</p>
        </div>
    )
}

export default Anagrams