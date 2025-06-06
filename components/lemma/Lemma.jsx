import { Fragment } from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'
const greece = '../../images/greece.png'
const israel = '../../images/israel.png'
import LatinLink from '../latinlink/LatinLink'
import TextWithQuotedLatin from '../latinlink/TextWithQuotedLatin'
import FormsTable from '../formsTables/FormsTable'
import VerbFormsTable from '../formsTables/VerbFormsTable'
import ParticiplesTable from '../formsTables/ParticiplesTable'
import ErrorBoundary from '../errorBoundary/errorBoundary'

// Eg iūs[>iūrō] => lemma-iūs-iūrō
function getLemmaId({ Lemma }) {
  // Replace instances of square/angle brackets with hyphens, then delete trailing hyphens.
  return 'lemma-' + Lemma.replace(/[\[\]<>]+/g, '-').replace(/-$/, '')
}

const Forms = ({ lemma, linkBase, currentWordHyphenated }) => {
  let { formsFromWordsCollection, Forms } = lemma

  if (lemma.PartOfSpeech === 'Verb') {
    return (
      <VerbForms
        lemma={lemma}
        formsFromWordsCollection={formsFromWordsCollection}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
      />
    )
  }

  return (
    <FormsTable
      Forms={Forms}
      formsFromWordsCollection={formsFromWordsCollection}
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

const VerbForms = ({ lemma, formsFromWordsCollection, linkBase, currentWordHyphenated }) => {
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
        summary="All forms except participles"
        Forms={nonParticipleForms}
        formsFromWordsCollection={formsFromWordsCollection}
        lemma={lemma.Lemma}
        linkBase={linkBase}
        currentWordHyphenated={currentWordHyphenated}
        openByDefault={true}
      />

      {hasParticiples ? (
        <ParticiplesTable
          summary="Participles"
          Forms={participleForms}
          formsFromWordsCollection={formsFromWordsCollection}
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

const Cognates = ({ lemma, linkBase, currentWordHyphenated }) => {
  let { Root, cognates } = lemma
  // Create JSX for the cognates.
  const mappedCognates = cognates ? (
    cognates.map((cognate, index) => {
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
    })
  ) : (
    <></>
  )
  return <p>{Root ? <>Cognates: {mappedCognates}</> : 'I have not assigned cognates for this lemma, sorry!'}</p>
}

const Lemma = ({ lemma, linkBase, currentWordHyphenated, showFormsAndCognates = true }) => {
  // Currently we have `formsFromWordsCollection` for forms that we had in Excel and that are now in the `words` MongoDB collection.
  // We also have `Forms` which is the object of forms generated by the Inflector, included in the lemma from the `lemmata` collection.
  // In the future, we will have `Forms` only, and all the forms in `Forms` will be in the `words` MongoDB collection.

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
      if (
        'αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ'.includes(word.substr(-1).toLowerCase()) ||
        'αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ'.includes(word.substr(-2, 1).toLowerCase())
      ) {
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
