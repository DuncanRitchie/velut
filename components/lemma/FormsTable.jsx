import { Fragment } from 'react'
import Tabs from './Tabs'
import LatinLink from '../latinlink/LatinLink'
import styles from './FormsTable.module.css'
import { hyphensToMacra } from '../../lib/words/diacritics'

// Allows me to control whether an instance of <details>
// is open (expanded) by default.
const Details = ({ openByDefault, children }) => {
  if (openByDefault) {
    return <details open>{children}</details>
  }
  return <details>{children}</details>
}

// Most of the keys in the form data are suitable for display,
// but keys of more than one word will need added spaces.
const prettyPrintKey = (key) => {
  switch (key) {
    case 'futureperfect':
      return 'future perfect'
    default:
      return key
  }
}

// This is a recursive function that produces nested <dl> elements,
// matching the Json structure of the Forms data that were passed in.
const FormsTableForSomeForms = ({
  formsFromWordsCollection,
  Forms,
  linkBase,
  currentWordHyphenated,
}) => {
  if (!Forms) {
    return <>No forms!</>
  }
  if (Array.isArray(Forms)) {
    return Forms.map((form) => {
      if (formsFromWordsCollection.includes(form)) {
        return (
          <Fragment key={form}>
            <LatinLink
              linkBase={linkBase}
              targetWord={form}
              currentWordHyphenated={currentWordHyphenated}
            ></LatinLink>{' '}
          </Fragment>
        )
      } else {
        return <Fragment key={form}>{form} </Fragment>
      }
    })
  } else {
    const keyValuePairs = Object.entries(Forms).map(([key, value]) => {
      return (
        <div key={key}>
          <dt>{prettyPrintKey(key)}</dt>
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
}) => {
  return (
    <Details openByDefault={openByDefault}>
      <summary>All generated forms</summary>

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
  const foundIndex = Object.values(allForms).findIndex((value) =>
    doesFormsObjectContainCurrentWord(value),
  )
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
}) => {
  return (
    <Details openByDefault={openByDefault}>
      <summary id={lemma + '-forms-summary'}>All generated forms</summary>
      <Tabs
        id={id}
        ariaLabelledBy={lemma + '-forms-summary'}
        startTab={getTabForCurrentWord(Forms, currentWordHyphenated)}
      >
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
}) => {
  const isDisplayedInTabs = !!(
    Forms.unencliticized ||
    Forms.ne ||
    Forms.que ||
    Forms.ve
  )
  const formsTable = isDisplayedInTabs ? (
    <FormsTableWithEnclitics
      id={lemma}
      formsFromWordsCollection={formsFromWordsCollection}
      Forms={Forms}
      lemma={lemma}
      linkBase={linkBase}
      currentWordHyphenated={currentWordHyphenated}
      openByDefault={openByDefault}
    />
  ) : (
    <FormsTableWithoutEnclitics
      formsFromWordsCollection={formsFromWordsCollection}
      Forms={Forms}
      linkBase={linkBase}
      currentWordHyphenated={currentWordHyphenated}
      openByDefault={openByDefault}
    />
  )

  const classNames = isFullWidth
    ? styles.formsTable + ' ' + styles.fullWidth
    : styles.formsTable

  return <div className={classNames}>{formsTable}</div>
}

export default FormsTable
