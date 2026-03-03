import Link from 'next/link'
import { macraToHyphens } from '../../lib/words/diacritics'
import superscriptLemmaTag from '../lemma/superscriptLemmaTag'

const LatinLink = ({ linkBase = '/', targetWord, currentWordHyphenated, isLemma = false, prefetch = false }) => {
  const text = isLemma ? superscriptLemmaTag(targetWord) : targetWord
  const targetWordHyphenated = macraToHyphens(targetWord)
  const to = isLemma ? targetWordHyphenated.replace(/\[[^\]]*\]/g, '') : targetWordHyphenated
  //// If the target address is the same as the current page, no link should be displayed.
  const shouldDisplayLink = to !== currentWordHyphenated

  if (shouldDisplayLink) {
    return (
      // Next.js <Link> has prefetch enabled by default, but for velut I have it disabled by default.
      // Prefetching would mean that requests are made for every Latin word in the viewport,
      // before any links were actually clicked, which is wasteful on pages with a lot of Latin words linked.
      // See https://mikebifulco.com/posts/reduce-nextjs-bandwidth-with-link-prefetch
      <Link href={linkBase + to} lang="la" prefetch={prefetch}>
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
