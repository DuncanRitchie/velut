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
        const foundWord = await Word.findOne({ "Ord": randomOrd }).select({ "_id": 0, "Word": 1 })
        return { success: true, word: foundWord.Word }
    }
    catch (error) {
        console.log(error)
        return { success: false, error: error.toString() }
    }
}
