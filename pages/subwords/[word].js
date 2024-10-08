import { Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import { noMacra } from '../../lib/words/diacritics'
import getSubwords from '../../lib/words/subwords'
import { deleteCharacters, randomCountdownQuestionWeighted } from '../../lib/words/subwordsHelpers'
import styles from '../../css/Subsites.module.css'

// <Subwords/> is a JSX element rendered at /subwords/:word

const Subwords = ({ input, subwords, randomCountdownQuestionExample }) => {
  let mappedWords = []
  if (subwords) {
    mappedWords = subwords.map((word, index) => {
      // If we can delete from the input all the letters of the word and still have letters left over, we render a Link.
      let remainingLetters = deleteCharacters(noMacra(input), noMacra(word))
      if (remainingLetters) {
        return (
          <Fragment key={index}>
            <Link href={'./' + remainingLetters} lang="la">
              {word}
            </Link>{' '}
          </Fragment>
        )
      }
      // Otherwise the word is an anagram of input and we don’t render a Link.
      else {
        return (
          <Fragment key={index}>
            <strong>{word}</strong>{' '}
          </Fragment>
        )
      }
    })
  }
  let result = null
  if (mappedWords.length) {
    result = (
      <div>
        <p>
          Here {mappedWords.length === 1 ? 'is the 1 Latin word' : `are the ${mappedWords.length} Latin words`} that can
          be made out of letters in <strong lang="zxx">{input}</strong>
          .&nbsp; You can click on a word (if it’s not a perfect anagram) to delete its letters from{' '}
          <strong lang="zxx">{input}</strong>.
        </p>
        <p lang="la">{mappedWords}</p>
      </div>
    )
  } else {
    result = (
      <p>
        No subwords found!&nbsp; Try a different input, such as{' '}
        <Link href={'./' + randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.
      </p>
    )
  }
  const title = `Subwords of “${input}” on velut — a Latin rhyming dictionary`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={`Latin words made from the letters of “${input}”`} />
      </Head>
      <div className="fulmar-background">
        <Header textBeforeTitle="Subwords" />
        <div>
          <Search
            type="subwords"
            searchbarLabel="Text to find subwords of"
            lang="zxx"
            hideDropdown={true}
            word={input}
          />
          <div className={styles.subsiteResult}>{result}</div>
        </div>
      </div>
    </>
  )
}

export default Subwords

export async function getServerSideProps({ params, res }) {
  let input = params.word || ''
  //// If special characters are input, we can get percent-encoding problems.
  //// Let’s correct for that.
  if (input.search('%') > -1) {
    input = decodeURIComponent(input)
  }

  const subwordsObject = await getSubwords(input)
  const subwords = subwordsObject.subwords
  const randomCountdownQuestionExample = randomCountdownQuestionWeighted()

  if (subwords.length == 0) {
    res.statusCode = 404
  }

  return {
    props: {
      input,
      subwords,
      randomCountdownQuestionExample,
    },
  }
}
