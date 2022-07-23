import routes from '../data/routes.json'

export default function urlFromSearch({ type, word }) {
  const encodedType = encodeURIComponent(type)
  const isValidType = routes.some(
    (routeObject) => routeObject.route === encodedType,
  )
  const encodedTypeIfValid = isValidType ? encodedType : ''
  const encodedWord = encodeURIComponent(word)
  return `/${encodedTypeIfValid}/${encodedWord}`
    .replace(/%2F/g, '/')
    .replace(/\/+/g, '/')
}
