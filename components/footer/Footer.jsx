import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Footer.module.css'

let Footer = () => {
  //// Footer has a list of links to different sections of velut, but the current section does not get linked to.
  //// So we need to work out what the current section is.

  const router = useRouter()
  const currentUrl = router.route
  const firstPartOfUrl = currentUrl.split('/').filter(Boolean)[0]
  const thereIsSecondPartOfUrl =
    currentUrl.split('/').filter(Boolean).length > 1

  const doesUrlBeginWith = (token) => {
    return (
      (firstPartOfUrl &&
        currentUrl !== '/' &&
        !firstPartOfUrl.startsWith('?') &&
        firstPartOfUrl === token) ||
      firstPartOfUrl?.startsWith(token + '?')
    )
  }

  const showHome = currentUrl !== '/' && !firstPartOfUrl?.startsWith('?')
  const showEnglish = !doesUrlBeginWith('english')
  const showSubwords = !doesUrlBeginWith('subwords')
  //// A URL such as /about/re shows the Word page for “rē”, not About,
  //// so link to About should be shown if there is a second part to the URL.
  //// Ditto for Advanced and Multi.
  const showMulti = !doesUrlBeginWith('multiword') || thereIsSecondPartOfUrl
  const showAdvanced = !doesUrlBeginWith('advanced') || thereIsSecondPartOfUrl
  const showAbout = !doesUrlBeginWith('about') || thereIsSecondPartOfUrl

  return (
    <footer className={styles.footer}>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <span className={styles.footerCopyright}>© Duncan Ritchie</span>
          </li>

          {showHome && (
            <li>
              <Link href="/">Home</Link>
            </li>
          )}

          {showEnglish && (
            <li>
              <Link href="/english">English to Latin</Link>
            </li>
          )}

          {showMulti && (
            <li>
              <Link href="/multiword">Multi</Link>
            </li>
          )}

          {showSubwords && (
            <li>
              <Link href="/subwords">Subwords</Link>
            </li>
          )}

          {showAdvanced && (
            <li>
              <Link href="/advanced">Advanced</Link>
            </li>
          )}

          {showAbout && (
            <li>
              <Link href="/about">About</Link>
            </li>
          )}
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
