import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import Lemma from '../../components/lemma/Lemma'
import Dictionaries from '../../components/dictionaries/Dictionaries'
import getEnglish from '../../lib/lemmata/english'
import styles from '../../css/Subsites.module.css'

const English = ({ lemmata, sanitisedInput }) => {
  const mappedLemmata = lemmata.map((lemma) => {
    return <Lemma key={lemma.Lemma} lemma={lemma} linkBase="../" />
  })

  const pageTitle = `English “${sanitisedInput}” to Latin on velut — a Latin rhyming dictionary`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="Description"
          content={`Latin words for the English “${sanitisedInput}”`}
        />
      </Head>
      <div className="fulmar-background">
        <Header textBeforeTitle="English to Latin" />
        <Search
          type="english"
          word={sanitisedInput}
          searchbarLabel="English word"
          searchbarTitle="Type an English word"
          lang="en"
          hideDropdown={true}
        />

        {lemmata.length ? (
          <>
            <div className={styles.wordInfo}>
              <h2>Search results</h2>
              <p>
                There{' '}
                {lemmata.length === 1
                  ? 'is 1 lemma'
                  : 'are ' + lemmata.length + ' lemmata'}{' '}
                with meanings containing “{sanitisedInput}”.
              </p>
              {mappedLemmata}
            </div>
          </>
        ) : (
          <p className={styles.showingResultsFor}>
            No results were found for “{sanitisedInput}”. Please try a different
            search.
          </p>
        )}

        <Dictionaries
          category="English-to-Latin"
          sanitisedInput={sanitisedInput}
        />
      </div>
    </>
  )
}

export default English

export async function getServerSideProps({ params, res }) {
  let sanitisedInput = params.word || ''
  //// If special characters are input, we can get percent-encoding problems.
  //// Let’s correct for that.
  if (sanitisedInput.search('%') > -1) {
    sanitisedInput = decodeURIComponent(sanitisedInput)
  }

  const englishObject = await getEnglish(sanitisedInput)
  const lemmata = englishObject.success ? JSON.parse(englishObject.lemmata) : []

  if (!englishObject.success) {
    res.statusCode = 404
  }

  return {
    props: {
      sanitisedInput,
      lemmata,
    },
  }
}
