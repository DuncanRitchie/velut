import dbConnect from '../dbConnect'
import Word from '../../models/Word'
import routes from '../../data/routes.json'

export default async function getRhymes(wordObject, type) {
  try {
    await dbConnect()

    // Let’s find the rhymes.
    // We will be using the following three values if route-specific values are not found in routes.json.
    let searchField = 'PerfectRhyme' // This is the MongoDB fieldname.
    let sortFields = 'Sort' // This is one of "Sort", "EcclesSort", "NoMacraLowerCase NoMacra Word" depending on the sort wanted.
    let headingToDisplay = 'Perfect rhymes (classical)' // This will be rendered onscreen as a heading.
    // The route determines which type of rhyme will be wanted.
    // routes is routes.json, which matches routes to searchField, axiosFuncName, and headingToDisplay.
    // Let’s retrieve the values we want.
    const routeObject = routes.find((route) => {
      return '/' + type === route.route
    })
    if (routeObject) {
      searchField = routeObject.searchField
      sortFields = routeObject.sortFields
      headingToDisplay = routeObject.headingToDisplay
    }
    let query = { [searchField]: wordObject[searchField] }

    const foundWords = await Word.find(query)
      .sort(sortFields)
      .select({ Word: 1, _id: 0 })
      .exec()

    if (foundWords.length) {
      const rhymes = foundWords.map((word) => word.Word)
      return { success: true, rhymes, headingToDisplay }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.log(error)
    return { success: false, error: error.toString() }
  }
}
