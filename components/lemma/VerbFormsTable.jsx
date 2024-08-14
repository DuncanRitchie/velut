import { Details, getTabForCurrentWord, getTabsId, LatinLinksOrPlainText } from './FormsTable'
import Tabs from './Tabs'
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

const TableForSomeVerbForms = ({ formsFromWordsCollection, Forms, linkBase, currentWordHyphenated }) => {
  const VerbDataCell = ({ className }) => {
    const classesArray = className.split(' ')
    let forms = Forms
    classesArray.forEach((key) => {
      if (!forms) {
        return
      }
      forms = forms[key]
    })

    return (
      <td className={className}>
        <LatinLinksOrPlainText
          formsArray={forms}
          formsFromWordsCollection={formsFromWordsCollection}
          linkBase={linkBase}
          currentWordHyphenated={currentWordHyphenated}
        />
      </td>
    )
  }

  // Hardly any verbs should have a column for a future active infinitive.
  // The only exceptions are ‘sum’ & its compounds, which have ‘fore’ as a contraction of ‘futūrus esse’.
  const shouldShowFutureInfinitive = Boolean(Forms.infinitive?.active?.future)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th rowSpan="2" colSpan="2" className="indicative">
              indicative
            </th>
            <th colSpan="3" className="indicative singular">
              singular
            </th>
            <th colSpan="3" className="indicative plural">
              plural
            </th>
          </tr>
          <tr>
            <th className="indicative singular first">first</th>
            <th className="indicative singular second">second</th>
            <th className="indicative singular third">third</th>
            <th className="indicative plural first">first</th>
            <th className="indicative plural second">second</th>
            <th className="indicative plural third">third</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="6" className="indicative active">
              active
            </th>
            <th className="indicative active present">present</th>
            <VerbDataCell className="indicative active present singular first" />
            <VerbDataCell className="indicative active present singular second" />
            <VerbDataCell className="indicative active present singular third" />
            <VerbDataCell className="indicative active present plural first" />
            <VerbDataCell className="indicative active present plural second" />
            <VerbDataCell className="indicative active present plural third" />
          </tr>
          <tr>
            <th className="indicative active imperfect">imperfect</th>
            <VerbDataCell className="indicative active imperfect singular first" />
            <VerbDataCell className="indicative active imperfect singular second" />
            <VerbDataCell className="indicative active imperfect singular third" />
            <VerbDataCell className="indicative active imperfect plural first" />
            <VerbDataCell className="indicative active imperfect plural second" />
            <VerbDataCell className="indicative active imperfect plural third" />
          </tr>
          <tr>
            <th className="indicative active future">future</th>
            <VerbDataCell className="indicative active future singular first" />
            <VerbDataCell className="indicative active future singular second" />
            <VerbDataCell className="indicative active future singular third" />
            <VerbDataCell className="indicative active future plural first" />
            <VerbDataCell className="indicative active future plural second" />
            <VerbDataCell className="indicative active future plural third" />
          </tr>
          <tr>
            <th className="indicative active perfect">perfect</th>
            <VerbDataCell className="indicative active perfect singular first" />
            <VerbDataCell className="indicative active perfect singular second" />
            <VerbDataCell className="indicative active perfect singular third" />
            <VerbDataCell className="indicative active perfect plural first" />
            <VerbDataCell className="indicative active perfect plural second" />
            <VerbDataCell className="indicative active perfect plural third" />
          </tr>
          <tr>
            <th className="indicative active pluperfect">pluperfect</th>
            <VerbDataCell className="indicative active pluperfect singular first" />
            <VerbDataCell className="indicative active pluperfect singular second" />
            <VerbDataCell className="indicative active pluperfect singular third" />
            <VerbDataCell className="indicative active pluperfect plural first" />
            <VerbDataCell className="indicative active pluperfect plural second" />
            <VerbDataCell className="indicative active pluperfect plural third" />
          </tr>
          <tr>
            <th className="indicative active futureperfect">future perfect</th>
            <VerbDataCell className="indicative active futureperfect singular first" />
            <VerbDataCell className="indicative active futureperfect singular second" />
            <VerbDataCell className="indicative active futureperfect singular third" />
            <VerbDataCell className="indicative active futureperfect plural first" />
            <VerbDataCell className="indicative active futureperfect plural second" />
            <VerbDataCell className="indicative active futureperfect plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th rowSpan="3" className="indicative passive">
              passive
            </th>
            <th className="indicative passive present">present</th>
            <VerbDataCell className="indicative passive present singular first" />
            <VerbDataCell className="indicative passive present singular second" />
            <VerbDataCell className="indicative passive present singular third" />
            <VerbDataCell className="indicative passive present plural first" />
            <VerbDataCell className="indicative passive present plural second" />
            <VerbDataCell className="indicative passive present plural third" />
          </tr>
          <tr>
            <th className="indicative passive imperfect">imperfect</th>
            <VerbDataCell className="indicative passive imperfect singular first" />
            <VerbDataCell className="indicative passive imperfect singular second" />
            <VerbDataCell className="indicative passive imperfect singular third" />
            <VerbDataCell className="indicative passive imperfect plural first" />
            <VerbDataCell className="indicative passive imperfect plural second" />
            <VerbDataCell className="indicative passive imperfect plural third" />
          </tr>
          <tr>
            <th className="indicative passive future">future</th>
            <VerbDataCell className="indicative passive future singular first" />
            <VerbDataCell className="indicative passive future singular second" />
            <VerbDataCell className="indicative passive future singular third" />
            <VerbDataCell className="indicative passive future plural first" />
            <VerbDataCell className="indicative passive future plural second" />
            <VerbDataCell className="indicative passive future plural third" />
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th rowSpan="2" colSpan="2" className="subjunctive">
              subjunctive
            </th>
            <th colSpan="3" className="subjunctive singular">
              singular
            </th>
            <th colSpan="3" className="subjunctive plural">
              plural
            </th>
          </tr>
          <tr>
            <th className="subjunctive singular first">first</th>
            <th className="subjunctive singular second">second</th>
            <th className="subjunctive singular third">third</th>
            <th className="subjunctive plural first">first</th>
            <th className="subjunctive plural second">second</th>
            <th className="subjunctive plural third">third</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="4" className="subjunctive active">
              active
            </th>
            <th className="subjunctive active present">present</th>
            <VerbDataCell className="subjunctive active present singular first" />
            <VerbDataCell className="subjunctive active present singular second" />
            <VerbDataCell className="subjunctive active present singular third" />
            <VerbDataCell className="subjunctive active present plural first" />
            <VerbDataCell className="subjunctive active present plural second" />
            <VerbDataCell className="subjunctive active present plural third" />
          </tr>
          <tr>
            <th className="subjunctive active imperfect">imperfect</th>
            <VerbDataCell className="subjunctive active imperfect singular first" />
            <VerbDataCell className="subjunctive active imperfect singular second" />
            <VerbDataCell className="subjunctive active imperfect singular third" />
            <VerbDataCell className="subjunctive active imperfect plural first" />
            <VerbDataCell className="subjunctive active imperfect plural second" />
            <VerbDataCell className="subjunctive active imperfect plural third" />
          </tr>
          <tr>
            <th className="subjunctive active perfect">perfect</th>
            <VerbDataCell className="subjunctive active perfect singular first" />
            <VerbDataCell className="subjunctive active perfect singular second" />
            <VerbDataCell className="subjunctive active perfect singular third" />
            <VerbDataCell className="subjunctive active perfect plural first" />
            <VerbDataCell className="subjunctive active perfect plural second" />
            <VerbDataCell className="subjunctive active perfect plural third" />
          </tr>
          <tr>
            <th className="subjunctive active pluperfect">pluperfect</th>
            <VerbDataCell className="subjunctive active pluperfect singular first" />
            <VerbDataCell className="subjunctive active pluperfect singular second" />
            <VerbDataCell className="subjunctive active pluperfect singular third" />
            <VerbDataCell className="subjunctive active pluperfect plural first" />
            <VerbDataCell className="subjunctive active pluperfect plural second" />
            <VerbDataCell className="subjunctive active pluperfect plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th rowSpan="2" className="subjunctive passive">
              passive
            </th>
            <th className="subjunctive passive present">present</th>
            <VerbDataCell className="subjunctive passive present singular first" />
            <VerbDataCell className="subjunctive passive present singular second" />
            <VerbDataCell className="subjunctive passive present singular third" />
            <VerbDataCell className="subjunctive passive present plural first" />
            <VerbDataCell className="subjunctive passive present plural second" />
            <VerbDataCell className="subjunctive passive present plural third" />
          </tr>
          <tr>
            <th className="subjunctive passive imperfect">imperfect</th>
            <VerbDataCell className="subjunctive passive imperfect singular first" />
            <VerbDataCell className="subjunctive passive imperfect singular second" />
            <VerbDataCell className="subjunctive passive imperfect singular third" />
            <VerbDataCell className="subjunctive passive imperfect plural first" />
            <VerbDataCell className="subjunctive passive imperfect plural second" />
            <VerbDataCell className="subjunctive passive imperfect plural third" />
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th rowSpan="2" colSpan="2" className="imperative">
              imperative
            </th>
            <th colSpan="2" className="imperative singular">
              singular
            </th>
            <th colSpan="2" className="imperative plural">
              plural
            </th>
          </tr>
          <tr>
            <th className="imperative singular second">second</th>
            <th className="imperative singular third">third</th>
            <th className="imperative plural second">second</th>
            <th className="imperative plural third">third</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="2" className="imperative active">
              active
            </th>
            <th className="imperative active present">present</th>
            <VerbDataCell className="imperative active present singular second" />
            <VerbDataCell className="imperative active present singular third" />
            <VerbDataCell className="imperative active present plural second" />
            <VerbDataCell className="imperative active present plural third" />
          </tr>
          <tr>
            <th className="imperative active future">future</th>
            <VerbDataCell className="imperative active future singular second" />
            <VerbDataCell className="imperative active future singular third" />
            <VerbDataCell className="imperative active future plural second" />
            <VerbDataCell className="imperative active future plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th rowSpan="2" className="imperative passive">
              passive
            </th>
            <th className="imperative passive present">present</th>
            <VerbDataCell className="imperative passive present singular second" />
            <VerbDataCell className="imperative passive present singular third" />
            <VerbDataCell className="imperative passive present plural second" />
            <VerbDataCell className="imperative passive present plural third" />
          </tr>
          <tr>
            <th className="imperative passive future">future</th>
            <VerbDataCell className="imperative passive future singular second" />
            <VerbDataCell className="imperative passive future singular third" />
            <VerbDataCell className="imperative passive future plural second" />
            <VerbDataCell className="imperative passive future plural third" />
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            {/* Strictly speaking this doesn’t need a colSpan, but it makes the CSS easier! */}
            <th rowSpan="2" colSpan="2" className="infinitive">
              infinitive
            </th>
            <th colSpan={shouldShowFutureInfinitive ? 3 : 2} className="infinitive active">
              active
            </th>
            <th className="infinitive passive">passive</th>
          </tr>
          <tr>
            <th className="infinitive active present">present</th>
            <th className="infinitive active perfect">perfect</th>
            {shouldShowFutureInfinitive ? <th className="infinitive active future">future</th> : null}
            <th className="infinitive passive present">present</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* The colSpan here matches that of the “infinitive” header cell. */}
            <th colSpan="2" className="infinitive"></th>
            <VerbDataCell className="infinitive active present" />
            <VerbDataCell className="infinitive active perfect" />
            {shouldShowFutureInfinitive ? <VerbDataCell className="infinitive active future" /> : null}
            <VerbDataCell className="infinitive passive present" />
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th colSpan="4" className="gerund">
              gerund
            </th>
            <th colSpan="2" className="supine">
              supine
            </th>
          </tr>
          <tr>
            <th className="gerund accusative">accusative</th>
            <th className="gerund genitive">genitive</th>
            <th className="gerund dative">dative</th>
            <th className="gerund ablative">ablative</th>
            <th className="supine accusative">accusative</th>
            <th className="supine ablative">ablative</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbDataCell className="gerund accusative" />
            <VerbDataCell className="gerund genitive" />
            <VerbDataCell className="gerund dative" />
            <VerbDataCell className="gerund ablative" />
            <VerbDataCell className="supine accusative" />
            <VerbDataCell className="supine ablative" />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const VerbFormsTable = ({
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
            <TableForSomeVerbForms
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.unencliticized}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
          {Forms.ne ? <span lang="la">-ne</span> : null}
          {Forms.ne ? (
            <TableForSomeVerbForms
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.ne}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
          {Forms.que ? <span lang="la">-que</span> : null}
          {Forms.que ? (
            <TableForSomeVerbForms
              formsFromWordsCollection={formsFromWordsCollection}
              Forms={Forms.que}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
            />
          ) : null}
          {Forms.ve ? <span lang="la">-ve</span> : null}
          {Forms.ve ? (
            <TableForSomeVerbForms
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

export default VerbFormsTable
