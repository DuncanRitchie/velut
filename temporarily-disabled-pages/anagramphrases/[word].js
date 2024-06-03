import { Fragment } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import getAnagrams from '../../lib/words/anagramphrases'
import styles from '../../css/Subsites.module.css'

// <Anagrams/> is a JSX element rendered at /anagramphrases/:word

const Anagrams = ({ input, anagrams, error }) => {
  let mappedAnagrams = []
  if (anagrams) {
    mappedAnagrams = anagrams.map((anagram, index) => {
      return <li key={index}>{anagram}</li>
    })
  }
  let result = null
  if (error) {
    result = (
      <>
        <p>
          There was an error in fetching your anagrams! Please try again later,
          or try another search.
        </p>
        <p>{error}</p>
      </>
    )
  } else if (mappedAnagrams.length) {
    result = (
      <div>
        <p>
          Here{' '}
          {mappedAnagrams.length === 1
            ? 'is the 1 Latin anagram'
            : `are the ${mappedAnagrams.length} Latin anagrams`}{' '}
          of <strong lang="zxx">{input}</strong>.
        </p>
        <ul lang="la" className="anagrams">
          {mappedAnagrams}
        </ul>
      </div>
    )
  } else {
    result = <p>No anagrams found!&nbsp; Try a different input.</p>
  }
  const title = `Anagrams of “${input}” on velut — a Latin rhyming dictionary`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="Description"
          content={`Latin multi-word anagrams of “${input}”`}
        />
      </Head>
      <div className="fulmar-background">
        <Header textBeforeTitle="Anagram phrases" />
        <p className={styles.subsiteHomeRubric}>
          Caution — searches may take some minutes or fail completely.
        </p>
        <Search
          type="anagramphrases"
          word={input}
          searchbarLabel="Text to find anagrams of"
          lang="zxx"
          hideDropdown={true}
        />
        <div className={styles.subsiteResult}>{result}</div>
      </div>
    </>
  )
}

export default Anagrams

export async function getServerSideProps({ params, res }) {
  let input = params.word || ''
  //// If special characters are input, we can get percent-encoding problems.
  //// Let’s correct for that.
  if (input.search('%') > -1) {
    input = decodeURIComponent(input)
  }

  const anagramsObject = await getAnagrams(input)
  const { anagrams, error } = anagramsObject

  if (!anagrams?.length && !anagramsObject?.length) {
    res.statusCode = 404
  }

  //// Something weird is going on with the `getAnagrams` function.
  //// It should return an object containing the `anagrams` array, but for some reason
  //// it’s returning the array, so `anagramsObject` is the array of anagrams.
  return {
    props: {
      input,
      anagrams: anagrams || anagramsObject || [],
      error: error || '',
    },
  }
}
