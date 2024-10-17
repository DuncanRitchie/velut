import { GenericVerbDataCell } from './VerbFormsTable'
import { getTabForCurrentWord, getTabsId } from './FormsTable'
import Tabs from './Tabs'
import Details from '../details/Details'
import styles from './FormsTable.module.css'
import verbStyles from './VerbFormsTable.module.css'

// Note that <ParticiplesTable> may contain several instances of <TableForSomeParticiples>,
// which in turn may contain several instances of <TableForOneTenseAndVoice>,
// which in turn may contain several instances of <ParticipleDataRow>,
// which in turn may contain several instances of <VerbDataCell>!
// <VerbDataCell> is <GenericVerbDataCell> with some parameters curried in.

const TableForSomeParticiples = ({ formsFromWordsCollection, Forms, linkBase, currentWordHyphenated }) => {
  const VerbDataCell = ({ className, colSpan }) => {
    return GenericVerbDataCell({ className, colSpan, formsFromWordsCollection, Forms, linkBase, currentWordHyphenated })
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
          <col className="participle-column-7" />
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
