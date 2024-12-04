import dbConnect from '../dbConnect'
import Word from '../../models/Word'

export default async function count() {
  try {
    await dbConnect()
    const count = await Word.estimatedDocumentCount()
    return { success: true, count: count }
  } catch (error) {
    return { success: false }
  }
}
