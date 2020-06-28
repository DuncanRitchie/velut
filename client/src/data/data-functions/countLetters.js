const allWords = require('../allWords.json')[0];

const countLettersNotAggregated = () => {    
    let letterCounts = {};
    let currentLetter;

    for (let i = 0; i < allWords.length; i++) {
        currentLetter = allWords[i];
        if (currentLetter.equals(" ")) {
            continue;
        }
        else if (letterCounts[currentLetter] == undefined) {
            letterCounts[currentLetter] = 1;
        }
        else {
            letterCounts[currentLetter]++;
        }
    }

    return letterCounts;
}

console.log("Not aggregated:", countLettersNotAggregated());
