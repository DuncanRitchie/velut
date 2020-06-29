const sortLemmataOnMeanings = (lemmata, queryWord) => {

    const lemmaHasTheQueriedMeaning = (lemma) => {
        const meaningsArray = lemma.Meanings.split("; ")
        for (let i = 0; i < meaningsArray.length; i++) {
            if (meaningsArray[i].toLowerCase() === queryWord.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    const sortedLemmata = lemmata.sort((a,b)=>{
        // A lemma with the query as an entire meaning gets prioritised.
        // E.g. homō “man; person...” precedes adulēscentulus “young man” if the query is “man”.
        const aHasTheQueriedMeaning = lemmaHasTheQueriedMeaning(a);
        const bHasTheQueriedMeaning = lemmaHasTheQueriedMeaning(b);
        if (aHasTheQueriedMeaning && !bHasTheQueriedMeaning) {
            return -1
        }
        else if (!aHasTheQueriedMeaning && bHasTheQueriedMeaning) {
            return 1
        }

        // A lemma with Meanings containing query as an entire word gets prioritised.
        // E.g. Oriēns “the East” precedes belua “beast” if query is “east”.
        const regex = RegExp("[\\b\\s\\W\\A ]" + queryWord + "[\\b\\s\\W\\Z ]", "i")
        const aContainsWholeWord = regex.test(" " + a.Meanings + " ");
        const bContainsWholeWord = regex.test(" " + b.Meanings + " ");
        if (aContainsWholeWord && !bContainsWholeWord) {
            return -1
        }
        else if (!aContainsWholeWord && bContainsWholeWord) {
            return 1
        }
    
        // A lemma with shorter Meanings gets prioritised.
        // E.g. Thalīa “muse of comedy” (14 chars) precedes Ūrania “muse of astronomy” (17 chars) if query is “muse”.
        else if (a.Meanings.length === b.Meanings.length) {
            return a.Meanings > b.Meanings
        }
        else {
            return a.Meanings.length - b.Meanings.length
        }
    })
    return sortedLemmata
}

module.exports = sortLemmataOnMeanings