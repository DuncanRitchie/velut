export default function urlFromSearch({type, word}) {
	const encodedType = encodeURIComponent(type)
	const encodedWord = encodeURIComponent(word)
	return `/${encodedType}/${encodedWord}`.replace(/%2F/g, '/').replace(/\/+/g, "/");
}
