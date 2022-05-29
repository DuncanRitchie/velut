import dbConnect from '../dbConnect'
import Lemma from '../../models/Lemma'
import Word from '../../models/Word'

async function getCognates(propsContainingRoot) {
    try {
        await dbConnect()

        const Root = propsContainingRoot.toObject().Root
        const foundLemmata = await Lemma
            .find({Root: Root})
            .select({"Lemma": 1, "_id": 0})
            .sort("NoMacraLowerCase NoMacra Lemma")
            .exec()
        const mappedLemmata = foundLemmata
            .map(lemma=>lemma.Lemma??lemma)
        return { success: true, cognates: mappedLemmata }
    }
    catch (error) {
        return { success: false }
    }
}

async function getForms(lemmaObject) {
    try {
        await dbConnect()
        const Lemma = lemmaObject.toObject().Lemma
        const foundForms = await Word
            .find({"LemmaArray": Lemma})
            .select({"Word": 1, "_id": 0})
            .sort("NoMacraLowerCase NoMacra Word")
            .exec()
        const mappedWords = foundForms
            .map(word=>word.Word??word)
        return { success: true, forms: mappedWords }
    }
    catch (error) {
        console.error(error)
        return { success: false }
    }
}

export default async function getLemmataFromArray({LemmaArray}) {
    const query = {Lemma: {$in: LemmaArray}}
    const sort = (a,b)=>{
        return (
            LemmaArray.findIndex(lemma => lemma === a.toObject().Lemma)
            -
            LemmaArray.findIndex(lemma => lemma === b.toObject().Lemma)
        )
    }
    return getLemmata(query, sort)
}

export async function getLemmata(query, sort, limit = Infinity) {
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
        const foundLemmata = await Lemma.find(query).select(selection).exec()
        if (foundLemmata && foundLemmata.length) {
            const sortedLemmata = foundLemmata?.sort(sort)

            const lemmataWithCognatesAndForms = await Promise.all(
                sortedLemmata.map(async lemma=>{
                    const cognatesObject = await getCognates(lemma)
                    const cognates = cognatesObject.cognates

                    const formsObject = await getForms(lemma)
                    const forms = formsObject.forms

                    return {...(lemma._doc ?? lemma), cognates, forms }
                })
            )

            //// The limit is set in /english but not elsewhere.
            const limitedLemmata
                = limit !== Infinity
                ? lemmataWithCognatesAndForms.slice(0, limit)
                : lemmataWithCognatesAndForms

            //// An array of objects cannot be serialised in getServerSideProps, so we stringify the array here and parse it back into the array of objects in getServerSideProps.
            return {
                success: true,
                //lemmataWithoutCognates: JSON.stringify(sortedLemmata),
                lemmata: JSON.stringify(limitedLemmata),
            }
        }
        else {
            return { success: false }
        }
    }
    catch (error) {
        console.error(error)
        return { success: false }
    }
}
