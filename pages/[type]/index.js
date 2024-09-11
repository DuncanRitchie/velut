import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import findOneWord from '../../lib/words/word'
import dbConnect from '../../lib/dbConnect'
import getRandomWord from '../../lib/words/random'
import getHomographs from '../../lib/words/homographs'
import getRhymes from '../../lib/words/rhymes'
import getLemmata from '../../lib/lemmata'

import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import Dictionaries from '../../components/dictionaries/Dictionaries'
import Lemma from '../../components/lemma/Lemma'
import LatinLink from '../../components/latinlink/LatinLink'
import { hyphensToMacra, macraToHyphens } from '../../lib/words/diacritics'
import getScansionDescription from '../../lib/words/scansion'

import styles from '../../css/Word.module.css'
import subsiteStyles from '../../css/Subsites.module.css'
import ParsingsList from '../../components/parsingsList/ParsingsList'

const WordPage = ({
  sanitisedInput,
  randomWord,
  foundWord,
  homographs,
  rhymes,
  type,
  correctLemmata,
  incorrectLemmata,
  headingToDisplay,
}) => {
  let footName = ''
  let footNameArticle = 'a'
  let mappedRhymes = []
  let mappedHomographs = []
  let mappedCorrectLemmata = []
  let mappedIncorrectLemmata = []
  // All Links to other velut words will begin with linkBase.
  const linkBase = type === '' ? '/' : '/' + type + '/'

  if (foundWord) {
    const currentWordHyphenated = foundWord.Word && macraToHyphens(foundWord.Word)

    // Let’s find what metrical foot it is.
    if (foundWord.Scansion) {
      footName = getScansionDescription(foundWord.Scansion)
      if (footName) {
        if (
          footName.substr(0, 1) === 'a' ||
          footName.substr(0, 1) === 'e' ||
          footName.substr(0, 1) === 'i' ||
          footName.substr(0, 1) === 'o' ||
          footName.substr(0, 1) === 'u'
        ) {
          footNameArticle = 'an'
        }
      }
    }
    // Let’s find the rhymes.
    if (rhymes) {
      // A Next.js Link is rendered for every rhyme.
      mappedRhymes = rhymes.map((rhyme, index) => {
        return (
          <Fragment key={index}>
            <LatinLink linkBase={linkBase} targetWord={rhyme} currentWordHyphenated={currentWordHyphenated} />{' '}
          </Fragment>
        )
      })
    }
    // Let’s find the homographs.
    if (homographs) {
      // A Next.js Link is rendered for every homograph.
      mappedHomographs = homographs.map((homograph, index) => {
        return (
          homograph !== foundWord.Word && (
            <Fragment key={index}>
              {' '}
              <LatinLink linkBase={linkBase} targetWord={homograph} currentWordHyphenated={currentWordHyphenated} />
            </Fragment>
          )
        )
      })
    }
    // Let’s do the (correct) lemmata. We will render an element for every lemma listed against the input.
    mappedCorrectLemmata = correctLemmata.map((lemma, index) => {
      if (lemma) {
        return <Lemma key={index} lemma={lemma} linkBase={linkBase} currentWordHyphenated={currentWordHyphenated} />
      } else {
        return null
      }
    })
    // And we’ll also make JSX for the incorrect lemmata!
    // If I assigned a lemma to a word when I was storing the data in Excel, but realised that it was wrong when I was writing/testing the Inflector, it is recorded as an incorrect lemma in the `summary` collection in the database.
    // As of writing this, the `words` and `lemmata` collections still have data from Excel, so incorrect words still appear on velut.
    // The code here, and other code for handling incorrect lemmata, will be removed when the `words` collection has been refreshed based on the output of the Inflector, since incorrect words will no longer be in the collection.
    mappedIncorrectLemmata = incorrectLemmata.map((lemma, index, array) => {
      if (lemma) {
        return (
          <Fragment key={index}>
            <LatinLink
              targetWord={lemma.Lemma}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
              isLemma={true}
            />
            {index < array.length - 1 ? ' ' : <></>}
          </Fragment>
        )
      } else {
        return null
      }
    })
  }
  {
    /* If no word was found, the document title & description need to come from the input. */
  }
  const pageTitle = foundWord
    ? `“${foundWord.Word}” on velut — a Latin rhyming dictionary`
    : `“${sanitisedInput}” (word not found) on velut — a Latin rhyming dictionary`
  const pageDescription = foundWord
    ? `${headingToDisplay} for “${foundWord.Word}”, also showing its meaning, forms, cognates, and links to other dictionaries.`
    : `“${sanitisedInput}” was not found on velut; please check in other dictionaries.`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="Description" content={pageDescription} />
      </Head>
      <div className="fulmar-background">
        <Header />
        <Search type={type} searchbarLabel="Latin word" word={sanitisedInput} />
        <p className={subsiteStyles.showingResultsFor}>Showing results for</p>
        <h1 className={styles.foundWord} lang="la">
          {foundWord ? foundWord.Word : hyphensToMacra(sanitisedInput)}
        </h1>
        <div className={subsiteStyles.wordInfo}>
          {foundWord ? (
            <div>
              {mappedHomographs.length > 1 ? <p>(Other homographs:{mappedHomographs})</p> : null}
              <p>
                The word <strong lang="la">{foundWord.Word}</strong> could scan as{' '}
                <span className={styles.scansion}>{foundWord.Scansion}</span>
                {footName ? (
                  <>
                    {' '}
                    which&nbsp;is&nbsp;called {footNameArticle} {footName}.
                  </>
                ) : null}
              </p>
              <h2>{headingToDisplay}</h2>
              <p>{mappedRhymes}</p>
              <h2>Parsings</h2>
              {correctLemmata.length ? (
                <>
                  <ParsingsList form={foundWord.Word} lemmata={correctLemmata} />
                  <h2>Lemma information</h2>
                  <p>
                    <strong lang="la">{foundWord.Word}</strong> belongs to the following {correctLemmata.length}{' '}
                    {correctLemmata.length === 1 ? 'lemma' : 'lemmata'}:
                  </p>
                  {mappedCorrectLemmata}
                </>
              ) : (
                <>
                  {incorrectLemmata.length ? (
                    <p>
                      There’s been a mistake — the word <strong lang="la">{foundWord.Word}</strong> was added to velut
                      as a form of the {incorrectLemmata.length === 1 ? 'lemma' : 'lemmata'} {mappedIncorrectLemmata},
                      but this is probably wrong. I will remove it if it’s unacceptable Latin!
                    </p>
                  ) : (
                    <p>
                      There’s been a mistake — velut has no lemma information for{' '}
                      <strong lang="la">{foundWord.Word}</strong>. Please try another word.
                    </p>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              <p>
                Nothing was found. Try{' '}
                <Link href={linkBase + macraToHyphens(randomWord)} lang="la">
                  {randomWord}
                </Link>
                .
              </p>
              <p>
                Or do you want to search from <Link href={'/english/' + sanitisedInput}>English to Latin</Link>?
              </p>
            </>
          )}
        </div>
        <Dictionaries category="Latin" sanitisedInput={sanitisedInput} />
      </div>
    </>
  )
}

export default WordPage

export async function getServerSideProps({ params, res }) {
  await dbConnect()

  //// The URL is /:type/:word
  //// So for /anagrams/avis the type is "anagrams" & word is "avis"
  //// For a URL like /fu-lma-rus
  //// the type according to Next.js is "fu-lma-rus" and there is no :word.
  //// But "fu-lma-rus" should be treated as the word, not the type.
  //// So we get the type and the word from the URL, but if there’s no :word
  //// we use the :type as the word and the empty string as the type.
  const wordParam = params.hasOwnProperty('word') ? params.word : params.type ?? ''
  const typeParam = params.hasOwnProperty('word') ? params.type : ''
  const sanitisedInput = wordParam

  //// Fetch the word object from the database.
  const word = await findOneWord(sanitisedInput)

  if (word.word) {
    const wordAsObject = word.word.toObject()

    const homographsObject = await getHomographs(wordAsObject)
    const { homographs } = homographsObject

    const rhymesObject = await getRhymes(wordAsObject, typeParam)
    const { rhymes, headingToDisplay } = rhymesObject

    const lemmataObject = await getLemmata(wordAsObject)
    const lemmata = JSON.parse(lemmataObject.lemmata ?? '[]')

    const lemmataWithFormIncorrect = lemmata.filter((lemma) => {
      return lemma.incorrectForms?.includes(wordAsObject.Word)
    })

    const lemmataWithFormCorrect = lemmata.filter((lemma) => {
      return !lemma.incorrectForms?.includes(wordAsObject.Word)
    })

    return {
      props: {
        foundWord: wordAsObject,
        homographs,
        incorrectLemmata: lemmataWithFormIncorrect,
        correctLemmata: lemmataWithFormCorrect,
        rhymes,
        search: wordParam,
        headingToDisplay,
        sanitisedInput,
        type: typeParam,
      },
    }
  }
  //// If the word was not found, we find a random word and suggest it, with a 404 error.
  else {
    res.statusCode = 404

    const randomWordObject = await getRandomWord()
    const randomWord = randomWordObject.word
    return {
      props: {
        randomWord,
        sanitisedInput,
        type: typeParam,
      },
    }
  }
}
