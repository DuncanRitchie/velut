import Link from 'next/link'

const AboutContents = () => {
  return (
    <nav className="contents" aria-labelledby="on-this-page">
      <h2 id="on-this-page">On this page</h2>
      <ul>
        <li>
          <Link href="#backstory">Backstory</Link>
        </li>
        <li>
          <Link href="#web-development">Web development</Link>
        </li>
        <li>
          <Link href="#spelling">Spelling</Link>
        </li>
        <li>
          <Link href="#scansion">Scansion</Link>
        </li>
        <li>
          <Link href="#rhymes">Rhymes</Link>
        </li>
        <li>
          <Link href="#consonyms-anagrams-and-subwords">
            Consonyms, anagrams, and subwords
          </Link>
        </li>
        <li>
          <Link href="#lemmata">Lemmata</Link>
        </li>
        <li>
          <Link href="#english-to-latin">English to Latin</Link>
        </li>
        <li>
          <Link href="#multi-word-look-up">Multi-word Look-up</Link>
        </li>
        <li>
          <Link href="#advanced-search">Advanced Search</Link>
        </li>
        <li>
          <Link href="#word-compilation">Word compilation</Link>
        </li>
        <li>
          <Link href="#external-links">External links</Link>
        </li>
        <li>
          <Link href="#future-plans">Future plans</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AboutContents
