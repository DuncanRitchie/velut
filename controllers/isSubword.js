const generateSubwordPattern = (subword) => {
    let distinctLetters = "";
    let letterCounts = {};

    for (let i = 0; i < subword.length; i++) {
        const currentLetter = subword[i];
        if (letterCounts[currentLetter] === undefined) {
            letterCounts[currentLetter] = 0;
            distinctLetters = `${distinctLetters}${currentLetter}`;
        }
    }
    for (let i = 0; i < subword.length; i++) {
        const currentLetter = subword[i];
        letterCounts[currentLetter]++;
    }
    // console.log(letterCounts);
    
    let pattern = "^";
    for (let i = 0; i < distinctLetters.length; i++) {
        const currentLetter = distinctLetters[i];
        if (letterCounts[currentLetter]) {
            pattern = `${pattern}(?=`;
            for (let j = 0; j < letterCounts[currentLetter]; j++) {
                pattern = `${pattern}[^${currentLetter}]*${currentLetter}`;
            }
            pattern = `${pattern})`;
        }
    }
    
    return pattern;
}

const isSubword = (superstring, subword) => {
    const pattern = generateSubwordPattern(subword);
    const regex = new RegExp(pattern, "i");
    // console.log(`Does ${subword} match the regex?`, regex.test(subword));
    // console.log(`Does ${superstring} match the regex?`, regex.test(superstring));
    return regex.test(superstring);
}

module.exports = { generateSubwordPattern, isSubword };

// console.log(isSubword("Duncanusrichardus", "duncann"));
