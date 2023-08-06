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

export async function getIncorrectForms(lemma) {
  const summary = await getSummary()
  if (!summary.success) {
    return summary
  }
  const foundErratum = summary.summary.errata.find(
    (erratum) => erratum.lemma === lemma,
  )
  if (!foundErratum) {
    return { success: true, incorrectForms: [] }
  }
  return { success: true, incorrectForms: foundErratum.incorrectForms }
}
