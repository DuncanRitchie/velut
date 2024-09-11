// Most of the keys in the form data are suitable for display,
// but keys of more than one word will need added spaces.
export default function prettyPrintGrammaticalKey(key) {
  switch (key) {
    case 'futureperfect':
      return 'future perfect'
    case 'ne':
      return '-ne'
    case 'que':
      return '-que'
    case 've':
      return '-ve'
    default:
      return key
  }
}
