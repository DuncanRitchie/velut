import { getTabForCurrentWord, getTabsId, LatinLinksOrPlainText } from './FormsTable'
import Tabs from './Tabs'
import Details from '../details/Details'
import styles from './FormsTable.module.css'
import verbStyles from './VerbFormsTable.module.css'

// In the tables of verb forms, <th> cells have `data-id` attributes, which are unique within the <table> element.
// Every cell has a `data-headers` attribute, which lists the <th> cells (via their `data-id`) that are the headers for the cell.
// This allows the appropriate header cells to be highlighted (via CSS) whenever a cell is hovered.

// A more standard way of communicating what <th> cells are the headers of what <th>/<td> cells is to use `id` and `headers` attributes.
// But screen-readers (etc) don’t have great support for that, and `id` elements must be unique to the page, not just to the table.
// If my `data-id` & `data-headers` attributes are to be converted to `id` & `headers`, a unique key will need to be generated
// for each table and appended to each ID, and my CSS would also require modification (unless the data- attributes are kept alongside `id`/`headers`).
// Furthermore, a <th>’s `headers` attribute probably shouldn’t contain its own `id` (a cell cannot semantically be its own header),
// but I would still want the cell to be highlighted on hover.

// Given an array of classes, eg ['indicative', 'active', 'present', 'singular', 'first'],
// this function returns the IDs of the <th> cells that are headers for the cell,
// such as ['indicative', 'singular', 'first-singular', 'active', 'present-active']
// If the cell with these classes is <th>, the last header ID should be used for the `data-id` attribute.
function getHeaderIds(classesArray) {
  let headerIds = []
  const mood = classesArray.find((key) =>
    ['indicative', 'subjunctive', 'imperative', 'infinitive', 'gerund', 'supine', 'participle'].includes(key),
  )
  const number = classesArray.find((key) => ['singular', 'plural'].includes(key))
  const voice = classesArray.find((key) => ['active', 'passive'].includes(key))
  const gerundOrSupine = classesArray.find((key) => ['gerund', 'supine'].includes(key))
  const gender = classesArray.find((key) => ['masculine', 'feminine', 'neuter'].includes(key))
  const person = classesArray.find((key) => ['first', 'second', 'third'].includes(key))
  const tense = classesArray.find((key) =>
    ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'futureperfect'].includes(key),
  )
  const grammaticalCase = classesArray.find((key) =>
    ['nominative', 'vocative', 'accusative', 'genitive', 'dative', 'ablative'].includes(key),
  )
  // Since the last header ID will be used for the ID of any <th> cell, the order of the `push` statements below matters.
  if (mood) {
    headerIds.push(mood)
  }
  if (voice) {
    headerIds.push(voice)
    if (tense) {
      headerIds.push(voice + '-' + tense)
    }
  }
  if (grammaticalCase) {
    if (gerundOrSupine) {
      headerIds.push(gerundOrSupine)
      headerIds.push(grammaticalCase + '-' + gerundOrSupine)
    } else {
      headerIds.push(grammaticalCase)
    }
  }
  if (number) {
    if (person) {
      headerIds.push(number)
      headerIds.push(person + '-' + number)
    } else if (gender) {
      headerIds.push(gender)
      headerIds.push(number + '-' + gender)
    } else {
      headerIds.push(number)
    }
  } else if (gender) {
    headerIds.push(gender)
  }
  return headerIds
}

const VerbHeaderCell = ({ className, colSpan, rowSpan, children }) => {
  const headers = getHeaderIds(className.split(' '))
  return (
    <th colSpan={colSpan} rowSpan={rowSpan} data-headers={headers.join(' ')} data-id={headers.at(-1)}>
      {children}
    </th>
  )
}

// Every <th> and every <td> cell has a className attribute that lists grammatical keys, eg "infinitive active present".
// This enables the correct <th> cells to be highlighted when any <td> or <th> cell is hovered (via the data-headers attribute).
// <th>/<td> cells are not marked up directly in the JSX, but <VerbHeaderCell> & <VerbDataCell> are used instead.
// The <VerbDataCell> component receives a className and creates a <td> element, and the element’s content
// is found from the Forms object by following the className (eg `Forms.infinitive.active.present`).
// Therefore the order of the grammatical keys is important.
// For example, <VerbDataCell className="infinitive active present" />
// might become HTML <td data-headers="infinitive active present-active">clāmāre</td>
// <VerbDataCell> is <GenericVerbDataCell> with some parameters curried in.
const GenericVerbDataCell = ({
  className,
  colSpan,
  formsFromWordsCollection,
  Forms,
  linkBase,
  currentWordHyphenated,
}) => {
  const classesArray = className.split(' ')
  let forms = Forms
  classesArray.forEach((key) => {
    if (!forms) {
      return
    }
    forms = forms[key]
  })

  return (
    <td data-headers={getHeaderIds(classesArray).join(' ')} colSpan={colSpan || null}>
      <LatinLinksOrPlainText
        formsArray={forms}
        formsFromWordsCollection={formsFromWordsCollection}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
      />
    </td>
  )
}

const TableForSomeVerbForms = ({ formsFromWordsCollection, Forms, linkBase, currentWordHyphenated }) => {
  const VerbDataCell = ({ className, colSpan }) => {
    return GenericVerbDataCell({ className, colSpan, formsFromWordsCollection, Forms, linkBase, currentWordHyphenated })
  }

  // Hardly any verbs should have a column for a future active infinitive.
  // The only exceptions are ‘sum’ & its compounds, which have ‘fore’ as a contraction of ‘futūrus esse’.
  const shouldShowFutureInfinitive = Boolean(Forms.infinitive?.active?.future)

  return (
    <>
      <table>
        {/* <col> elements are used in each <table> where columns should have consistent widths.
        That is, the width of column-1 should ideally be the same in each table, etc.
        <colgroup> is only really needed to make the HTML valid. */}
        <colgroup>
          <col className="column-1" />
          <col className="column-2" />
          <col className="column-3" />
          <col className="column-4" />
          <col className="column-5" />
          <col className="column-6" />
          <col className="column-7" />
          <col className="column-8" />
        </colgroup>
        <thead>
          <tr>
            <VerbHeaderCell rowSpan="2" colSpan="2" className="indicative">
              indicative
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" className="indicative singular">
              singular
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" className="indicative plural">
              plural
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell className="indicative singular first">first</VerbHeaderCell>
            <VerbHeaderCell className="indicative singular second">second</VerbHeaderCell>
            <VerbHeaderCell className="indicative singular third">third</VerbHeaderCell>
            <VerbHeaderCell className="indicative plural first">first</VerbHeaderCell>
            <VerbHeaderCell className="indicative plural second">second</VerbHeaderCell>
            <VerbHeaderCell className="indicative plural third">third</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="6" className="indicative active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell className="indicative active present">present</VerbHeaderCell>
            <VerbDataCell className="indicative active present singular first" />
            <VerbDataCell className="indicative active present singular second" />
            <VerbDataCell className="indicative active present singular third" />
            <VerbDataCell className="indicative active present plural first" />
            <VerbDataCell className="indicative active present plural second" />
            <VerbDataCell className="indicative active present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative active imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell className="indicative active imperfect singular first" />
            <VerbDataCell className="indicative active imperfect singular second" />
            <VerbDataCell className="indicative active imperfect singular third" />
            <VerbDataCell className="indicative active imperfect plural first" />
            <VerbDataCell className="indicative active imperfect plural second" />
            <VerbDataCell className="indicative active imperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative active future">future</VerbHeaderCell>
            <VerbDataCell className="indicative active future singular first" />
            <VerbDataCell className="indicative active future singular second" />
            <VerbDataCell className="indicative active future singular third" />
            <VerbDataCell className="indicative active future plural first" />
            <VerbDataCell className="indicative active future plural second" />
            <VerbDataCell className="indicative active future plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative active perfect">perfect</VerbHeaderCell>
            <VerbDataCell className="indicative active perfect singular first" />
            <VerbDataCell className="indicative active perfect singular second" />
            <VerbDataCell className="indicative active perfect singular third" />
            <VerbDataCell className="indicative active perfect plural first" />
            <VerbDataCell className="indicative active perfect plural second" />
            <VerbDataCell className="indicative active perfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative active pluperfect">pluperfect</VerbHeaderCell>
            <VerbDataCell className="indicative active pluperfect singular first" />
            <VerbDataCell className="indicative active pluperfect singular second" />
            <VerbDataCell className="indicative active pluperfect singular third" />
            <VerbDataCell className="indicative active pluperfect plural first" />
            <VerbDataCell className="indicative active pluperfect plural second" />
            <VerbDataCell className="indicative active pluperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative active futureperfect">future perfect</VerbHeaderCell>
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
            <VerbHeaderCell rowSpan="3" className="indicative passive">
              passive
            </VerbHeaderCell>
            <VerbHeaderCell className="indicative passive present">present</VerbHeaderCell>
            <VerbDataCell className="indicative passive present singular first" />
            <VerbDataCell className="indicative passive present singular second" />
            <VerbDataCell className="indicative passive present singular third" />
            <VerbDataCell className="indicative passive present plural first" />
            <VerbDataCell className="indicative passive present plural second" />
            <VerbDataCell className="indicative passive present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative passive imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell className="indicative passive imperfect singular first" />
            <VerbDataCell className="indicative passive imperfect singular second" />
            <VerbDataCell className="indicative passive imperfect singular third" />
            <VerbDataCell className="indicative passive imperfect plural first" />
            <VerbDataCell className="indicative passive imperfect plural second" />
            <VerbDataCell className="indicative passive imperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="indicative passive future">future</VerbHeaderCell>
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
        <colgroup>
          <col className="column-1" />
          <col className="column-2" />
          <col className="column-3" />
          <col className="column-4" />
          <col className="column-5" />
          <col className="column-6" />
          <col className="column-7" />
          <col className="column-8" />
        </colgroup>
        <thead>
          <tr>
            <VerbHeaderCell rowSpan="2" colSpan="2" className="subjunctive">
              subjunctive
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" className="subjunctive singular">
              singular
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" className="subjunctive plural">
              plural
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell className="subjunctive singular first">first</VerbHeaderCell>
            <VerbHeaderCell className="subjunctive singular second">second</VerbHeaderCell>
            <VerbHeaderCell className="subjunctive singular third">third</VerbHeaderCell>
            <VerbHeaderCell className="subjunctive plural first">first</VerbHeaderCell>
            <VerbHeaderCell className="subjunctive plural second">second</VerbHeaderCell>
            <VerbHeaderCell className="subjunctive plural third">third</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="4" className="subjunctive active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell className="subjunctive active present">present</VerbHeaderCell>
            <VerbDataCell className="subjunctive active present singular first" />
            <VerbDataCell className="subjunctive active present singular second" />
            <VerbDataCell className="subjunctive active present singular third" />
            <VerbDataCell className="subjunctive active present plural first" />
            <VerbDataCell className="subjunctive active present plural second" />
            <VerbDataCell className="subjunctive active present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="subjunctive active imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell className="subjunctive active imperfect singular first" />
            <VerbDataCell className="subjunctive active imperfect singular second" />
            <VerbDataCell className="subjunctive active imperfect singular third" />
            <VerbDataCell className="subjunctive active imperfect plural first" />
            <VerbDataCell className="subjunctive active imperfect plural second" />
            <VerbDataCell className="subjunctive active imperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="subjunctive active perfect">perfect</VerbHeaderCell>
            <VerbDataCell className="subjunctive active perfect singular first" />
            <VerbDataCell className="subjunctive active perfect singular second" />
            <VerbDataCell className="subjunctive active perfect singular third" />
            <VerbDataCell className="subjunctive active perfect plural first" />
            <VerbDataCell className="subjunctive active perfect plural second" />
            <VerbDataCell className="subjunctive active perfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="subjunctive active pluperfect">pluperfect</VerbHeaderCell>
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
            <VerbHeaderCell rowSpan="2" className="subjunctive passive">
              passive
            </VerbHeaderCell>
            <VerbHeaderCell className="subjunctive passive present">present</VerbHeaderCell>
            <VerbDataCell className="subjunctive passive present singular first" />
            <VerbDataCell className="subjunctive passive present singular second" />
            <VerbDataCell className="subjunctive passive present singular third" />
            <VerbDataCell className="subjunctive passive present plural first" />
            <VerbDataCell className="subjunctive passive present plural second" />
            <VerbDataCell className="subjunctive passive present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="subjunctive passive imperfect">imperfect</VerbHeaderCell>
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
        <colgroup>
          <col className="column-1" />
          <col className="column-2" />
          <col className="column-3" />
          <col className="column-4" />
          <col className="column-5" />
          <col className="column-6" />
          <col className="column-7" />
          <col className="column-8" />
        </colgroup>
        <thead>
          <tr>
            <VerbHeaderCell rowSpan="2" colSpan="3" className="imperative">
              imperative
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" className="imperative singular">
              singular
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="2" className="imperative plural">
              plural
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell className="imperative singular second">second</VerbHeaderCell>
            <VerbHeaderCell className="imperative singular third" colSpan="2">
              third
            </VerbHeaderCell>
            <VerbHeaderCell className="imperative plural second">second</VerbHeaderCell>
            <VerbHeaderCell className="imperative plural third">third</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="2" className="imperative active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell className="imperative active present" colSpan="2">
              present
            </VerbHeaderCell>
            <VerbDataCell className="imperative active present singular second" />
            <VerbDataCell className="imperative active present singular third" colSpan="2" />
            <VerbDataCell className="imperative active present plural second" />
            <VerbDataCell className="imperative active present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="imperative active future" colSpan="2">
              future
            </VerbHeaderCell>
            <VerbDataCell className="imperative active future singular second" />
            <VerbDataCell className="imperative active future singular third" colSpan="2" />
            <VerbDataCell className="imperative active future plural second" />
            <VerbDataCell className="imperative active future plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="2" className="imperative passive">
              passive
            </VerbHeaderCell>
            <VerbHeaderCell className="imperative passive present" colSpan="2">
              present
            </VerbHeaderCell>
            <VerbDataCell className="imperative passive present singular second" />
            <VerbDataCell className="imperative passive present singular third" colSpan="2" />
            <VerbDataCell className="imperative passive present plural second" />
            <VerbDataCell className="imperative passive present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell className="imperative passive future" colSpan="2">
              future
            </VerbHeaderCell>
            <VerbDataCell className="imperative passive future singular second" />
            <VerbDataCell className="imperative passive future singular third" colSpan="2" />
            <VerbDataCell className="imperative passive future plural second" />
            <VerbDataCell className="imperative passive future plural third" />
          </tr>
        </tbody>
      </table>

      <table>
        {/* This <col> is specifically given a width in CSS. */}
        <colgroup>
          <col />
        </colgroup>
        {/* We don’t need more <colgroup>/<col> elements in the infinitives table, because the widths of subsequent columns are not set. */}
        <thead>
          <tr>
            <VerbHeaderCell rowSpan="2" className="infinitive">
              infinitive
            </VerbHeaderCell>
            <VerbHeaderCell colSpan={shouldShowFutureInfinitive ? 3 : 2} className="infinitive active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell className="infinitive passive">passive</VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell className="infinitive active present">present</VerbHeaderCell>
            <VerbHeaderCell className="infinitive active perfect">perfect</VerbHeaderCell>
            {shouldShowFutureInfinitive ? (
              <VerbHeaderCell className="infinitive active future">future</VerbHeaderCell>
            ) : null}
            <VerbHeaderCell className="infinitive passive present">present</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="infinitive" data-headers="infinitive">
              {/* empty cell should not have data-id so can’t use VerbHeaderCell */}
            </th>
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
            <VerbHeaderCell colSpan="4" className="gerund">
              gerund
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="2" className="supine">
              supine
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell className="gerund accusative">accusative</VerbHeaderCell>
            <VerbHeaderCell className="gerund genitive">genitive</VerbHeaderCell>
            <VerbHeaderCell className="gerund dative">dative</VerbHeaderCell>
            <VerbHeaderCell className="gerund ablative">ablative</VerbHeaderCell>
            <VerbHeaderCell className="supine accusative">accusative</VerbHeaderCell>
            <VerbHeaderCell className="supine ablative">ablative</VerbHeaderCell>
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
export { GenericVerbDataCell, VerbHeaderCell }
