//{"NoMacraLowerCase": noMacraLowerCase}

import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'

export default async function getHomographs({NoMacraLowerCase}) {
    console.log({NoMacraLowerCase})
    try {
        await dbConnect()
        const foundWords = await Word.find({"NoMacraLowerCase": NoMacraLowerCase}).select({ "_id": 0, "Word": 1 }).exec()
        console.log({foundWords})
        if (foundWords.length) {
            console.log("Mapping through foundWords")
            const homographs = foundWords.map(word=>word.Word)
            console.log({homographs})
            return { success: true, homographs }
        }
        else {
            return { success: false }
        }
    }
    catch (error) {
        console.log(error)
        return { success: false, error: error.toString() }
    }
}
