const lemmata = require('../lemmata.json')

const findDuplicateLemmata = () => {
    let duplicates = []
    for (let i=1; i<lemmata.length; i++) {
        for (let j=0; j<i; j++) {
            if (lemmata[i].Lemma === lemmata[j].Lemma) {
                duplicates.push(lemmata[i].Ord)
            }
        }
    }
    return duplicates
}

console.log(findDuplicateLemmata())

const words = require('./words_8fields.json')

const findDuplicateWords = () => {
    let duplicates = []
    for (let i=1; i<words.length; i++) {
        for (let j=0; j<i; j++) {
            if (words[i].Word === words[j].Word) {
                duplicates.push(words[i].Ord)
            }
        }
    }
    return duplicates
}
