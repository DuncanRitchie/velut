import { Fragment } from 'react'
import Tabs from './Tabs'
import LatinLink from '../latinlink/LatinLink'
import Details from '../details/Details'
import prettyPrintGrammaticalKey from '../../lib/lemmata/grammaticalKeys'
import { hyphensToMacra } from '../../lib/words/diacritics'
import styles from './FormsTable.module.css'

// The ID of each Tabs component needs to be distinct.
// This will be the case as long as `lemma` and `summary` are sensible string values (eg "amō", "participles").
const getTabsId = ({ lemma, summary }) => `${lemma}-${summary.replace(/\s/g, '').toLowerCase()}`

// `formsArray` is the array of strings that are forms to be displayed.
// `formsFromWordsCollection` is the array of strings that are words already in velut.
// This component displays the forms as links if they are in velut, and plaintext otherwise.
// Eg simplified, ["amantēs", "amantīs"] => <><a href="/amante-s">amantēs</a> amantīs</>
const LatinLinksOrPlainText = ({ formsArray, formsFromWordsCollection, linkBase, currentWordHyphenated }) => {
  if (!formsArray) {
    return <></>
  }
  return formsArray.map((form) => {
    if (formsFromWordsCollection.includes(form)) {
      return (
        <Fragment key={form}>
          <LatinLink linkBase={linkBase} targetWord={form} currentWordHyphenated={currentWordHyphenated}></LatinLink>{' '}
        </Fragment>
      )
    } else {
      return <Fragment key={form}>{form} </Fragment>
    }
  })
}

// This is a recursive function that produces nested <dl> elements,
// matching the Json structure of the Forms data that were passed in.
const FormsTableForSomeForms = ({ formsFromWordsCollection, Forms, linkBase, currentWordHyphenated }) => {
  if (!Forms) {
    return <>No forms!</>
  }
  if (Array.isArray(Forms)) {
    return LatinLinksOrPlainText({
      formsArray: Forms,
      formsFromWordsCollection,
      linkBase,
      currentWordHyphenated,
    })
  } else {
    const keyValuePairs = Object.entries(Forms).map(([key, value]) => {
      return (
        <div key={key}>
          <dt>{prettyPrintGrammaticalKey(key)}</dt>
          <dd>
            <FormsTableForSomeForms
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={value}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          </dd>
        </div>
      )
    })
    return <dl>{keyValuePairs}</dl>
  }
}

const FormsTableWithoutEnclitics = ({
  formsFromWordsCollection,
  Forms,
  linkBase,
  currentWordHyphenated,
  openByDefault,
  summary = 'Forms',
}) => {
  return (
    <Details openByDefault={openByDefault}>
      <summary>{summary}</summary>

      <FormsTableForSomeForms
        formsFromWordsCollection={formsFromWordsCollection}
        Forms={Forms}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
      />
    </Details>
  )
}

// The first tab that has the current word on it will be shown by default.
const getTabForCurrentWord = (allForms, currentWordHyphenated) => {
  // If there’s no current word, default to the first tab.
  if (!currentWordHyphenated) {
    return 0
  }

  // We could pass `currentWord` in as a prop of FormsTable,
  // but we’re already passing the hyphenated version in so let’s use that.
  const currentWord = hyphensToMacra(currentWordHyphenated)

  const doesFormsObjectContainCurrentWord = (someForms) => {
    if (Array.isArray(someForms)) {
      return someForms.includes(currentWord)
    }
    return Object.values(someForms).some(doesFormsObjectContainCurrentWord)
  }
  const foundIndex = Object.values(allForms).findIndex((value) => doesFormsObjectContainCurrentWord(value))
  // findIndex returns -1 if the word wasn’t found; let’s avoid that.
  return foundIndex === -1 ? 0 : foundIndex
}

const FormsTableWithEnclitics = ({
  id,
  formsFromWordsCollection,
  Forms,
  lemma,
  linkBase,
  currentWordHyphenated,
  openByDefault,
  summary = 'Forms',
}) => {
  const tabsId = getTabsId({ lemma, summary })

  return (
    <Details openByDefault={openByDefault}>
      <summary id={tabsId + '-summary'}>{summary}</summary>
      <Tabs id={id} ariaLabelledBy={tabsId + '-summary'} startTab={getTabForCurrentWord(Forms, currentWordHyphenated)}>
        {Forms.unencliticized ? 'Unencliticized' : null}
        {Forms.unencliticized ? (
          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.unencliticized}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        ) : null}
        {Forms.ne ? <span lang="la">-ne</span> : null}
        {Forms.ne ? (
          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.ne}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        ) : null}
        {Forms.que ? <span lang="la">-que</span> : null}
        {Forms.que ? (
          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.que}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        ) : null}
        {Forms.ve ? <span lang="la">-ve</span> : null}
        {Forms.ve ? (
          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.ve}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        ) : null}
      </Tabs>
    </Details>
  )
}

const FormsTable = ({
  formsFromWordsCollection,
  Forms,
  lemma,
  linkBase,
  currentWordHyphenated,
  openByDefault = true,
  isFullWidth = false,
  summary = 'All generated forms',
}) => {
  const isDisplayedInTabs = !!(Forms.unencliticized || Forms.ne || Forms.que || Forms.ve)
  const tabsId = getTabsId({ lemma, summary })
  const formsTable = isDisplayedInTabs ? (
    <FormsTableWithEnclitics
      id={tabsId}
      formsFromWordsCollection={formsFromWordsCollection}
      Forms={Forms}
      lemma={lemma}
      linkBase={linkBase}
      currentWordHyphenated={currentWordHyphenated}
      openByDefault={openByDefault}
      summary={summary}
    />
  ) : (
    <FormsTableWithoutEnclitics
      formsFromWordsCollection={formsFromWordsCollection}
      Forms={Forms}
      linkBase={linkBase}
      currentWordHyphenated={currentWordHyphenated}
      openByDefault={openByDefault}
      summary={summary}
    />
  )

  const classNames = isFullWidth ? styles.formsTable + ' ' + styles.fullWidth : styles.formsTable

  return <div className={classNames}>{formsTable}</div>
}

export default FormsTable
export { LatinLinksOrPlainText, getTabForCurrentWord, getTabsId }
