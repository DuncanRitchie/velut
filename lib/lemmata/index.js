import dbConnect from '../dbConnect'
import Lemma from '../../models/Lemma'
import Word from '../../models/Word'
import { getIncorrectForms } from '../summary'

async function getCognates(propsContainingRoot) {
  try {
    await dbConnect()

    const Root = propsContainingRoot.Root
    const foundLemmata = await Lemma.find({ Root: Root })
      .select({ Lemma: 1, _id: 0 })
      .sort('NoMacraLowerCase NoMacra Lemma')
      .exec()
    const mappedLemmata = foundLemmata.map((lemma) => lemma.Lemma ?? lemma)
    return { success: true, cognates: mappedLemmata }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}

async function getFormsFromWordsCollection(lemmaObject) {
  try {
    await dbConnect()
    const Lemma = lemmaObject.Lemma
    const foundForms = await Word.find({ LemmaArray: Lemma })
      .select({ Word: 1, _id: 0 })
      .sort('NoMacraLowerCase NoMacra Word')
      .exec()
    const mappedWords = foundForms.map((word) => word.Word ?? word)
    return { success: true, forms: mappedWords }
  } catch (error) {
    console.error(error)
    return { success: false }
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

export async function getLemmata(query, sort, limit = Infinity) {
  try {
    await dbConnect()
    const selection = {
      Lemma: 1,
      PartOfSpeech: 1,
      Meanings: 1,
      Notes: 1,
      Transliterations: 1,
      Root: 1,
      NoTypeTag: 1,
      NoMacra: 1,
      Forms: 1,
      _id: 0,
    }
    const foundLemmata = await Lemma.find(query).select(selection).exec()
    if (foundLemmata && foundLemmata.length) {
      const sortedLemmata = foundLemmata?.sort(sort)

      const lemmataWithCognatesAndForms = await Promise.all(
        sortedLemmata.map(async (foundLemma) => {
          const lemma = { ...(foundLemma._doc ?? foundLemma) }
          const cognatesObject = await getCognates(lemma)
          const cognates = cognatesObject.cognates

          const formsObject = await getFormsFromWordsCollection(lemma)
          const formsFromWordsCollection = JSON.parse(
            JSON.stringify(formsObject.forms),
          )

          const incorrectFormsObject = await getIncorrectForms(lemma.Lemma)
          const incorrectForms = incorrectFormsObject.incorrectForms

          return {
            ...lemma,
            cognates,
            formsFromWordsCollection,
            incorrectForms,
          }
        }),
      )

      //// The limit is set in /english but not elsewhere.
      const limitedLemmata =
        limit !== Infinity
          ? lemmataWithCognatesAndForms.slice(0, limit)
          : lemmataWithCognatesAndForms

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
    console.error(error)
    return { success: false }
  }
}

// The env var should be something like "Proper noun, Conjunction"
// which is processed here to ['Proper noun', 'Conjunction']
// In production, it lists the parts of speech that I have finished
// checking the generated forms for.
// The prefix NEXT_PUBLIC_ on the key prevents hydration errors
// by allowing Next.js to use the env var on the client-side.
const partsOfSpeechToShowGeneratedFormsFor =
  process.env.NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR?.split(',').map((x) =>
    x.trim(),
  ) ?? []

export function shouldGeneratedFormsBeShownForLemma(lemma) {
  return partsOfSpeechToShowGeneratedFormsFor.includes(lemma.PartOfSpeech)
}
