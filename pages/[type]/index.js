import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import findOneWord from '../../lib/words/word'
import dbConnect from '../../lib/dbConnect'
import urlFromSearch from '../../lib/urlFromSearch'
import getRandomWord from '../../lib/words/random'
import getHomographs from '../../lib/words/homographs'
import getRhymes from '../../lib/words/rhymes'
import getLemmata from '../../lib/lemmata'

import routes from '../../data/routes.json'

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
import PageArrow from '../../components/pageArrow/PageArrow'

const WordPage = ({
  sanitisedInput,
  randomWord,
  foundWord,
  homographs,
  rhymes,
  totalRhymesCount,
  pageNumber,
  pagesCount,
  type,
  isTypeParamValid,
  lemmata,
  headingToDisplay,
  shortRhymesDescription,
}) => {
  let footName = ''
  let footNameArticle = 'a'
  let mappedRhymes = []
  let mappedHomographs = []
  let mappedLemmata = []
  // All Links to other velut words will begin with linkBase.
  const linkBase = isTypeParamValid ? (type === '' ? '/' : '/' + type + '/') : '/'
  const numberFormatter = new Intl.NumberFormat('en-GB')

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
    // Let’s do the lemmata. We will render an element for every lemma listed against the input.
    mappedLemmata = isTypeParamValid
      ? lemmata.map((lemma, index) => {
          if (lemma) {
            return <Lemma key={index} lemma={lemma} linkBase={linkBase} currentWordHyphenated={currentWordHyphenated} />
          } else {
            return null
          }
        })
      : []
  }
  {
    /* If no word was found, the document title & description need to come from the input. */
  }
  const pageTitle = foundWord
    ? `‘${foundWord.Word}’ on velut — a Latin rhyming dictionary`
    : `‘${sanitisedInput}’ (word not found) on velut — a Latin rhyming dictionary`
  const pageDescription = foundWord
    ? `${headingToDisplay} for ‘${foundWord.Word}’, also showing its meaning, forms, cognates, and links to other dictionaries.`
    : `‘${sanitisedInput}’ was not found on velut; please check in other dictionaries.`

  // Eg "There are 5 possible rhymes; this is page 1 of 1."
  // or "Page 12 is not a valid page-number. There is only 1 page of rhymes, for 5 possible rhymes."
  // It is assumed that all values of `shortRhymesDescription` end with a plural s.
  const paginationText =
    pageNumber <= pagesCount ? (
      <>
        There {totalRhymesCount === 1 ? 'is' : 'are'} {numberFormatter.format(totalRhymesCount)} possible{' '}
        {totalRhymesCount === 1 ? shortRhymesDescription.replace(/s$/, '') : shortRhymesDescription}; this is page{' '}
        {numberFormatter.format(pageNumber)} of {numberFormatter.format(pagesCount)}.
      </>
    ) : (
      <>
        Page {pageNumber} is not a valid page-number. There {pagesCount === 1 ? 'is' : 'are'} only{' '}
        {numberFormatter.format(pagesCount)} {pagesCount === 1 ? 'page' : 'pages'} of {shortRhymesDescription}, for{' '}
        {numberFormatter.format(totalRhymesCount)} possible{' '}
        {totalRhymesCount === 1 ? shortRhymesDescription.replace(/s$/, '') : shortRhymesDescription}.
      </>
    )

  // JSX for pagination links: first, previous, next, last.
  // These do not get rendered if the link would be to the current page.
  // Prev/next links also don’t get rendered if the current page is not in range (eg Page 5 of 3).
  const firstPageLink =
    pageNumber > 1 ? (
      <a href="?page=1">
        {/* An alternative would be ⭰ for the left-arrow-to-bar symbol. */}
        <PageArrow>|←</PageArrow>
        &nbsp;First
      </a>
    ) : null
  const prevPageLink =
    pageNumber > 1 && pageNumber <= pagesCount ? (
      <a href={`?page=${pageNumber - 1}`}>
        <PageArrow>←</PageArrow>
        &nbsp;Previous
      </a>
    ) : null
  const nextPageLink =
    pageNumber < pagesCount ? (
      <a href={`?page=${pageNumber + 1}`}>
        Next&nbsp;
        <PageArrow>→</PageArrow>
      </a>
    ) : null
  const lastPageLink =
    pageNumber !== pagesCount ? (
      <a href={`?page=${pagesCount}`}>
        Last&nbsp;
        {/* An alternative would be ⭲ for the right-arrow-to-bar symbol. */}
        <PageArrow>→|</PageArrow>
      </a>
    ) : null

  const paginationLinks = (
    <>
      {firstPageLink} {prevPageLink} {nextPageLink} {lastPageLink}{' '}
    </>
  )

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="Description" content={pageDescription} />
      </Head>
      <div className="fulmar-background">
        <Header />
        <Search type={type} searchbarLabel="Latin word" word={sanitisedInput} />
        {!isTypeParamValid && foundWord ? (
          <div className={subsiteStyles.showingResultsFor}>
            <p>
              The parameter <i>{type}</i> is not a valid type of search! Did you mean to search for{' '}
              <Link href={'/' + foundWord.Word} lang="la">
                {foundWord.Word}
              </Link>{' '}
              as a Latin word?
            </p>
            <p>
              Or do you want to search from <Link href={'/english/' + sanitisedInput}>English to Latin</Link>?
            </p>
          </div>
        ) : null}
        {isTypeParamValid || !foundWord ? (
          <>
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
                  {pageNumber <= pagesCount ? <p>{mappedRhymes}</p> : null}
                  <div className={styles.paginationTexts}>
                    <p>{paginationText}</p>
                    <p>{paginationLinks}</p>
                  </div>
                  <h2>Parsings</h2>
                  {lemmata.length ? (
                    <>
                      <ParsingsList form={foundWord.Word} lemmata={lemmata} />
                      <h2>Lemma information</h2>
                      <p>
                        <strong lang="la">{foundWord.Word}</strong> belongs to the following {lemmata.length}{' '}
                        {lemmata.length === 1 ? 'lemma' : 'lemmata'}:
                      </p>
                      {mappedLemmata}
                    </>
                  ) : (
                    <>
                      <p>
                        There’s been a mistake — velut has no lemma information for{' '}
                        <strong lang="la">{foundWord.Word}</strong>. Please try another word.
                      </p>
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
          </>
        ) : null}

        <Dictionaries category="Latin" sanitisedInput={sanitisedInput} />
      </div>
    </>
  )
}

export default WordPage

export async function getServerSideProps({ params, query, res }) {
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
  const isTypeParamValid = routes.some((routeObject) => routeObject.route === typeParam)
  const sanitisedInput = wordParam
  const page = query.page || undefined

  //// Routes like /nonsense/verbum display a 404 page linking to /verbum
  if (!isTypeParamValid) {
    res.statusCode = 404
  }

  //// Fetch the word object from the database.
  const word = await findOneWord(sanitisedInput)

  if (word.word) {
    const wordAsObject = word.word.toObject()

    if (isTypeParamValid) {
      const homographsObject = await getHomographs(wordAsObject)
      const { homographs } = homographsObject

      const rhymesObject = await getRhymes(wordAsObject, typeParam, page)
      const { rhymes, totalRhymesCount, pageNumber, pagesCount, headingToDisplay, shortRhymesDescription } =
        rhymesObject

      const lemmataObject = await getLemmata(wordAsObject)
      const lemmata = JSON.parse(lemmataObject.lemmata ?? '[]')

      return {
        props: {
          foundWord: wordAsObject,
          homographs,
          lemmata,
          rhymes: rhymes ?? [],
          totalRhymesCount,
          pageNumber,
          pagesCount,
          search: wordParam,
          headingToDisplay,
          shortRhymesDescription,
          sanitisedInput,
          type: typeParam,
          isTypeParamValid,
        },
      }
    } else {
      return {
        props: {
          foundWord: wordAsObject,
          search: wordParam,
          sanitisedInput,
          type: typeParam,
          isTypeParamValid,
        },
      }
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
        isTypeParamValid,
      },
    }
  }
}
