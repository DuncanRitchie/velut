import { logger } from '../logger'
const log = logger.child({ module: 'lemmata' })

import dbConnect from '../dbConnect'
import Lemma from '../../models/Lemma'

async function getCognates(propsContainingRoot) {
  try {
    await dbConnect()

    // Root is the older field, used for specifying one lemma that is an etymological root of the lemma in the object.
    // Roots is a newer field, used for specifying at least one root.
    // This code for finding cognates considers all the roots in Roots, or simply Root (if there is no Roots or Roots is empty).
    // (Roots may come through as an empty array if I haven’t specified a Roots field, but Mongoose still expects an array.)
    // My intention over time is that I will fill out all lemmata with a Roots field, and then I’ll deprecate Root.
    const roots =
      propsContainingRoot.Roots && propsContainingRoot.Roots.length
        ? propsContainingRoot.Roots
        : propsContainingRoot.Root
        ? [propsContainingRoot.Root]
        : []

    const results = await Promise.all(
      roots.map(async (root) => {
        const foundLemmata = await Lemma.find({ $or: [{ Roots: root }, { Root: root }] })
          .select({ Lemma: 1, _id: 0 })
          .sort('NoMacraLowerCase NoMacra Lemma')
          .exec()
        return { Root: root, Lemmata: foundLemmata.map((lemma) => lemma.Lemma ?? lemma) }
      }),
    )

    // results is an array of objects whose properties are Root and Lemmata.

    return { success: true, cognates: results }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}

export default async function getLemmataFromArray({ LemmaArray }) {
  const query = { Lemma: { $in: LemmaArray } }
  const sort = (a, b) => {
    return (
      LemmaArray.findIndex((lemma) => lemma === a.toObject().Lemma) -
      LemmaArray.findIndex((lemma) => lemma === b.toObject().Lemma)
    )
  }
  return getLemmata(query, sort)
}

export async function getLemmata(query, sort, limit = Infinity, getFormsAndCognates = true) {
  try {
    await dbConnect()
    const selection = {
      Lemma: 1,
      PartOfSpeech: 1,
      Meanings: 1,
      Notes: 1,
      Transliterations: 1,
      Root: getFormsAndCognates ? 1 : 0,
      Roots: getFormsAndCognates ? 1 : 0,
      // NoTypeTag: 1,
      NoMacra: 1,
      Forms: getFormsAndCognates ? 1 : 0,
      _id: 0,
    }
    const foundLemmata = await Lemma.find(query).select(selection).exec()
    if (foundLemmata && foundLemmata.length) {
      const sortedLemmata = foundLemmata.sort(sort)
      const mappedLemmata = await Promise.all(
        sortedLemmata.map(async (foundLemma) => {
          return await { ...(foundLemma._doc ?? foundLemma) }
        }),
      )

      if (getFormsAndCognates) {
        await Promise.all(
          mappedLemmata.map(async (lemma) => {
            const cognatesObject = await getCognates(lemma)
            const cognates = cognatesObject.cognates

            lemma.cognates = cognates
          }),
        )
      }

      //// The limit is set in /english but not elsewhere.
      const limitedLemmata = limit !== Infinity ? mappedLemmata.slice(0, limit) : mappedLemmata

      //// An array of objects cannot be serialised in getServerSideProps, so we stringify the array here and parse it back into the array of objects in getServerSideProps.
      return {
        success: true,
        //lemmataWithoutCognates: JSON.stringify(sortedLemmata),
        lemmata: JSON.stringify(limitedLemmata),
      }
    } else {
      return { success: false }
    }
  } catch (error) {
    log.error(error)
    return { success: false }
  }
}
