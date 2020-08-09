

const allLetters = ["a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
allLettersLength = allLetters.length;

// makeHistogram("latina") => { l: 1, a: 2, t: 1, i: 1, n: 1 };
const makeHistogram = (input) => {
    let histogram = {};
    // Loop over every letter in `input`.
    for (let i = 0; i < input.length; i++) {
        // If the letter is already in the histogram, increment it.
        if (histogram[input[i]]) {
            histogram[input[i]]++;
        }
        // Otherwise, set it as 1;
        else {
            histogram[input[i]] = 1;
        }
    }
    return histogram;
}



const makeRegexForSubwords = (input) => {
    const histogram = makeHistogram(input);

    let regexString = "^";
    for (let i = 0; i < allLettersLength; i++) {
        if (!histogram[allLetters[i]]) {
            regexString = `${regexString}(?![^${allLetters[i]}]*${allLetters[i]})`;
        }
    }
    return `${regexString}.{,${input.length}}$`;
};

// console.log(makeRegexForSubwords("latina"))

module.exports = makeRegexForSubwords;
