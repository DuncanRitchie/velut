import dbConnect from '../dbConnect'
import Lemma from '../../models/Lemma'

export default async function count() {
  try {
    await dbConnect()
    const count = await Lemma.estimatedDocumentCount()
    return { success: true, count: count }
  } catch (error) {
    return { success: false }
  }
}
