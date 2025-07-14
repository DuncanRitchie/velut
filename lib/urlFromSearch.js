import routes from '../data/routes.json'
import { logger } from './logger'
const log = logger.child({ module: 'urlFromSearch' })

const charactersToSearchBy = "a-z0-9ÁÉÏáäèéëíïóôöúüýÿĀāĒēĪīİıŌōŪūțȲȳ́̓ḗḥṻÆæŒœ/%!?'’ .:-"
const regexCharactersToIgnore = RegExp(`[^${charactersToSearchBy}]`, 'gi')

export default function urlFromSearch({ type, word }) {
  const encodedType = encodeURIComponent(type)
  const isValidType = routes.some((routeObject) => routeObject.route === encodedType)
  const encodedTypeIfValid = isValidType ? encodedType : ''
  const encodedWord = encodeURIComponent(word.replace(regexCharactersToIgnore, '').trim())
  log.info({ encodedWord })
  return `/${encodedTypeIfValid}/${encodedWord}`.replace(/%2F/g, '/').replace(/\/+/g, '/')
}
