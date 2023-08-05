import Head from 'next/head'

import { getSummary } from '../lib/summary'
import styles from '../css/About.module.css'
import Header from '../components/header/Header'
import LatinLink from '../components/latinlink/LatinLink'
import superscriptLemmaTag from '../components/lemma/superscriptLemmaTag'
import { Fragment } from 'react'

export async function getServerSideProps() {
  const summaryData = await getSummary()
  const summary = summaryData.summary || null

  return {
    props: {
      summary,
    },
  }
}

const DeExcellation = (props) => {
  const successesOrNoTestDataCount =
    (props.summary?.inflectorCounts.successes || 0) +
    (props.summary?.inflectorCounts.noTestData || 0)
  const dateLastUpdatedEnglish = (() => {
    //// I’m really looking forward to the Temporal API being supported.
    if (!props.summary?.lastUpdatedDate) {
      return '(error getting date)'
    }
    const date = new Date(props.summary?.lastUpdatedDate)
    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][date.getDate()]
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][date.getMonth()]
    return `${dayOfWeek} ${date.getDay()} ${month} ${date.getFullYear()}`
  })()

  return (
    <>
      <Head>
        <title>
          About the de-Excellation of velut — a Latin rhyming dictionary
        </title>
        <meta
          name="Description"
          content="How Excel is being removed from the architecture of velut, the Latin vocabulary website"
        />
      </Head>
      <div className={styles.about + ' fulmar-background'}>
        <Header textBeforeTitle="De-Excellation" />

        <main>
          <section>
            <h2>Preamble</h2>
            <p>
              Since the beginning of velut in early 2016, I have been using
              Microsoft Excel to store all the data about Latin vocabulary. But
              I’m in the process of changing the architecture of velut, with the
              aim of removing all usage of Excel.
            </p>
            <p>
              This gives me the opportunity to improve how certain features
              appear on the website. A major example is the list of forms for
              each lemma. The tabular nature of Excel meant I couldn’t have the
              more complex data-structures that are useful for storing
              grammatical data about all the forms compactly. In essence, I can
              use Excel to say that <LatinLink targetWord="verbī" /> is a form
              of <LatinLink targetWord="verbum" />, but it was very hard to
              store the information about it being genitive singular.
            </p>
            <p>
              (It’s theoretically possible, but in practice implausible for the
              size of dictionary I was wanting. I was prioritising number of
              lemmata and phonetic features such as rhymes, over grammatical
              information that’s already given by sites like Wiktionary and
              Perseus.)
            </p>
            <p>
              So with data coming from Excel, velut presented the forms of{' '}
              <LatinLink targetWord="verbum" /> as a simple list:{' '}
              <LatinLink targetWord="verba" /> <LatinLink targetWord="verbī" />{' '}
              <LatinLink targetWord="verbīs" /> <LatinLink targetWord="verbō" />{' '}
              <LatinLink targetWord="verbum" />. (I know{' '}
              <LatinLink targetWord="verbōrum" /> is missing — I didn’t include
              every form.)
            </p>
            <p>
              In Excel, I added the forms manually, which has the advantage of
              not leading to the sorts of errors you get by generating forms
              through code. If a lemma is irregular, it was easy for me include
              the irregular forms. If a lemma doesn’t make sense in the plural
              (or comparative, etc), I could easily avoid adding those forms.
            </p>
            <p>
              But it also led to several mistakes due to human error — typos and
              errors in copying one cell to another — and it was difficult to
              correct them in Excel. I also couldn’t include all the forms for
              all lemmata, nor the parsing information about each form, as I’ve
              said.
            </p>
            <p>
              In October 2022, I exported all the data about lemmata and their
              forms from Excel into Json files, and began to write a script to
              generate the forms from each lemma. I call this script the
              Inflector. It includes all the grammatical information I want too,
              so it says what’s a genitive singular, etc.
            </p>
            <p>
              Happily, I can use the data from Excel to check the forms that the
              Inflector generates. So if I had forms in Excel that the Inflector
              isn’t re-creating, I know about it. I can then decide whether each
              form is a mistake and should never have been in velut, or it’s
              worth keeping. In the latter case, either there’s a bug in the
              Inflector, or the Json file that the Inflector reads from (listing
              all lemmata) needs more information about the lemma in question.
            </p>
            <p>
              Below, you can see the list of all the forms that I’ve decided not
              to keep. I also show my progress in making the Inflector generate
              forms for each lemma, and then my progress in checking those
              forms.
            </p>
            <p>
              You see, the data from Excel tell me what forms the Inflector
              misses, but the Inflector might still be creating forms that
              aren’t really reasonable for a given lemma, or the grammatical
              labels (genitive singular, etc) might be wrong. So I’m manually
              going through all my lemmata and confirming that the forms
              information looks okay!
            </p>
            <p>
              Last updated: <strong>{dateLastUpdatedEnglish}</strong>.
            </p>
          </section>

          <section>
            <h2>Progress on writing the Inflector</h2>
            <p>
              I have {props.summary?.inflectorCounts.total} lemmata in total, of
              which:
            </p>
            <ul>
              <li>
                <strong>{successesOrNoTestDataCount}</strong> are lemmata for
                which the Inflector generates all the forms that I had in Excel
                (plus more forms, potentially).
              </li>
              <li>
                <strong>{props.summary?.inflectorCounts.mismatches}</strong> are
                lemmata for which the Inflector generates forms, but not all the
                forms that I had in Excel (plus more forms, potentially).
              </li>
              <li>
                <strong>
                  {props.summary?.inflectorCounts.inflectFuncNotDefined}
                </strong>{' '}
                are lemmata for which the Inflector generates no forms. (The
                Inflector skips any part of speech, noun/adjective declension,
                or verb conjugation that it doesn’t know how to create forms
                for.)
              </li>
            </ul>
            <p>
              Here’s what {successesOrNoTestDataCount} /{' '}
              {props.summary?.inflectorCounts.total} looks like as a
              progress-bar:
              <progress
                min="0"
                max={props.summary?.inflectorCounts.total}
                value={successesOrNoTestDataCount}
              />
            </p>
          </section>

          <section>
            <h2>Progress on checking the Inflector’s output</h2>
            <p>
              The Inflector can replicate all the forms that I had in Excel, for
              all lemmata. But there may still be mistakes in what the Inflector
              produces, either because of a flaw in my lemmata data-file or
              (less likely) a bug in how the Inflector handles that data-file.
            </p>
            <p>
              So I’m checking all {props.summary?.inflectorCounts.total} lemmata
              manually:
            </p>
            <ul>
              <li>
                {props.summary?.inflectorCounts.manuallyChecked} lemmata have
                been confirmed by me to have correct forms coming from the
                Inflector. (Or, occasionally, the lemma itself is wrong, and
                correcting it is on my to-do list!)
              </li>
              <li>
                {props.summary?.inflectorCounts.toBeManuallyChecked} lemmata are
                yet to be checked.
              </li>
            </ul>
            <p>
              Here’s what {props.summary?.inflectorCounts.manuallyChecked} /{' '}
              {props.summary?.inflectorCounts.total} looks like as a
              progress-bar:
              <progress
                min="0"
                max={props.summary?.inflectorCounts.total}
                value={props.summary?.inflectorCounts.manuallyChecked}
              />
            </p>
          </section>

          <section>
            <h2>Incorrect forms</h2>
            <p>
              These are forms that I had added to Excel, and were thus on the
              velut website, but which I’ve decided should be deleted since
              starting work on the Inflector.
            </p>
            <p>
              In some cases, the form is a valid Latin word, but should not be
              considered a form of the lemma it is under. (Eg,{' '}
              <LatinLink targetWord="abditē" /> is an adverb, but I wouldn’t
              consider it a form of <LatinLink targetWord="abdō" />, which is a
              verb. It should be its own lemma.) In other cases, the
              macronization is incorrect, or the form is wrong for other
              reasons.
            </p>
            <p>
              If the <em>lemma</em> itself is wrong, this is not acknowledged in
              the list below. For example, I’m aware that{' '}
              <LatinLink targetWord="Īliās" /> should be{' '}
              <LatinLink targetWord="Īlias" /> (with “a” as a short vowel). I
              won’t correct mistakes like <LatinLink targetWord="Īliās" /> until
              I’ve checked all forms of all lemmata and updated this website
              with the forms.
            </p>
            <p>
              Anyway, here’s the list of lemmata with the forms I want to delete
              from velut.
            </p>
            <details>
              <summary>Show/hide list</summary>
              <dl>
                {props.summary?.errata?.map(({ lemma, incorrectForms }) => {
                  return (
                    <Fragment key={lemma}>
                      <dt>{superscriptLemmaTag(lemma)}</dt>
                      <dd>
                        {incorrectForms.map((form) => (
                          <Fragment key={form}>
                            <LatinLink targetWord={form} />{' '}
                          </Fragment>
                        ))}
                      </dd>
                    </Fragment>
                  )
                })}
              </dl>
            </details>
          </section>
        </main>
      </div>
    </>
  )
}

export default DeExcellation
