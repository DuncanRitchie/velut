import { Fragment } from 'react'
import Tabs from './Tabs'
import LatinLink from '../latinlink/LatinLink'

//// This function is copied from the Inflector.
function prettyPrintJson(text) {
  return JSON.stringify(text, null, '\t')
    .replace(/(?<=": \[)\n\s*/g, '') // Delete newline at start of array
    .replace(/(?<="|\d)\n\s*(?=\])/g, '') // Delete newline at end of array
    .replace(/\n\s+(?=[^:{}]+\n)/g, ' ') // Delete newlines between array items
}

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
        <Fragment key={key}>
          <dt>{key}</dt>
          <dd>
            <FormsTableForSomeForms
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={value}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          </dd>
        </Fragment>
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
}) => {
  return (
    <details open style={{ textAlign: 'left', tabSize: 2 }}>
      <summary>All generated forms</summary>

      <FormsTableForSomeForms
        formsFromWordsCollection={formsFromWordsCollection}
        Forms={Forms}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
      />
    </details>
  )
}

const FormsTableWithEnclitics = ({
  id,
  formsFromWordsCollection,
  Forms,
  lemma,
  linkBase,
  currentWordHyphenated,
}) => {
  return (
    <details
      open
      style={{
        textAlign: 'left',
        tabSize: 2,
        marginLeft: '1rem',
        width: 'calc(100% - 2rem)',
      }}
    >
      <summary
        id={lemma + '-forms-summary'}
        style={{ display: 'inline', width: 'max-content' }}
      >
        All generated forms
      </summary>
      <Tabs id={id} ariaLabelledBy={lemma + '-forms-summary'}>
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
    </details>
  )
}

const FormsTable = ({
  formsFromWordsCollection,
  Forms,
  lemma,
  linkBase,
  currentWordHyphenated,
}) => {
  if (Forms.unencliticized || Forms.ne) {
    return (
      <FormsTableWithEnclitics
        id={lemma}
        formsFromWordsCollection={formsFromWordsCollection}
        Forms={Forms}
        lemma={lemma}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
      />
    )
  } else {
    return (
      <>
        <FormsTableWithoutEnclitics
          formsFromWordsCollection={formsFromWordsCollection}
          Forms={Forms}
          linkBase={linkBase}
          currentWordHyphenated={currentWordHyphenated}
        />
      </>
    )
  }
}

export default FormsTable
