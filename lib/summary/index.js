import dbConnect from '../dbConnect'
import Summary from '../../models/Summary'

export async function getSummary() {
  try {
    await dbConnect()

    const foundSummary = await Summary.findOne({}).select({ _id: 0 }).exec()
    if (foundSummary) {
      const summary = {
        //// Ensure this is a string and not a Date object.
        lastUpdatedDate: foundSummary.lastUpdatedDate.toString(),
        //// I don’t know why JSON.parse & .stringify are necessary, but apparently they are.
        inflectorCounts: JSON.parse(JSON.stringify(foundSummary.inflectorCounts)) ?? null,
        //// `errata` is the list of incorrect forms.
        errata: foundSummary.errata ?? null,
      }
      return { success: true, summary }
    } else {
      return { message: 'No summary object in database', success: false }
    }
  } catch (error) {
    return { success: false }
  }
}
