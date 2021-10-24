// The Json file is an array containing a single string made of all the words in velut, possibly separated by spaces (" ").
const allWords = require('../allWords.json')[0];

// Copied from macraToHyphens.js and noMacra.js, because Node doesn’t understand import statements and I’m not changing client-side code.
const macraToHyphens = (macronizedWord) => {
    // Macra are converted to hyphens.
    let toHyphens = macronizedWord.replace(/\u0100/g,"A-").replace(/\u0101/g,"a-").replace(/\u0112/g,"E-").replace(/\u0113/g,"e-").replace(/\u012A/g,"I-").replace(/\u012B/g,"i-").replace(/\u014C/g,"O-").replace(/\u014D/g,"o-").replace(/\u016A/g,"U-").replace(/\u016B/g,"u-").replace(/\u1E7B/g,"u-:").replace(/\u0232/g,"Y-").replace(/\u0233/g,"y-")
    // Acutes are converted to dots.
    let toDots = toHyphens.replace(/\u00C1/g,"A.").replace(/\u00C9/g,"E.").replace(/\u00CD/g,"I.").replace(/\u00D3/g,"O.").replace(/\u00DA/g,"U.").replace(/\u00DD/g,"Y.").replace(/\u00E1/g,"a.").replace(/\u00E9/g,"e.").replace(/\u00ED/g,"i.").replace(/\u00F3/g,"o.").replace(/\u00FA/g,"u.").replace(/\u00FD/g,"y.")
    // Diaereses are converted to cola.
    toDots = toDots.replace(/\u00E4/g,"a:").replace(/\u00EB/g,"e:").replace(/\u00CF/g,"i:").replace(/\u00EF/g,"i:").replace(/\u00F6/g,"o:").replace(/\u00FC/g,"u:").replace(/\u00FF/g,"y:")
    return toDots
}
const noMacra = (word) => {
    return macraToHyphens(word).replace(/-/g,"").replace(/\./g,"").replace(/:/g,"")
}

const countCharacters = () => {    
    let letterCounts = {};
    let currentLetter;

    for (let i = 0; i < allWords.length; i++) {
        currentLetter = allWords[i];
        if (currentLetter == " ") {
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

// eg { A:1, a:3, "ā":4, b:2 } => { a:8, b:2 }
const aggregateKeys = (object) => {
    const nonAggregatedLetters = Object.keys(object);
    let aggregatedCounts = {};
    for (let i = 0; i < nonAggregatedLetters.length; i++) {
        let currentLetter = nonAggregatedLetters[i];
        let standardisedCurrentLetter = noMacra(currentLetter).toLowerCase();
        if (aggregatedCounts[standardisedCurrentLetter] == undefined) {
            aggregatedCounts[standardisedCurrentLetter] = object[currentLetter];
        }
        else {
            aggregatedCounts[standardisedCurrentLetter] += object[currentLetter];
        }
    }
    return aggregatedCounts;
}

// eg { z:2, k:1, y:3 } => { y:3, z:2, k:1 }
const sortObjectKeysByValue = (object) => {
    const ordered = {};
    Object.keys(object)
        .sort((a,b) => { return object[a] < object[b] ? 1 : -1; })
        .forEach((key) => {
            ordered[key] = object[key];
        });
    return ordered;
}

//console.log("Not aggregated, not sorted: \n", countCharacters());
// console.log("Aggregated, not sorted: \n", aggregateKeys(countCharacters()));
// console.log("Sorted, not aggregated: \n", sortObjectKeysByValue(countCharacters()));
console.log("Aggregated and sorted: \n", sortObjectKeysByValue(aggregateKeys(countCharacters())));
