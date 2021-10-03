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
    const sort = (a,b)=>{
        return (Math.random()-0.5)
    }

    return getLemmata(query, sort)
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