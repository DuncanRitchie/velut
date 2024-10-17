import { getTabForCurrentWord, getTabsId, LatinLinksOrPlainText } from './FormsTable'
import Tabs from './Tabs'
import Details from '../details/Details'
import styles from './FormsTable.module.css'
import verbStyles from './VerbFormsTable.module.css'

// Every <th> and every <td> cell has a className attribute that lists grammatical keys, eg "infinitive active present".
// This enables the correct <th> cells to be highlighted when any <td> or <th> cell is hovered.
// <th> cells are marked up directly in the JSX, but <VerbDataCell> is used for <td>.
// The <VerbDataCell> component creates a <td> element with the given className, and the element’s content
// is found from the Forms object by following the className (eg `Forms.infinitive.active.present`).
// Therefore the order of the grammatical keys is important.
// For example, <VerbDataCell className="infinitive active present" />
// might become HTML <td className="infinitive active present">clāmāre</td>

// Note that ParticiplesTable may contain several instances of TableForSomeParticiples,
// which in turn may contain several instances of TableForOneTenseAndVoice,
// which in turn may contain several instances of ParticipleDataRow,
// which in turn may contain several instances of VerbDataCell!

const TableForSomeParticiples = ({ formsFromWordsCollection, Forms, linkBase, currentWordHyphenated }) => {
  const VerbDataCell = ({ className, colSpan }) => {
    const classesArray = className.split(' ')
    let forms = Forms
    classesArray.forEach((key) => {
      if (!forms) {
        return
      }
      forms = forms[key]
    })

    return (
      <td className={className} colSpan={colSpan || null}>
        <LatinLinksOrPlainText
          formsArray={forms}
          formsFromWordsCollection={formsFromWordsCollection}
          linkBase={linkBase}
          currentWordHyphenated={currentWordHyphenated}
        />
      </td>
    )
  }

  const TableForOneTenseAndVoice = ({ tense, voice }) => {
    if (!Forms.participle[voice]?.[tense]) {
      return null
    }

    // The parameter would be called `case` but that’s a keyword in JavaScript.
    const ParticipleDataRow = ({ grammaticalCase }) => {
      if (!Forms.participle[voice]?.[tense]?.masculine?.singular?.[grammaticalCase]) {
        return null
      }
      return (
        <tr>
          <th className={`participle ${voice} ${tense} ${grammaticalCase}`}>{grammaticalCase}</th>
          <VerbDataCell className={`participle ${voice} ${tense} masculine singular ${grammaticalCase}`} />
          <VerbDataCell className={`participle ${voice} ${tense} masculine plural ${grammaticalCase}`} />
          <VerbDataCell className={`participle ${voice} ${tense} feminine singular ${grammaticalCase}`} />
          <VerbDataCell className={`participle ${voice} ${tense} feminine plural ${grammaticalCase}`} />
          <VerbDataCell className={`participle ${voice} ${tense} neuter singular ${grammaticalCase}`} />
          <VerbDataCell className={`participle ${voice} ${tense} neuter plural ${grammaticalCase}`} />
        </tr>
      )
    }

    return (
      <table>
        {/* <col> elements are used in each <table> where columns should have consistent widths.
        That is, the width of column-1 should ideally be the same in each table, etc.
        <colgroup> is only really needed to make the HTML valid. */}
        <colgroup>
          <col className="participle-column-1" />
          <col className="participle-column-2" />
          <col className="participle-column-3" />
          <col className="participle-column-4" />
          <col className="participle-column-5" />
          <col className="participle-column-6" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan="2" className={`participle ${tense} ${voice}`}>
              {tense} {voice}
            </th>
            <th colSpan="2" className={`participle ${tense} ${voice} masculine`}>
              masculine
            </th>
            <th colSpan="2" className={`participle ${tense} ${voice} feminine`}>
              feminine
            </th>
            <th colSpan="2" className={`participle ${tense} ${voice} neuter`}>
              neuter
            </th>
          </tr>
          <tr>
            <th className={`participle ${tense} ${voice} masculine singular`}>singular</th>
            <th className={`participle ${tense} ${voice} masculine plural`}>plural</th>
            <th className={`participle ${tense} ${voice} feminine singular`}>singular</th>
            <th className={`participle ${tense} ${voice} feminine plural`}>plural</th>
            <th className={`participle ${tense} ${voice} neuter singular`}>singular</th>
            <th className={`participle ${tense} ${voice} neuter plural`}>plural</th>
          </tr>
        </thead>
        <tbody>
          <ParticipleDataRow grammaticalCase="nominative" />
          <ParticipleDataRow grammaticalCase="vocative" />
          <ParticipleDataRow grammaticalCase="accusative" />
          <ParticipleDataRow grammaticalCase="genitive" />
          <ParticipleDataRow grammaticalCase="dative" />
          <ParticipleDataRow grammaticalCase="ablative" />
        </tbody>
      </table>
    )
  }

  return (
    <>
      <TableForOneTenseAndVoice tense="present" voice="active" />
      <TableForOneTenseAndVoice tense="perfect" voice="active" />
      <TableForOneTenseAndVoice tense="perfect" voice="passive" />
      <TableForOneTenseAndVoice tense="future" voice="active" />
      <TableForOneTenseAndVoice tense="future" voice="passive" />
    </>
  )
}

const ParticiplesTable = ({
  formsFromWordsCollection,
  Forms,
  lemma,
  linkBase,
  currentWordHyphenated,
  openByDefault,
  isFullWidth = true,
  summary = 'All generated forms',
}) => {
  const tabsId = getTabsId({ lemma, summary })

  // I could probably refactor this CSS Modules malarkey.
  const classNames = isFullWidth
    ? `${styles.formsTable} ${styles.fullWidth} ${verbStyles.verbFormsTable}`
    : styles.formsTable + ' ' + verbStyles.verbFormsTable

  return (
    <div className={classNames}>
      <Details openByDefault={openByDefault}>
        <summary id={tabsId + '-summary'}>{summary}</summary>
        <Tabs
          id={tabsId}
          ariaLabelledBy={tabsId + '-summary'}
          startTab={getTabForCurrentWord(Forms, currentWordHyphenated)}
        >
          {Forms.unencliticized ? 'Unencliticized' : null}
          {Forms.unencliticized ? (
            <TableForSomeParticiples
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.unencliticized}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
          {Forms.ne ? <span lang="la">-ne</span> : null}
          {Forms.ne ? (
            <TableForSomeParticiples
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.ne}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
          {Forms.que ? <span lang="la">-que</span> : null}
          {Forms.que ? (
            <TableForSomeParticiples
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.que}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
          {Forms.ve ? <span lang="la">-ve</span> : null}
          {Forms.ve ? (
            <TableForSomeParticiples
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.ve}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
        </Tabs>
      </Details>
    </div>
  )
}

export default ParticiplesTable
