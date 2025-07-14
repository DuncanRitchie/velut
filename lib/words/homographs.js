import dbConnect from '../dbConnect'
import Word from '../../models/Word'
import { logger } from '../logger'
const log = logger.child({ module: 'homographs' })

export default async function getHomographs({ NoMacraLowerCase }) {
  try {
    await dbConnect()
    const foundWords = await Word.find({ NoMacraLowerCase: NoMacraLowerCase }).select({ _id: 0, Word: 1 }).exec()
    if (foundWords.length) {
      const homographs = foundWords.map((word) => word.Word)
      return { success: true, homographs }
    } else {
      return { success: false }
    }
  } catch (error) {
    log.error(error)
    return { success: false, error: error.toString() }
  }
}
