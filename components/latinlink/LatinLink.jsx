import Link from 'next/link'
import { macraToHyphens } from '../../lib/words/diacritics'
import superscriptLemmaTag from '../lemma/superscriptLemmaTag'

const LatinLink = (props) => {
  const { linkBase, targetWord, currentWordHyphenated, isLemma } = props
  const text = isLemma ? superscriptLemmaTag(targetWord) : targetWord
  const targetWordHyphenated = macraToHyphens(targetWord)
  const to = isLemma
    ? targetWordHyphenated.replace(/\[[^\]]*\]/g, '')
    : targetWordHyphenated
  //// If the target address is the same as the current page, no link should be displayed.
  const shouldDisplayLink = !(to === currentWordHyphenated)
  return shouldDisplayLink ? (
    <Link href={linkBase + to} lang="la">
      {/* <Link> should not have a nested <a>, but for some reason it is needed here! */}
      <a>{text}</a>
    </Link>
  ) : (
    <span lang="la" className="link-to-current-word">
      {text}
    </span>
  )
}

export default LatinLink
