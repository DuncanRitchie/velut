import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'
import {count} from './count'

export default async function getRandomWord() {
    try {
        await dbConnect()
        const totalWordsCount = await count();
        console.log({totalWordsCount})
        const randomOrd = Math.ceil(Math.random() * totalWordsCount.count)
        console.log({randomOrd})
        const foundWordObject = await Word.findOne({ "Ord": randomOrd }).select({ "_id": 0, "Word": 1 })
        const foundWord = foundWordObject.Word
        return { success: true, word: foundWord }
    }
    catch (error) {
        console.log(error)
        return { success: false, error: error.toString() }
    }
}
