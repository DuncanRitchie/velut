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

// This should probably be refactored, perhaps using a regex.
function isGreek(word) {
  return (
    'αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ'.includes(word.substr(-1).toLowerCase()) ||
    'αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ'.includes(word.substr(-2, 1).toLowerCase())
  )
}

const Cognates = ({ lemma, linkBase, currentWordHyphenated }) => {
  let { Root, Roots, cognates } = lemma
  if (!Root && !Roots) {
    return <p>I have not assigned cognates for this lemma, sorry!</p>
  }
  return cognates.map((cognateGroup) => (
    <Details key={cognateGroup.Root}>
      <summary>
        Cognates of{' '}
        {isGreek(cognateGroup.Root) ? (
          <span lang="grc">{cognateGroup.Root}</span> // Some of my etymological roots are Greek lemmata, not Latin!
        ) : (
          <LatinLink
            linkBase={linkBase}
            targetWord={cognateGroup.Root}
            currentWordHyphenated={currentWordHyphenated}
            isLemma={true}
          />
        )}
      </summary>
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
  ))
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
