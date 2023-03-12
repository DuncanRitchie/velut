import routes from '../data/routes.json'
import { macraToHyphens } from '../lib/words/diacritics'
import getRandomWord from './words/random'

// const random = {
//   _randomWord: '',
//   get randomWord() {
//     if (this._randomWord) {
//       this._randomWord = getRandomWord()
//     }

//   }
// }

export default async function urlFromSearch({ type, word }) {
  const encodedType = encodeURIComponent(type)
  const isValidType = routes.some(
    (routeObject) => routeObject.route === encodedType,
  )
  const encodedTypeIfValid = isValidType ? encodedType : ''

  const trimmedWordOrRandom =
    word.trim().toLowerCase() === 'random'
      ? macraToHyphens(await getRandomWord().word)
      : word.trim()
  const encodedWord = encodeURIComponent(trimmedWordOrRandom)

  return `/${encodedTypeIfValid}/${encodedWord}`
    .replace(/%2F/g, '/')
    .replace(/\/+/g, '/')
}
