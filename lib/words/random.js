import { logger } from '../logger'
const log = logger.child({ module: 'random' })

import dbConnect from '../dbConnect'
import Word from '../../models/Word'
import count from './count'

export default async function getRandomWord() {
  try {
    await dbConnect()
    const totalWordsCount = await count()
    const randomOrd = Math.ceil(Math.random() * totalWordsCount.count)
    const foundWordObject = await Word.findOne({ Ord: randomOrd }).select({
      _id: 0,
      Word: 1,
    })
    const foundWord = foundWordObject.Word
    return { success: true, word: foundWord }
  } catch (error) {
    log.error(error)
    return { success: false, error: error.toString() }
  }
}
