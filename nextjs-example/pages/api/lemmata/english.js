import { getLemmata } from '.'

export default async function english(input) {

    // Because this controller uses regex, we escape characters that have
    // special meanings in regex. This escaping function is taken from MDN:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
    const escapedInput = input.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

    if (!escapedInput) { return { success: false, error: "Please provide a valid query."}}

    // Regex used here only to match lemmata where `escapedInput` is a substring of Meanings.
    const query = {
        "Meanings": {
            "$regex": escapedInput,
            "$options": "i"
        }
    }
    const sort = getSortFunction(escapedInput)

    return getLemmata(query, sort)
}

//// Returns a sort function that will sort an array of lemmata to
//// prioritise the closest matches for `queryWord` in the Meanings field.
//// The returned function can then be passed into the `array.sort` method.
const getSortFunction = (queryWord) => {

    //// Local helper function to use within the sort function.
    const lemmaHasTheQueriedMeaning = (lemma) => {
        const meaningsArray = lemma.Meanings.split("; ")
        for (let i = 0; i < meaningsArray.length; i++) {
            if (meaningsArray[i].toLowerCase() === queryWord.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    return (a,b)=>{
        // A lemma with the query as an entire meaning gets prioritised.
        // E.g. homō “man; person…” precedes adulēscentulus “young man” if the query is “man”.
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
    }
}

//// Old controller from CRA:
// findFromEnglish: function(req, res) {
//     // Because this controller uses regex, we escape characters that have
//     // special meanings in regex. This escaping function is taken from MDN:
//     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
//     const escapedInput = req.params.word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
//     // About the query if invalid.
//     if (!escapedInput) {
//         res.status(400).json("Please provide a valid query.");
//         return;
//     }
//     // Regex used here only to match lemmata where `escapedInput` is a substring of Meanings.
//     Lemma.find({
//         "Meanings": {
//             "$regex": escapedInput,
//             "$options": "i"
//         }
//     })
//     .select({
//         "Lemma": 1,
//         "PartOfSpeech": 1,
//         "Meanings": 1,
//         "Notes": 1,
//         "Transliterations": 1,
//         "Root": 1,
//         "NoTypeTag": 1,
//         "NoMacra": 1,
//         "_id": 0
//     })
//     .then(lemmata=>{
//         let sortedLemmata = sortLemmataOnMeanings(lemmata, escapedInput)
//         res.json(sortedLemmata.slice(0,100))
//     })
//     .catch(err => res.status(400).json(err))
// }