import React from 'react';
import words from "../../data/words_8fields.json";
import {delChars, subwordObjects} from "../countdown/Countdown"
import Search from '../search/Search'
import Navbar from '../navbar/Navbar'

// anagrams() returns an array of strings that are multiword anagrams of input
// anagramsArray() is the newer version of this function.

// const anagrams = (input) => {
//     input = input.toLowerCase()
//     let arrayOfAnagrams = []
//     let allSubwords = subwordObjects(input,words)
//     console.log("Number of subwords: "+allSubwords.length)
//     for (let i=0; i<allSubwords.length; i++) {
//         let remainingLetters = delChars(input,allSubwords[i].AlphOrderNoMacra)
//         if (remainingLetters.length === 0) {
//             arrayOfAnagrams.push(allSubwords[i].Word)
//         }
//         else {
//             let subwordsOne = subwordObjects(remainingLetters,allSubwords)
//             for (let j=0; j<subwordsOne.length; j++) {
//                 let remainingLettersOne = delChars(remainingLetters,subwordsOne[j].AlphOrderNoMacra)
//                 if (remainingLettersOne.length === 0) {
//                     arrayOfAnagrams.push(allSubwords[i].Word+" "+subwordsOne[j].Word)
//                 }
//                 else {
//                     let subwordsTwo = subwordObjects(remainingLettersOne,allSubwords)
//                     for (let k=0; k<subwordsTwo.length; k++) {
//                         let remainingLettersTwo = delChars(remainingLettersOne,subwordsTwo[k].AlphOrderNoMacra)
//                         if (remainingLettersTwo.length === 0) {
//                             arrayOfAnagrams.push(allSubwords[i].Word+" "+subwordsOne[j].Word+" "+subwordsTwo[k].Word)
//                         }
//                         else {
//                             let subwordsThree = subwordObjects(remainingLettersTwo,allSubwords)
//                             for (let l=0; l<subwordsThree.length; l++) {
//                                 let remainingLettersThree = delChars(remainingLettersTwo,subwordsThree[l].AlphOrderNoMacra)
//                                 if (remainingLettersThree.length === 0) {
//                                     arrayOfAnagrams.push(allSubwords[i].Word+" "+subwordsOne[j].Word+" "+subwordsTwo[k].Word+" "+subwordsThree[l].Word)
//                                 }
//                                 else {
//                                     let subwordsFour = subwordObjects(remainingLettersThree,allSubwords)
//                                     for (let m=0; m<subwordsFour.length; m++) {
//                                         let remainingLettersFour = delChars(remainingLettersThree,subwordsFour[m].AlphOrderNoMacra)
//                                         arrayOfAnagrams.push(allSubwords[i].Word+" "+subwordsOne[j].Word+" "+subwordsTwo[k].Word+" "+subwordsThree[l].Word+" "+subwordsFour[m].Word+" - "+remainingLettersFour)
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return arrayOfAnagrams
// }

const anagramsArray = (input) => {
    input = input.toLowerCase()
    let anagrams = []
    let increments = []
    let subwords = []
    let remaining = []
    subwords[0] = subwordObjects(input,words)
    remaining[0] = input
    console.log("Number of subwords: "+subwords[0].length)

    // The while-loop below was my failed attempt to condense the nested for-loops below it,
    // so that the maximum number of words in an anagram was not fixed.
    
    // let x = 0
    // while (increments[x] < subwords[x].length) {
    //     for (increments[x] = 0; increments[x] < subwords[x].length ; increments[x] ++) {
    //         remaining[x+1] = delChars(remaining[x], subwords[x][increments[x]].AlphOrderNoMacra)
    //         if (remaining[x+1].length === 0) {
    //             let newAnagram = []
    //             for (let i = 0; i < x; i++) {
    //                 newAnagram.push(subwords[i][increments[i]].Word)
    //             }
    //             anagrams.push(newAnagram.join(" "))
    //         }
    //         else {
    //             subwords[x+1] = subwordObjects(remaining[x+1],subwords[x])
    //             x++
    //         }
    //     }
    // }

    for (increments[0]=0; increments[0]<subwords[0].length; increments[0]++) {
        remaining[0] = delChars(input,subwords[0][increments[0]].AlphOrderNoMacra)
        if (remaining[0].length === 0) {
            anagrams.push(subwords[0][increments[0]].Word)
        }
        else {
            subwords[1] = subwordObjects(remaining[0],subwords[0])
            for (increments[1]=0; increments[1]<subwords[1].length; increments[1]++) {
                remaining[1] = delChars(remaining[0],subwords[1][increments[1]].AlphOrderNoMacra)
                if (remaining[1].length === 0) {
                    anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word)
                }
                else {
                    subwords[2] = subwordObjects(remaining[1],subwords[0])
                    for (increments[2]=0; increments[2]<subwords[2].length; increments[2]++) {
                        remaining[2] = delChars(remaining[1],subwords[2][increments[2]].AlphOrderNoMacra)
                        if (remaining[2].length === 0) {
                            anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word)
                        }
                        else {
                            subwords[3] = subwordObjects(remaining[2],subwords[0])
                            for (increments[3]=0; increments[3]<subwords[3].length; increments[3]++) {
                                remaining[3] = delChars(remaining[2],subwords[3][increments[3]].AlphOrderNoMacra)
                                if (remaining[3].length === 0) {
                                    anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word)
                                }
                                else {
                                    subwords[4] = subwordObjects(remaining[3],subwords[0])
                                    for (increments[4]=0; increments[4]<subwords[4].length; increments[4]++) {
                                        remaining[4] = delChars(remaining[3],subwords[4][increments[4]].AlphOrderNoMacra)
                                        if (remaining[4].length === 0) {
                                            anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word)
                                        }
                                        else {
                                            subwords[5] = subwordObjects(remaining[4],subwords[0])
                                            for (increments[5]=0; increments[5]<subwords[5].length; increments[5]++) {
                                                remaining[5] = delChars(remaining[4],subwords[5][increments[5]].AlphOrderNoMacra)
                                                if (remaining[5].length === 0) {
                                                    anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word)
                                                }
                                                else {
                                                    subwords[6] = subwordObjects(remaining[5],subwords[0])
                                                    for (increments[6]=0; increments[6]<subwords[6].length; increments[6]++) {
                                                        remaining[6] = delChars(remaining[5],subwords[6][increments[6]].AlphOrderNoMacra)
                                                        if (remaining[6].length === 0) {
                                                            anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word)
                                                        }
                                                        else {
                                                            subwords[7] = subwordObjects(remaining[6],subwords[0])
                                                            for (increments[7]=0; increments[7]<subwords[7].length; increments[7]++) {
                                                                remaining[7] = delChars(remaining[6],subwords[7][increments[7]].AlphOrderNoMacra)
                                                                if (remaining[7].length === 0) {
                                                                    anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word+" "+subwords[7][increments[7]].Word)
                                                                }
                                                                else {
                                                                    subwords[8] = subwordObjects(remaining[7],subwords[0])
                                                                    for (increments[8]=0; increments[8]<subwords[8].length; increments[8]++) {
                                                                        remaining[8] = delChars(remaining[7],subwords[8][increments[8]].AlphOrderNoMacra)
                                                                        if (remaining[8].length === 0) {
                                                                            anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word+" "+subwords[7][increments[7]].Word+" "+subwords[8][increments[8]].Word)
                                                                        }
                                                                        else {
                                                                            subwords[9] = subwordObjects(remaining[8],subwords[0])
                                                                            for (increments[9]=0; increments[9]<subwords[9].length; increments[9]++) {
                                                                                remaining[9] = delChars(remaining[8],subwords[9][increments[9]].AlphOrderNoMacra)
                                                                                if (remaining[9].length === 0) {
                                                                                    anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word+" "+subwords[7][increments[7]].Word+" "+subwords[8][increments[8]].Word+" "+subwords[9][increments[9]].Word)
                                                                                }
                                                                                else {
                                                                                    subwords[10] = subwordObjects(remaining[9],subwords[0])
                                                                                    for (increments[10]=0; increments[10]<subwords[10].length; increments[10]++) {
                                                                                        remaining[10] = delChars(remaining[9],subwords[10][increments[10]].AlphOrderNoMacra)
                                                                                        if (remaining[10].length === 0) {
                                                                                            anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word+" "+subwords[7][increments[7]].Word+" "+subwords[8][increments[8]].Word+" "+subwords[9][increments[9]].Word+" "+subwords[10][increments[10]].Word)
                                                                                        }
                                                                                        else {
                                                                                            subwords[11] = subwordObjects(remaining[10],subwords[0])
                                                                                            for (increments[11]=0; increments[11]<subwords[11].length; increments[11]++) {
                                                                                                remaining[11] = delChars(remaining[10],subwords[11][increments[11]].AlphOrderNoMacra)
                                                                                                if (remaining[11].length === 0) {
                                                                                                    anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word+" "+subwords[7][increments[7]].Word+" "+subwords[8][increments[8]].Word+" "+subwords[9][increments[9]].Word+" "+subwords[10][increments[10]].Word+" "+subwords[11][increments[11]].Word)
                                                                                                }
                                                                                                else {
                                                                                                    subwords[12] = subwordObjects(remaining[11],subwords[0])
                                                                                                    for (increments[12]=0; increments[12]<subwords[12].length; increments[12]++) {
                                                                                                        remaining[12] = delChars(remaining[11],subwords[12][increments[12]].AlphOrderNoMacra)
                                                                                                        if (remaining[12].length === 0) {
                                                                                                            anagrams.push(subwords[0][increments[0]].Word+" "+subwords[1][increments[1]].Word+" "+subwords[2][increments[2]].Word+" "+subwords[3][increments[3]].Word+" "+subwords[4][increments[4]].Word+" "+subwords[5][increments[5]].Word+" "+subwords[6][increments[6]].Word+" "+subwords[7][increments[7]].Word+" "+subwords[8][increments[8]].Word+" "+subwords[9][increments[9]].Word+" "+subwords[10][increments[10]].Word+" "+subwords[11][increments[11]].Word+" "+subwords[12][increments[12]].Word)
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return anagrams
}

const Anagrams = () => {
    let input = window.location.pathname.replace("/anagrams","").replace("/","")
    document.title = "Anagrams of "+input+" on velut"
    let mappedAnagrams = anagramsArray(input).map((anagram,index)=>{
        return <span key={index}>{anagram}<br/></span>
    })
    return (
        <div className="word">
            <h1><span className="title">velut</span> &mdash; Anagrams &mdash; {input}</h1>
            <Navbar input={input} currentPage="anagrams"/>
            <p>Caution &mdash; searches longer than ten characters may take some minutes or fail completely. Anagrams longer than thirteen words will not be found.</p>
            <p>{mappedAnagrams.length} anagrams have been found for <strong>{input}</strong>.</p>
            <Search prefix="anagrams/" />
            <p>{mappedAnagrams.length ? mappedAnagrams : "No anagrams found. Try another search."}</p>
        </div>
    )
}

export default Anagrams