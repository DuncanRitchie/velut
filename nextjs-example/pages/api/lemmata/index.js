import dbConnect from '../../../lib/dbConnect'
import Lemma from '../../../models/Lemma'

export default async function getLemmata({LemmaArray}) {
    try {
        await dbConnect()
        const selection = {
            "Lemma": 1,
            "PartOfSpeech": 1,
            "Meanings": 1,
            "Notes": 1,
            "Transliterations": 1,
            "Root": 1,
            "NoTypeTag": 1,
            "NoMacra": 1,
            "_id": 0
        }
        const foundLemmata = await Lemma.find({Lemma: {$in: LemmaArray}}).select(selection).exec()
        console.log({foundLemmata})
        if (foundLemmata && foundLemmata.length) {
            const sortedLemmata = foundLemmata?.sort((a,b)=>{
                return (LemmaArray.find(lemma=>lemma.Lemma === b)) - (LemmaArray.find(lemma=>lemma.Lemma === a))
            })
            console.log({sortedLemmata})
            //// An array of objects cannot be serialised in getServerSideProps, so we stringify the array here and parse it back into the array of objects in getServerSideProps.
            return { success: true, lemmata: JSON.stringify(sortedLemmata) }
        }
        else {
            return { success: false }
        }
    }
    catch (error) {
        return { success: false }
    }
}