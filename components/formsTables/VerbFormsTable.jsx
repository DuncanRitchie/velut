import { getTabForCurrentWord, getTabsId } from './FormsTable'
import { GenericVerbDataCell, VerbHeaderCell } from './VerbCells'
import Tabs from '../tabs/Tabs'
import Details from '../details/Details'
import styles from './FormsTable.module.css'
import verbStyles from './VerbFormsTable.module.css'

const TableForSomeVerbForms = ({ formsFromWordsCollection, Forms, linkBase, currentWordHyphenated }) => {
  const VerbDataCell = ({ tags, colSpan }) => {
    return GenericVerbDataCell({ tags, colSpan, formsFromWordsCollection, Forms, linkBase, currentWordHyphenated })
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
            <VerbHeaderCell rowSpan="2" colSpan="2" tags="indicative">
              indicative
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" tags="indicative singular">
              singular
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" tags="indicative plural">
              plural
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative singular first">first</VerbHeaderCell>
            <VerbHeaderCell tags="indicative singular second">second</VerbHeaderCell>
            <VerbHeaderCell tags="indicative singular third">third</VerbHeaderCell>
            <VerbHeaderCell tags="indicative plural first">first</VerbHeaderCell>
            <VerbHeaderCell tags="indicative plural second">second</VerbHeaderCell>
            <VerbHeaderCell tags="indicative plural third">third</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="6" tags="indicative active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell tags="indicative active present">present</VerbHeaderCell>
            <VerbDataCell tags="indicative active present singular first" />
            <VerbDataCell tags="indicative active present singular second" />
            <VerbDataCell tags="indicative active present singular third" />
            <VerbDataCell tags="indicative active present plural first" />
            <VerbDataCell tags="indicative active present plural second" />
            <VerbDataCell tags="indicative active present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative active imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell tags="indicative active imperfect singular first" />
            <VerbDataCell tags="indicative active imperfect singular second" />
            <VerbDataCell tags="indicative active imperfect singular third" />
            <VerbDataCell tags="indicative active imperfect plural first" />
            <VerbDataCell tags="indicative active imperfect plural second" />
            <VerbDataCell tags="indicative active imperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative active future">future</VerbHeaderCell>
            <VerbDataCell tags="indicative active future singular first" />
            <VerbDataCell tags="indicative active future singular second" />
            <VerbDataCell tags="indicative active future singular third" />
            <VerbDataCell tags="indicative active future plural first" />
            <VerbDataCell tags="indicative active future plural second" />
            <VerbDataCell tags="indicative active future plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative active perfect">perfect</VerbHeaderCell>
            <VerbDataCell tags="indicative active perfect singular first" />
            <VerbDataCell tags="indicative active perfect singular second" />
            <VerbDataCell tags="indicative active perfect singular third" />
            <VerbDataCell tags="indicative active perfect plural first" />
            <VerbDataCell tags="indicative active perfect plural second" />
            <VerbDataCell tags="indicative active perfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative active pluperfect">pluperfect</VerbHeaderCell>
            <VerbDataCell tags="indicative active pluperfect singular first" />
            <VerbDataCell tags="indicative active pluperfect singular second" />
            <VerbDataCell tags="indicative active pluperfect singular third" />
            <VerbDataCell tags="indicative active pluperfect plural first" />
            <VerbDataCell tags="indicative active pluperfect plural second" />
            <VerbDataCell tags="indicative active pluperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative active futureperfect">future perfect</VerbHeaderCell>
            <VerbDataCell tags="indicative active futureperfect singular first" />
            <VerbDataCell tags="indicative active futureperfect singular second" />
            <VerbDataCell tags="indicative active futureperfect singular third" />
            <VerbDataCell tags="indicative active futureperfect plural first" />
            <VerbDataCell tags="indicative active futureperfect plural second" />
            <VerbDataCell tags="indicative active futureperfect plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="3" tags="indicative passive">
              passive
            </VerbHeaderCell>
            <VerbHeaderCell tags="indicative passive present">present</VerbHeaderCell>
            <VerbDataCell tags="indicative passive present singular first" />
            <VerbDataCell tags="indicative passive present singular second" />
            <VerbDataCell tags="indicative passive present singular third" />
            <VerbDataCell tags="indicative passive present plural first" />
            <VerbDataCell tags="indicative passive present plural second" />
            <VerbDataCell tags="indicative passive present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative passive imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell tags="indicative passive imperfect singular first" />
            <VerbDataCell tags="indicative passive imperfect singular second" />
            <VerbDataCell tags="indicative passive imperfect singular third" />
            <VerbDataCell tags="indicative passive imperfect plural first" />
            <VerbDataCell tags="indicative passive imperfect plural second" />
            <VerbDataCell tags="indicative passive imperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="indicative passive future">future</VerbHeaderCell>
            <VerbDataCell tags="indicative passive future singular first" />
            <VerbDataCell tags="indicative passive future singular second" />
            <VerbDataCell tags="indicative passive future singular third" />
            <VerbDataCell tags="indicative passive future plural first" />
            <VerbDataCell tags="indicative passive future plural second" />
            <VerbDataCell tags="indicative passive future plural third" />
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
            <VerbHeaderCell rowSpan="2" colSpan="2" tags="subjunctive">
              subjunctive
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" tags="subjunctive singular">
              singular
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" tags="subjunctive plural">
              plural
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell tags="subjunctive singular first">first</VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive singular second">second</VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive singular third">third</VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive plural first">first</VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive plural second">second</VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive plural third">third</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="4" tags="subjunctive active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive active present">present</VerbHeaderCell>
            <VerbDataCell tags="subjunctive active present singular first" />
            <VerbDataCell tags="subjunctive active present singular second" />
            <VerbDataCell tags="subjunctive active present singular third" />
            <VerbDataCell tags="subjunctive active present plural first" />
            <VerbDataCell tags="subjunctive active present plural second" />
            <VerbDataCell tags="subjunctive active present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="subjunctive active imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell tags="subjunctive active imperfect singular first" />
            <VerbDataCell tags="subjunctive active imperfect singular second" />
            <VerbDataCell tags="subjunctive active imperfect singular third" />
            <VerbDataCell tags="subjunctive active imperfect plural first" />
            <VerbDataCell tags="subjunctive active imperfect plural second" />
            <VerbDataCell tags="subjunctive active imperfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="subjunctive active perfect">perfect</VerbHeaderCell>
            <VerbDataCell tags="subjunctive active perfect singular first" />
            <VerbDataCell tags="subjunctive active perfect singular second" />
            <VerbDataCell tags="subjunctive active perfect singular third" />
            <VerbDataCell tags="subjunctive active perfect plural first" />
            <VerbDataCell tags="subjunctive active perfect plural second" />
            <VerbDataCell tags="subjunctive active perfect plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="subjunctive active pluperfect">pluperfect</VerbHeaderCell>
            <VerbDataCell tags="subjunctive active pluperfect singular first" />
            <VerbDataCell tags="subjunctive active pluperfect singular second" />
            <VerbDataCell tags="subjunctive active pluperfect singular third" />
            <VerbDataCell tags="subjunctive active pluperfect plural first" />
            <VerbDataCell tags="subjunctive active pluperfect plural second" />
            <VerbDataCell tags="subjunctive active pluperfect plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="2" tags="subjunctive passive">
              passive
            </VerbHeaderCell>
            <VerbHeaderCell tags="subjunctive passive present">present</VerbHeaderCell>
            <VerbDataCell tags="subjunctive passive present singular first" />
            <VerbDataCell tags="subjunctive passive present singular second" />
            <VerbDataCell tags="subjunctive passive present singular third" />
            <VerbDataCell tags="subjunctive passive present plural first" />
            <VerbDataCell tags="subjunctive passive present plural second" />
            <VerbDataCell tags="subjunctive passive present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="subjunctive passive imperfect">imperfect</VerbHeaderCell>
            <VerbDataCell tags="subjunctive passive imperfect singular first" />
            <VerbDataCell tags="subjunctive passive imperfect singular second" />
            <VerbDataCell tags="subjunctive passive imperfect singular third" />
            <VerbDataCell tags="subjunctive passive imperfect plural first" />
            <VerbDataCell tags="subjunctive passive imperfect plural second" />
            <VerbDataCell tags="subjunctive passive imperfect plural third" />
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
            <VerbHeaderCell rowSpan="2" colSpan="3" tags="imperative">
              imperative
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="3" tags="imperative singular">
              singular
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="2" tags="imperative plural">
              plural
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell tags="imperative singular second">second</VerbHeaderCell>
            <VerbHeaderCell tags="imperative singular third" colSpan="2">
              third
            </VerbHeaderCell>
            <VerbHeaderCell tags="imperative plural second">second</VerbHeaderCell>
            <VerbHeaderCell tags="imperative plural third">third</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="2" tags="imperative active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell tags="imperative active present" colSpan="2">
              present
            </VerbHeaderCell>
            <VerbDataCell tags="imperative active present singular second" />
            <VerbDataCell tags="imperative active present singular third" colSpan="2" />
            <VerbDataCell tags="imperative active present plural second" />
            <VerbDataCell tags="imperative active present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="imperative active future" colSpan="2">
              future
            </VerbHeaderCell>
            <VerbDataCell tags="imperative active future singular second" />
            <VerbDataCell tags="imperative active future singular third" colSpan="2" />
            <VerbDataCell tags="imperative active future plural second" />
            <VerbDataCell tags="imperative active future plural third" />
          </tr>
        </tbody>
        <tbody>
          <tr>
            <VerbHeaderCell rowSpan="2" tags="imperative passive">
              passive
            </VerbHeaderCell>
            <VerbHeaderCell tags="imperative passive present" colSpan="2">
              present
            </VerbHeaderCell>
            <VerbDataCell tags="imperative passive present singular second" />
            <VerbDataCell tags="imperative passive present singular third" colSpan="2" />
            <VerbDataCell tags="imperative passive present plural second" />
            <VerbDataCell tags="imperative passive present plural third" />
          </tr>
          <tr>
            <VerbHeaderCell tags="imperative passive future" colSpan="2">
              future
            </VerbHeaderCell>
            <VerbDataCell tags="imperative passive future singular second" />
            <VerbDataCell tags="imperative passive future singular third" colSpan="2" />
            <VerbDataCell tags="imperative passive future plural second" />
            <VerbDataCell tags="imperative passive future plural third" />
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
            <VerbHeaderCell rowSpan="2" tags="infinitive">
              infinitive
            </VerbHeaderCell>
            <VerbHeaderCell colSpan={shouldShowFutureInfinitive ? 3 : 2} tags="infinitive active">
              active
            </VerbHeaderCell>
            <VerbHeaderCell tags="infinitive passive">passive</VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell tags="infinitive active present">present</VerbHeaderCell>
            <VerbHeaderCell tags="infinitive active perfect">perfect</VerbHeaderCell>
            {shouldShowFutureInfinitive ? (
              <VerbHeaderCell tags="infinitive active future">future</VerbHeaderCell>
            ) : null}
            <VerbHeaderCell tags="infinitive passive present">present</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th tags="infinitive" data-headers="infinitive">
              {/* empty cell should not have data-id so can’t use VerbHeaderCell */}
            </th>
            <VerbDataCell tags="infinitive active present" />
            <VerbDataCell tags="infinitive active perfect" />
            {shouldShowFutureInfinitive ? <VerbDataCell tags="infinitive active future" /> : null}
            <VerbDataCell tags="infinitive passive present" />
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <VerbHeaderCell colSpan="4" tags="gerund">
              gerund
            </VerbHeaderCell>
            <VerbHeaderCell colSpan="2" tags="supine">
              supine
            </VerbHeaderCell>
          </tr>
          <tr>
            <VerbHeaderCell tags="gerund accusative">accusative</VerbHeaderCell>
            <VerbHeaderCell tags="gerund genitive">genitive</VerbHeaderCell>
            <VerbHeaderCell tags="gerund dative">dative</VerbHeaderCell>
            <VerbHeaderCell tags="gerund ablative">ablative</VerbHeaderCell>
            <VerbHeaderCell tags="supine accusative">accusative</VerbHeaderCell>
            <VerbHeaderCell tags="supine ablative">ablative</VerbHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <VerbDataCell tags="gerund accusative" />
            <VerbDataCell tags="gerund genitive" />
            <VerbDataCell tags="gerund dative" />
            <VerbDataCell tags="gerund ablative" />
            <VerbDataCell tags="supine accusative" />
            <VerbDataCell tags="supine ablative" />
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
  summary = 'Forms',
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
