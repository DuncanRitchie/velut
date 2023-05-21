import { Fragment } from 'react'
import Tabs from './Tabs'

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
  return (
    <pre>
      {prettyPrintJson(Forms)
        .split('\n')
        .map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
    </pre>
  )
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
  formsFromWordsCollection,
  Forms,
  linkBase,
  currentWordHyphenated,
}) => {
  return (
    <details
      open
      style={{ textAlign: 'left', tabSize: 2, paddingLeft: '1rem' }}
    >
      <summary>All generated forms</summary>

      <details open>
        <summary>Unencliticized</summary>

        <FormsTableForSomeForms
          formsFromWordsCollection={formsFromWordsCollection}
          Forms={Forms.unencliticized}
          linkBase={linkBase}
          currentWordHyphenated={currentWordHyphenated}
        />
      </details>

      {Forms.ne ? (
        <details open>
          <summary>-ne</summary>

          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.ne}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        </details>
      ) : null}

      {Forms.que ? (
        <details open>
          <summary>-que</summary>

          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.que}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        </details>
      ) : null}

      {Forms.ve ? (
        <details open>
          <summary>-ve</summary>

          <FormsTableForSomeForms
            formsFromWordsCollection={formsFromWordsCollection}
            Forms={Forms.ve}
            linkBase={linkBase}
            currentWordHyphenated={currentWordHyphenated}
          />
        </details>
      ) : null}
    </details>
  )
}

const FormsTable = ({
  formsFromWordsCollection,
  Forms,
  linkBase,
  currentWordHyphenated,
}) => {
  if (Forms.unencliticized) {
    return (
      <FormsTableWithEnclitics
        formsFromWordsCollection={formsFromWordsCollection}
        Forms={Forms}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
      />
    )
  } else {
    return (
      <>
        <Tabs />
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
