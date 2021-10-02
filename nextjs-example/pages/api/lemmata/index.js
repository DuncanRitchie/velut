import dbConnect from '../../../lib/dbConnect'
import Lemma from '../../../models/Lemma'

async function getCognates({Root}) {
    try {
        await dbConnect()
        const foundLemmata = await Lemma
            .find({Root: Root})
            .select({"Lemma": 1, "_id": 0})
            .sort("NoMacraLowerCase NoMacra Lemma")
            .exec()
        console.log(foundLemmata)
        const mappedLemmata = foundLemmata
            .map(lemma=>lemma.Lemma??lemma)
        return { success: true, cognates: mappedLemmata }
    }
    catch (error) {
        return { success: false }
    }
}

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

            const lemmataWithCognates = await Promise.all(
                sortedLemmata.map(async lemma=>{
                    const cognatesObject = await getCognates(lemma)
                    const cognates = cognatesObject.cognates
                    return {...(lemma._doc ?? lemma), cognates}
                })
            )
            //// An array of objects cannot be serialised in getServerSideProps, so we stringify the array here and parse it back into the array of objects in getServerSideProps.
            return {
                success: true,
                lemmata: JSON.stringify(lemmataWithCognates)
            }
        }
        else {
            return { success: false }
        }
    }
    catch (error) {
        return { success: false }
    }
}