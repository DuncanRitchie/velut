import { Link } from 'next/link'

import getRandomWord from '../../lib/words/random'

import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import Dictionaries from '../../components/dictionaries/Dictionaries'
import { hyphensToMacra, macraToHyphens } from '../../lib/words/diacritics'

import styles from '../../css/Word.module.css'
import subsiteStyles from '../../css/Subsites.module.css'

export async function getMetadata() {
  const { sanitisedInput } = await getNotFoundData()

  /* If no word was found, the document title & description need to come from the input. */
  return {
    title: `“${sanitisedInput}” (word not found) on velut — a Latin rhyming dictionary`,
    description: `“${sanitisedInput}” was not found on velut; please check in other dictionaries.`,
  }
}

export default async function NotFoundWordPage() {
  const { randomWord, sanitisedInput, type } = await getNotFoundData()

  const linkBase = type === '' ? '/' : '/' + type + '/'

  console.table({ randomWord, sanitisedInput, type, linkBase })

  return (
    <>
      <div className="fulmar-background">
        <Header />
        <Search type={type} searchbarLabel="Latin word" word={sanitisedInput} />
        <p className={subsiteStyles.showingResultsFor}>Showing results for</p>
        <h1 className={styles.foundWord} lang="la">
          {hyphensToMacra(sanitisedInput)}
        </h1>
        <div className={subsiteStyles.wordInfo}>
          {/* Bizarrely, <Link> throws but <a> doesn’t.
				Unhandled Runtime Error
				Error: Unsupported Server Component type: undefined
				*/}
          <p>
            Nothing was found. Try{' '}
            <a href={linkBase + macraToHyphens(randomWord)} lang="la">
              {randomWord}
            </a>
            .
          </p>
          <p>
            Or do you want to search from{' '}
            <a href={'/english/' + sanitisedInput}>English to Latin</a>?
          </p>
        </div>
        <Dictionaries category="Latin" sanitisedInput={sanitisedInput} />{' '}
      </div>
    </>
  )
}

async function getNotFoundData() {
  const randomWordObject = await getRandomWord()
  const randomWord = randomWordObject.word

  console.table(global.hackForNotFoundParams)

  // `global` prop is set in page.jsx.
  const { typeParam, sanitisedInput } = global.hackForNotFoundParams || {}
  // It’s polite to clean up after ourselves when mutating `global`.
  global.hackForNotFoundParams = undefined

  return {
    randomWord,
    sanitisedInput: sanitisedInput ?? '',
    type: typeParam ?? '',
  }
}
