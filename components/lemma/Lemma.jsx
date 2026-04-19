import { Fragment } from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'
const greece = '../../images/greece.png'
const israel = '../../images/israel.png'
import LatinLink from '../latinlink/LatinLink'
import TextWithQuotedLatin from '../latinlink/TextWithQuotedLatin'
import FormsTable, { LatinLinks } from '../formsTables/FormsTable'
import VerbFormsTable from '../formsTables/VerbFormsTable'
import ParticiplesTable from '../formsTables/ParticiplesTable'
import ErrorBoundary from '../errorBoundary/errorBoundary'
import Details from '../details/Details'

// Eg iūs[>iūrō] => lemma-iūs-iūrō
function getLemmaId({ Lemma }) {
  // Replace instances of square/angle brackets with hyphens, then delete trailing hyphens.
  return 'lemma-' + Lemma.replace(/[\[\]<>]+/g, '-').replace(/-$/, '')
}

const Forms = ({ lemma, linkBase, currentWordHyphenated }) => {
  let { Forms } = lemma

  if (lemma.PartOfSpeech === 'Verb') {
    return <VerbForms lemma={lemma} linkBase={linkBase} currentWordHyphenated={currentWordHyphenated} />
  }

  return (
    <FormsTable
      Forms={Forms}
      lemma={lemma.Lemma}
      linkBase={linkBase}
      currentWordHyphenated={currentWordHyphenated}
      openByDefault={true}
      /* The forms table should be full-width if there are enough forms to fill the width.
        This is likeliest if it’s an adjective with comparative forms. */
      isFullWidth={lemma.PartOfSpeech === 'Adjective' && Forms.unencliticized?.comparative}
    />
  )
}

const VerbForms = ({ lemma, linkBase, currentWordHyphenated }) => {
  if (!lemma.Forms) {
    throw Error(`Lemma ${lemma.Lemma} has no Forms property.`)
  }
  // Initialise two forms objects: one with all the forms, one with none.
  const nonParticipleForms = structuredClone(lemma.Forms)
  const participleForms = {}
  let hasParticiples = false

  // Move the participle forms from the object that has all the forms to the object that has none.
  ;['unencliticized', 'ne', 'que', 've']
    .filter((enclitic) => lemma.Forms[enclitic]) // Only consider keys that we have verb forms for.
    .forEach((enclitic) => {
      delete nonParticipleForms[enclitic].participle

      if (lemma.Forms[enclitic].participle) {
        hasParticiples = true

        participleForms[enclitic] = {
          participle: lemma.Forms[enclitic].participle,
        }
      }
    })

  return (
    <>
      <VerbFormsTable
        summary="Non-participle forms"
        Forms={nonParticipleForms}
        lemma={lemma.Lemma}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
        openByDefault={true}
      />

      {hasParticiples ? (
        <ParticiplesTable
          summary="Participles"
          Forms={participleForms}
          lemma={lemma.Lemma}
          linkBase={linkBase}
          currentWordHyphenated={currentWordHyphenated}
          openByDefault={true}
          isFullWidth={true}
        />
      ) : null}
    </>
  )
}

function isGreek(word) {
  return /[αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ]/i.test(word)
}

// Most of my etymological roots are Latin lemmata that can be rendered using <LatinLink> because they themselves are words in velut.
// But some of the roots are given as Greek lemmata, which would not be rendered as a link.
// And some of the roots are given as lemmata in non-Latin non-Greek languages, in the form "cel *dūnom",
// meaning a Proto-Celtic word hypothesized as “dūnom”. This is also not rendered as a link.
// The language codes are from ISO 639 https://iso639-3.sil.org/code_tables/639/data
// Since reconstructed languages don’t have official codes, "cel" is officially a code for any Celtic language,
// but for the sake of etymologies in velut I use "cel" for Proto-Celtic. Likewise, "gem" for Proto-Germanic.
function parseRootString(root) {
  const regexResults = /(\w+) (.+)/.exec(root)
  if (regexResults) {
    const [_, lang, word] = regexResults
    return { lang: lang, word, isForLink: false }
  }
  if (isGreek(root)) {
    return { lang: 'grc', word: root, isForLink: false }
  }
  return { lang: 'la', word: root, isForLink: true }
}

// Eg, "cel" => "Proto-Celtic"
function getLanguageNameFromCode(code) {
  const LANGUAGE_CODES_AND_NAMES = {
    cel: 'Proto-Celtic',
    en: 'English',
    gem: 'Proto-Germanic',
    grc: 'Ancient Greek',
    he: 'Hebrew',
    la: 'Latin',
    phn: 'Phoenician',
    sla: 'Proto-Slavic',
  }
  // If a language code is in my lemmata data but absent from the object above, I should add it.
  return LANGUAGE_CODES_AND_NAMES[code] ?? `(language code ${code})`
}

const Cognates = ({ lemma, linkBase, currentWordHyphenated }) => {
  let { cognates } = lemma
  if (!cognates.length) {
    return <p>I have not assigned cognates for this lemma, sorry!</p>
  }
  return cognates.map((cognateGroup) => {
    const rootObject = parseRootString(cognateGroup.Root)
    const rootJsx = rootObject.isForLink ? (
      <LatinLink
        linkBase={linkBase}
        targetWord={cognateGroup.Root}
        currentWordHyphenated={currentWordHyphenated}
        isLemma={true}
      />
    ) : (
      <>
        {getLanguageNameFromCode(rootObject.lang)}{' '}
        <span lang={rootObject.lang}>
          {rootObject.lang === 'en' ? '“' : null}
          {rootObject.word}
          {rootObject.lang === 'en' ? '”' : null}
        </span>
      </>
    )

    return (
      <Details key={cognateGroup.Root}>
        <summary>Cognates of {rootJsx}</summary>
        <p>
          {cognateGroup.Lemmata.map((cognate, index) => {
            return (
              <Fragment key={index}>
                <LatinLink
                  linkBase={linkBase}
                  targetWord={cognate.Lemma}
                  currentWordHyphenated={currentWordHyphenated}
                  isLemma={true}
                />{' '}
              </Fragment>
            )
          })}
        </p>
      </Details>
    )
  })
}

const Lemma = ({ lemma, linkBase, currentWordHyphenated, showFormsAndCognates = true }) => {
  let { PartOfSpeech, Meanings, Notes, Transliterations } = lemma

  // If there are transliterations in Ancient Greek, they will appear next to a Greek flag
  // and be labelled as lang="grc". Ditto for Hebrew with the Israeli flag and lang="he".
  // All the transliterations for the lemma come into props as a single string to be processed here.
  let mappedTransliterations
  if (Transliterations) {
    // lemma.Transliteration could look like "Ἰησοῦς/יֵשׁוּעַ"
    const transliterationsArray = Transliterations.split('/')
    mappedTransliterations = transliterationsArray.map((word, i) => {
      let alt = 'Hebrew'
      let lang = 'he'
      // We would be using emoji, but Windows won’t display national flag emoji.
      // let emoji = "🇮🇱"
      let flag = israel
      if (isGreek(word)) {
        alt = 'Ancient Greek'
        lang = 'grc'
        // emoji = "🇬🇷"
        flag = greece
      }
      return (
        <span key={i} lang={lang}>
          <img className="inline-flag" src={flag} alt={alt} />
          &nbsp;{word}{' '}
        </span>
      )
    })
  }

  return (
    <ErrorBoundary>
      <div className="lemma" id={getLemmaId(lemma)}>
        {/* If forms and cognates are not shown, the heading should be a link
      to the word’s page which will have the forms and cognates */}
        {/* superscriptLemmaTag() replaces anything in square brackets with a superscript. */}
        <h3>
          {showFormsAndCognates ? (
            superscriptLemmaTag(lemma.Lemma)
          ) : (
            <LatinLink
              targetWord={lemma.Lemma}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
              isLemma={true}
            />
          )}
        </h3>
        {PartOfSpeech ? <p>Part of speech: {PartOfSpeech.toLowerCase()}</p> : null}
        {Meanings ? (
          <p>
            Meanings:{' '}
            <TextWithQuotedLatin linkBase={linkBase} text={Meanings} currentWordHyphenated={currentWordHyphenated} />
          </p>
        ) : null}
        {Notes ? (
          <p>
            Notes:{' '}
            <TextWithQuotedLatin linkBase={linkBase} text={Notes} currentWordHyphenated={currentWordHyphenated} />
          </p>
        ) : null}
        {mappedTransliterations ? <p>Transliterations: {mappedTransliterations}</p> : null}
        {showFormsAndCognates ? (
          <>
            <Forms
              lemma={lemma}
              linkBase={linkBase}
              currentWordHyphenated={currentWordHyphenated}
              showFormsAndCognates={showFormsAndCognates}
            />
            <Cognates lemma={lemma} linkBase={linkBase} currentWordHyphenated={currentWordHyphenated} />
          </>
        ) : null}
      </div>
    </ErrorBoundary>
  )
}

export default Lemma
export { getLemmaId }
