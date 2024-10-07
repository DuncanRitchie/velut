import Head from 'next/head'
import { Fragment } from 'react'

import { getSummary } from '../lib/summary'
import { getShowGeneratedFormsString } from '../lib/lemmata'
import styles from '../css/About.module.css'
import Header from '../components/header/Header'
import LatinLink from '../components/latinlink/LatinLink'
import FormsTable from '../components/lemma/FormsTable'
import Details from '../components/details/Details'
import superscriptLemmaTag from '../components/lemma/superscriptLemmaTag'
import formsExample from '../data/forms-example.json'

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
    (props.summary?.inflectorCounts.successes || 0) + (props.summary?.inflectorCounts.noTestData || 0)

  const incorrectFormsCount = props.summary?.errata?.reduce(
    (accumulated, currentErratum) => accumulated + currentErratum.incorrectForms.length,
    0,
  )

  const writingInflectorProgressPercent = (
    (successesOrNoTestDataCount / (props.summary?.inflectorCounts.total ?? Infinity)) *
    100
  ).toPrecision(3)

  const checkingInflectorProgressPercent = (
    ((props.summary?.inflectorCounts.manuallyChecked ?? 0) / (props.summary?.inflectorCounts.total || Infinity)) *
    100
  ).toPrecision(3)

  const dateLastUpdatedEnglish = (() => {
    //// I’m really looking forward to the Temporal API being supported.
    if (!props.summary?.lastUpdatedDate) {
      return '(error getting date)'
    }
    const date = new Date(props.summary?.lastUpdatedDate)
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]
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
    return `${dayOfWeek} ${date.getDate()} ${month} ${date.getFullYear()}`
  })()

  // Will be something like "proper nouns, conjunctions, and pronouns"
  const stringOfPartsOfSpeechToShowGeneratedFormsFor = getShowGeneratedFormsString()

  return (
    <>
      <Head>
        <title>About the de-Excellation of velut — a Latin rhyming dictionary</title>
        <meta
          name="Description"
          content="How Excel is being removed from the architecture of velut, the Latin vocabulary website"
        />
      </Head>
      <div className={styles.about + ' fulmar-background'}>
        <Header textBeforeTitle="De-Excellation" />

        <main>
          <section id="preamble">
            <h2>Preamble</h2>
            <p>
              Since the beginning of velut in early 2016, I have been using Microsoft Excel to store all the data about
              Latin vocabulary. But I’m in the process of changing the architecture of velut, with the aim of removing
              all usage of Excel.
            </p>
            <p>
              It’s a huge amount of work to do, and there are mistakes and omissions in my data which I will not emend
              until this “de-Excellation” work is finished (or nearly finished). So I made this page, to give updates on
              it while it was in progress.
            </p>
            <p>
              Statistics in bold were last updated on <strong>{dateLastUpdatedEnglish}</strong>.
            </p>
          </section>

          <section id="stages-of-deexcellation">
            <h2>Stages of de-Excellation</h2>
            <p>
              The creation of this website in 2019 was itself part of the process of creating substitutes for
              functionality I had in Excel. This is because I can use my Excel file to look up what data I have on a
              given word, and the website allows anyone to see that information too.
            </p>
            <p>
              I had a sheet in Excel for producing certain data for each word, mostly phonetic data such as the metrical
              scansion or the location of the stressed syllable. In 2022 I made a JavaScript script to do this instead:
              my <a href="https://www.duncanritchie.co.uk/velut-word-data-generator/">Word Data Generator</a>.
            </p>
            <p>
              In a similar vein, I used Excel to store each word and the lemmata that it is a form of, and I had used
              Excel to generate some of those forms for a given lemma. But I wanted to bring more automation to the
              generation of inflected forms, so I now have a JavaScript script to do that: my{' '}
              <a href="https://www.duncanritchie.co.uk/velut-inflector/">Inflector</a>.
            </p>
            <p>
              More detail about where I’m currently at with the Inflector is below. I also have a{' '}
              <a href="https://github.com/DuncanRitchie/velut/blob/main/plan.md">Markdown document on GitHub</a> in
              which I break the work down into steps and say when I completed each step.
            </p>
          </section>

          <section id="about-the-lists-of-forms">
            <h2>About the lists of forms</h2>
            <p>
              The “de-Excellation” of velut brings many benefits to how I manage the dictionary behind the scenes. But
              it also gives me the opportunity to improve how certain features appear on the website. A major example is
              the list of forms for each lemma.
            </p>
            <p>
              The tabular nature of Excel meant I couldn’t have the more complex data-structures that are useful for
              storing grammatical data about all the forms compactly. In essence, I can use Excel to say that{' '}
              <LatinLink targetWord="verbī" /> is a form of <LatinLink targetWord="verbum" />, but it was very hard to
              store the information about it being genitive singular.
            </p>
            <p>
              (It’s theoretically possible, but in practice implausible for the size of dictionary I was wanting. I was
              prioritising number of lemmata and phonetic features such as rhymes, over grammatical information that’s
              already given by sites like Wiktionary and Perseus.)
            </p>
            <p>
              So with data coming from Excel, velut presented the forms of <LatinLink targetWord="verbum" /> as a simple
              list: <LatinLink targetWord="verba" /> <LatinLink targetWord="verbī" /> <LatinLink targetWord="verbīs" />{' '}
              <LatinLink targetWord="verbō" /> <LatinLink targetWord="verbum" />. (I know{' '}
              <LatinLink targetWord="verbōrum" /> is missing — I didn’t include every form.) It couldn’t really be more
              informative.
            </p>
            <p>
              And I was adding the forms manually, which has the advantage of not leading to the sorts of errors you get
              by generating forms through code. If a lemma is irregular, it was easy for me to include the irregular
              forms. If a lemma doesn’t make sense in the plural (or comparative, etc), I could easily avoid adding
              those forms.
            </p>
            <p>
              But it also led to several mistakes due to human error — typos and errors in copying one cell to another —
              and it was difficult to correct them in Excel. I also couldn’t include all the forms for all lemmata, nor
              the parsing information about each form, as I’ve said. And adding the forms I did have was a bit tedious.
            </p>
            <p>
              In October 2022, I exported all the data about lemmata and their forms from Excel into Json files, and
              began to write a script to generate the forms from each lemma. I call this script the Inflector. It
              includes all the grammatical information I want too, so it says what’s a genitive singular, etc.
            </p>
            <p>
              Happily, I can use the data from Excel to check the forms that the Inflector generates. So if I had forms
              in Excel that the Inflector isn’t re-creating, I know about it. I can then decide whether each form is a
              mistake and should never have been in velut, or it’s worth keeping. In the latter case, either there’s a
              bug in the Inflector, or the Json file that the Inflector reads from (listing all lemmata) needs more
              information about the lemma in question.
            </p>
            <p>
              Below, you can see a <a href="#example-forms">sample of forms that I will be generating</a>, and the{' '}
              <a href="#incorrect-forms">list of all the forms that I’ve decided not to keep</a>. I also show my
              progress in{' '}
              <a href="#progress-on-writing-the-inflector">making the Inflector generate forms for each lemma</a>, and
              then my progress in <a href="#progress-on-checking-the-inflectors-output">checking those forms</a>.
            </p>
            <p>
              You see, the data from Excel tell me what forms the Inflector misses, but the Inflector might still be
              creating forms that aren’t really reasonable for a given lemma, or the grammatical labels (genitive
              singular, etc) might be wrong. So I’m manually going through all my lemmata and confirming that the forms
              information looks okay!
            </p>
            <p>
              Once I have confirmed that all lemmata of a part of speech are given the correct forms by the Inflector, I
              can switch from showing a simple list of forms to displaying the full inflection-tables on the live
              website. Currently, the parts of speech that I display inflection-tables for are{' '}
              {stringOfPartsOfSpeechToShowGeneratedFormsFor}.
            </p>
          </section>

          <section id="example-forms">
            <h2>Example forms</h2>
            <p>
              Here are the forms I’m generating for <i lang="la">verbum</i>, so you can get a sense of how the tables
              are going to look. (Tables are already shown for {stringOfPartsOfSpeechToShowGeneratedFormsFor}, but
              there’s no harm in me putting a table on this page too.)
            </p>
            <p>
              Some of the forms below are displayed as links and some are not, on the basis of whether I currently have
              them on the live website. But eventually all the forms will be live, so they’ll all be links.
            </p>
            <div className={styles.exampleFormsWrapper}>
              <FormsTable
                Forms={formsExample.Forms}
                formsFromWordsCollection={formsExample.formsFromExcel}
                lemma="verbum"
                linkBase="/"
                currentWordHyphenated=""
              />
            </div>
          </section>

          <section id="progress-on-writing-the-inflector">
            <h2>Progress on writing the Inflector</h2>
            <p>
              I have <strong>{props.summary?.inflectorCounts.total}</strong> lemmata in total, of which:
            </p>
            <ul>
              <li>
                <strong>{successesOrNoTestDataCount}</strong> (or <strong>{writingInflectorProgressPercent}%</strong>)
                are lemmata for which the Inflector generates all the forms that I had in Excel (plus more forms,
                potentially).
              </li>
              <li>
                <strong>{props.summary?.inflectorCounts.mismatches}</strong> are lemmata for which the Inflector
                generates forms, but not all the forms that I had in Excel.
              </li>
              <li>
                <strong>{props.summary?.inflectorCounts.inflectFuncNotDefined}</strong> are lemmata for which the
                Inflector generates no forms. (The Inflector skips any part of speech, noun/adjective declension, or
                verb conjugation that it doesn’t know how to create forms for.)
              </li>
            </ul>
            <p>
              Here’s what {writingInflectorProgressPercent}
              % looks like as a progress-bar:
              <progress min="0" max={props.summary?.inflectorCounts.total} value={successesOrNoTestDataCount} />
            </p>
          </section>

          <section id="progress-on-checking-the-inflectors-output">
            <h2>Progress on checking the Inflector’s output</h2>
            <p>
              The Inflector can replicate all the forms that I had in Excel, for all lemmata. But there may still be
              mistakes in what the Inflector produces, either because of flaws in my lemmata data-file or (less likely)
              bugs in how the Inflector handles that data-file.
            </p>
            <p>So I’m checking all {props.summary?.inflectorCounts.total} lemmata manually.</p>
            <ul>
              <li>
                <strong>{props.summary?.inflectorCounts.manuallyChecked}</strong> lemmata (
                <strong>{checkingInflectorProgressPercent}%</strong>) have been confirmed by me to have correct forms
                coming from the Inflector. (Or, occasionally, the lemma itself is wrong, and correcting it is on my
                to-do list!)
              </li>
              <li>
                <strong>{props.summary?.inflectorCounts.toBeManuallyChecked}</strong> lemmata are yet to be checked.
              </li>
            </ul>
            <p>
              Here’s what {checkingInflectorProgressPercent}
              % looks like as a progress-bar:
              <progress
                min="0"
                max={props.summary?.inflectorCounts.total}
                value={props.summary?.inflectorCounts.manuallyChecked}
              />
            </p>
            <p>
              The {props.summary?.inflectorCounts.manuallyChecked} lemmata that I’ve checked include all{' '}
              {stringOfPartsOfSpeechToShowGeneratedFormsFor}. So those are the parts of speech that I display
              inflection-tables for.
            </p>
          </section>

          <section id="incorrect-forms" className={styles.incorrectForms}>
            <h2>Incorrect forms</h2>
            <p>
              These are forms that I had added to Excel, and were thus on the velut website, but which I’ve decided
              should be deleted since starting work on the Inflector.
            </p>
            <p>
              In some cases, the form is a valid Latin word, but should not be considered a form of the lemma it is
              under. (Eg, <LatinLink targetWord="abditē" /> is an adverb, but I wouldn’t consider it a form of{' '}
              <LatinLink targetWord="abdō" />, which is a verb. It should be its own lemma.) In other cases, the
              macronization is incorrect, or the form is wrong for other reasons.
            </p>
            <p>
              There are <strong>{incorrectFormsCount}</strong> incorrect forms on the list below, among{' '}
              <strong>{props.summary?.errata?.length}</strong> lemmata.
            </p>
            <p>
              If the <em>lemma</em> itself is wrong, this is not acknowledged in the list below. For example, I’m aware
              that <LatinLink targetWord="Īliās" /> should be <LatinLink targetWord="Īlias" /> (with “a” as a short
              vowel). I won’t correct mistakes like <LatinLink targetWord="Īliās" /> until I’ve checked all forms of all
              lemmata and updated this website with the forms.
            </p>
            <p>Anyway, here’s the list of lemmata with the forms I want to delete from velut.</p>
            <Details>
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
            </Details>
          </section>
        </main>
      </div>
    </>
  )
}

export default DeExcellation
