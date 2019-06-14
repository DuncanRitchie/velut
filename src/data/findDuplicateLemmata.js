const lemmata = require('./lemmata.json')

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