import Link from 'next/link'
import { macraToHyphens } from '../../lib/words/diacritics'
import superscriptLemmaTag from '../lemma/superscriptLemmaTag'

const LatinLink = ({ linkBase = '/', targetWord, currentWordHyphenated, isLemma = false }) => {
  const text = isLemma ? superscriptLemmaTag(targetWord) : targetWord
  const targetWordHyphenated = macraToHyphens(targetWord)
  const to = isLemma ? targetWordHyphenated.replace(/\[[^\]]*\]/g, '') : targetWordHyphenated
  //// If the target address is the same as the current page, no link should be displayed.
  const shouldDisplayLink = to !== currentWordHyphenated

  if (shouldDisplayLink) {
    return (
      <Link href={linkBase + to} lang="la">
        {text}
      </Link>
    )
  }
  return (
    <span lang="la" className="link-to-current-word">
      {text}
    </span>
  )
}

export default LatinLink
