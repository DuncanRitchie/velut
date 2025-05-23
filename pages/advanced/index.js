import Link from 'next/link'
import { Fragment } from 'react'
import Header from '../../components/header/Header'
import AdvancedHead from '../../components/advanced/AdvancedHead'
import AdvancedRubric from '../../components/advanced/AdvancedRubric'
import AdvancedSearch from '../../components/advanced/AdvancedSearch'
import findAdvanced from '../../lib/words/advanced'
import { macraToHyphens } from '../../lib/words/diacritics'
import styles from '../../css/Subsites.module.css'

const Advanced = ({ query, isHomepage, words, error }) => {
  if (isHomepage) {
    return (
      <>
        <AdvancedHead />
        <div className={styles.advanced + ' fulmar-background'}>
          <Header textBeforeTitle="Advanced Search" />
          <AdvancedSearch query={query} />
          <AdvancedRubric />
        </div>
      </>
    )
  } else {
    let mappedWords = []
    if (words) {
      // Render a Link and a space for every word.
      mappedWords = words.map((word, index) => {
        return (
          <Fragment key={index}>
            <Link href={`../${macraToHyphens(word)}`} lang="la">
              {word}
            </Link>{' '}
          </Fragment>
        )
      })
    }
    let result = null
    if (error) {
      result = <p>Results could not be found; please try a different search. {error}</p>
    } else if (mappedWords.length) {
      result = (
        <div>
          <p>
            Here{' '}
            {mappedWords.length === 1
              ? 'is the 1 Latin word that fits'
              : `are the ${mappedWords.length} Latin words that fit`}{' '}
            the search.
          </p>
          <p>{mappedWords}</p>
        </div>
      )
    } else {
      result = <p>No results found! Please try a different search.</p>
    }
    return (
      <>
        <AdvancedHead />
        <div className={styles.advanced + ' fulmar-background'}>
          <Header textBeforeTitle="Advanced Search" />
          <div>
            <AdvancedSearch query={query} />
            <AdvancedRubric />
            <div className={styles.subsiteResult}>
              <h2>Search results</h2>
              {result}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Advanced

export async function getServerSideProps({ query, res }) {
  if (query.scansion || query.spelling) {
    const results = await findAdvanced(query)

    if (results.error) {
      res.statusCode = 400
    } else if (!results.words.length) {
      res.statusCode = 404
    }

    return {
      props: {
        isHomepage: false,
        query,
        ...results,
      },
    }
  } else {
    return {
      props: {
        isHomepage: true,
        query,
      },
    }
  }
}
