// This file can be deleted.
// This function was what happened when I tried to write a recursive function
// without actually using recursion!
// It's ghastly, and only finds anagrams up to thirteen words long (because there are 13 levels of nesting).

const findSubwords = require('../findSubwords')
const delChars = require('../delChars')

// This is the function we're currently using.
const findAnagramsNonRecursive = (input, words) => {
    input = input.toLowerCase()
    let anagrams = []
    let increments = []
    let subwordsArray = []
    let remaining = []
    subwordsArray[0] = words
    remaining[0] = input
    // console.log("Number of subwords: "+subwordsArray[0].length)

    for (increments[0]=0; increments[0]<subwordsArray[0].length; increments[0]++) {
        remaining[0] = delChars(input,subwordsArray[0][increments[0]].NoMacraLowerCase)
        if (remaining[0].length === 0) {
            anagrams.push(subwordsArray[0][increments[0]].Word)
        }
        else {
            subwordsArray[1] = findSubwords(remaining[0],subwordsArray[0])
            for (increments[1]=0; increments[1]<subwordsArray[1].length; increments[1]++) {
                remaining[1] = delChars(remaining[0],subwordsArray[1][increments[1]].NoMacraLowerCase)
                if (remaining[1].length === 0) {
                    anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word)
                }
                else {
                    subwordsArray[2] = findSubwords(remaining[1],subwordsArray[0])
                    for (increments[2]=0; increments[2]<subwordsArray[2].length; increments[2]++) {
                        remaining[2] = delChars(remaining[1],subwordsArray[2][increments[2]].NoMacraLowerCase)
                        if (remaining[2].length === 0) {
                            anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word)
                        }
                        else {
                            subwordsArray[3] = findSubwords(remaining[2],subwordsArray[0])
                            for (increments[3]=0; increments[3]<subwordsArray[3].length; increments[3]++) {
                                remaining[3] = delChars(remaining[2],subwordsArray[3][increments[3]].NoMacraLowerCase)
                                if (remaining[3].length === 0) {
                                    anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word)
                                }
                                else {
                                    subwordsArray[4] = findSubwords(remaining[3],subwordsArray[0])
                                    for (increments[4]=0; increments[4]<subwordsArray[4].length; increments[4]++) {
                                        remaining[4] = delChars(remaining[3],subwordsArray[4][increments[4]].NoMacraLowerCase)
                                        if (remaining[4].length === 0) {
                                            anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word)
                                        }
                                        else {
                                            subwordsArray[5] = findSubwords(remaining[4],subwordsArray[0])
                                            for (increments[5]=0; increments[5]<subwordsArray[5].length; increments[5]++) {
                                                remaining[5] = delChars(remaining[4],subwordsArray[5][increments[5]].NoMacraLowerCase)
                                                if (remaining[5].length === 0) {
                                                    anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word)
                                                }
                                                else {
                                                    subwordsArray[6] = findSubwords(remaining[5],subwordsArray[0])
                                                    for (increments[6]=0; increments[6]<subwordsArray[6].length; increments[6]++) {
                                                        remaining[6] = delChars(remaining[5],subwordsArray[6][increments[6]].NoMacraLowerCase)
                                                        if (remaining[6].length === 0) {
                                                            anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word)
                                                        }
                                                        else {
                                                            subwordsArray[7] = findSubwords(remaining[6],subwordsArray[0])
                                                            for (increments[7]=0; increments[7]<subwordsArray[7].length; increments[7]++) {
                                                                remaining[7] = delChars(remaining[6],subwordsArray[7][increments[7]].NoMacraLowerCase)
                                                                if (remaining[7].length === 0) {
                                                                    anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word+" "+subwordsArray[7][increments[7]].Word)
                                                                }
                                                                else {
                                                                    subwordsArray[8] = findSubwords(remaining[7],subwordsArray[0])
                                                                    for (increments[8]=0; increments[8]<subwordsArray[8].length; increments[8]++) {
                                                                        remaining[8] = delChars(remaining[7],subwordsArray[8][increments[8]].NoMacraLowerCase)
                                                                        if (remaining[8].length === 0) {
                                                                            anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word+" "+subwordsArray[7][increments[7]].Word+" "+subwordsArray[8][increments[8]].Word)
                                                                        }
                                                                        else {
                                                                            subwordsArray[9] = findSubwords(remaining[8],subwordsArray[0])
                                                                            for (increments[9]=0; increments[9]<subwordsArray[9].length; increments[9]++) {
                                                                                remaining[9] = delChars(remaining[8],subwordsArray[9][increments[9]].NoMacraLowerCase)
                                                                                if (remaining[9].length === 0) {
                                                                                    anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word+" "+subwordsArray[7][increments[7]].Word+" "+subwordsArray[8][increments[8]].Word+" "+subwordsArray[9][increments[9]].Word)
                                                                                }
                                                                                else {
                                                                                    subwordsArray[10] = findSubwords(remaining[9],subwordsArray[0])
                                                                                    for (increments[10]=0; increments[10]<subwordsArray[10].length; increments[10]++) {
                                                                                        remaining[10] = delChars(remaining[9],subwordsArray[10][increments[10]].NoMacraLowerCase)
                                                                                        if (remaining[10].length === 0) {
                                                                                            anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word+" "+subwordsArray[7][increments[7]].Word+" "+subwordsArray[8][increments[8]].Word+" "+subwordsArray[9][increments[9]].Word+" "+subwordsArray[10][increments[10]].Word)
                                                                                        }
                                                                                        else {
                                                                                            subwordsArray[11] = findSubwords(remaining[10],subwordsArray[0])
                                                                                            for (increments[11]=0; increments[11]<subwordsArray[11].length; increments[11]++) {
                                                                                                remaining[11] = delChars(remaining[10],subwordsArray[11][increments[11]].NoMacraLowerCase)
                                                                                                if (remaining[11].length === 0) {
                                                                                                    anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word+" "+subwordsArray[7][increments[7]].Word+" "+subwordsArray[8][increments[8]].Word+" "+subwordsArray[9][increments[9]].Word+" "+subwordsArray[10][increments[10]].Word+" "+subwordsArray[11][increments[11]].Word)
                                                                                                }
                                                                                                else {
                                                                                                    subwordsArray[12] = findSubwords(remaining[11],subwordsArray[0])
                                                                                                    for (increments[12]=0; increments[12]<subwordsArray[12].length; increments[12]++) {
                                                                                                        remaining[12] = delChars(remaining[11],subwordsArray[12][increments[12]].NoMacraLowerCase)
                                                                                                        if (remaining[12].length === 0) {
                                                                                                            anagrams.push(subwordsArray[0][increments[0]].Word+" "+subwordsArray[1][increments[1]].Word+" "+subwordsArray[2][increments[2]].Word+" "+subwordsArray[3][increments[3]].Word+" "+subwordsArray[4][increments[4]].Word+" "+subwordsArray[5][increments[5]].Word+" "+subwordsArray[6][increments[6]].Word+" "+subwordsArray[7][increments[7]].Word+" "+subwordsArray[8][increments[8]].Word+" "+subwordsArray[9][increments[9]].Word+" "+subwordsArray[10][increments[10]].Word+" "+subwordsArray[11][increments[11]].Word+" "+findSubwords[12][increments[12]].Word)
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