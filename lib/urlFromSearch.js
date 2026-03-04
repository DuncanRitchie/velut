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
  return (
    `/${encodedTypeIfValid}/${encodedWord}`
      .replace(/%2F/g, '/')
      .replace(/\/+/g, '/')
      // Colons need to stay escaped (as %3A) in front of digits so browsers don’t misinterpret the digits as a port.
      // (Eg, localhost:3000/:8080 is problematic but localhost:3000/I:e-sus is fine.)
      .replace(/%3A(?!\d)/g, ':')
  )
}
