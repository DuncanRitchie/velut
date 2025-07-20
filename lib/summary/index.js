import dbConnect from '../dbConnect'
import Summary from '../../models/Summary'

export async function getSummary() {
  try {
    await dbConnect()

    const foundSummary = await Summary.findOne({}).select({ _id: 0 }).exec()
    if (foundSummary) {
      //// I don’t know why JSON.parse & .stringify are necessary, but apparently they are.
      const summary = JSON.parse(JSON.stringify(foundSummary))
      return { success: true, summary }
    } else {
      return { message: 'No summary object in database', success: false }
    }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}
