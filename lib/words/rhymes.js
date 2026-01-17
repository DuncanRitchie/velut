import dbConnect from '../dbConnect'
import Word from '../../models/Word'
import routes from '../../data/routes.json'
import { logger } from '../logger'
const log = logger.child({ module: 'rhymes' })

const RHYMES_LIMIT = 100

export default async function getRhymes(wordObject, type, page) {
  try {
    await dbConnect()

    // Let’s find the rhymes.
    // We will be using the following three values if route-specific values are not found in routes.json.
    let searchField = 'PerfectRhyme' // This is the MongoDB fieldname.
    let sortFields = 'Sort' // This is one of "Sort", "EcclesSort", "NoMacraLowerCase NoMacra Word" depending on the sort wanted.
    let headingToDisplay = 'Perfect rhymes (classical)' // This will be rendered onscreen as a heading.
    let shortRhymesDescription = 'rhymes' // This will be rendered onscreen in paragraph text.
    // The route determines which type of rhyme will be wanted.
    // routes is routes.json, which matches routes to searchField, axiosFuncName, and headingToDisplay.
    // Let’s retrieve the values we want.
    const routeObject = routes.find((route) => {
      return type === route.route || '/' + type === route.route
    })
    if (routeObject) {
      searchField = routeObject.searchField
      sortFields = routeObject.sortFields
      headingToDisplay = routeObject.headingToDisplay
      shortRhymesDescription = routeObject.shortRhymesDescription
    }
    let query = { [searchField]: wordObject[searchField] }
    const pageNumber = /[1-9]\d*/.test(page) ? Number(page) : 1

    const [totalRhymesCount, foundWords] = await Promise.all([
      Word.countDocuments(query).exec(),
      Word.find(query)
        .sort(sortFields)
        .skip((pageNumber - 1) * RHYMES_LIMIT)
        .limit(RHYMES_LIMIT)
        .select({ Word: 1, _id: 0 })
        .allowDiskUse(true) // Allows operation to use more memory.
        .exec() || [],
    ])

    const pagesCount = Math.ceil(totalRhymesCount / RHYMES_LIMIT)

    const rhymes = foundWords.map((word) => word.Word)
    // Rhymes will stay as an empty array if the page is out of range.

    if (!totalRhymesCount) {
      return { success: false }
    }

    return {
      success: true,
      rhymes,
      totalRhymesCount,
      pageNumber,
      pagesCount,
      headingToDisplay,
      shortRhymesDescription,
    }
  } catch (error) {
    log.error(error)
    return { success: false, error: error.toString() }
  }
}
