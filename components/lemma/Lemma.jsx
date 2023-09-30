import { Fragment } from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'
const greece = '../../images/greece.png'
const israel = '../../images/israel.png'
import LatinLink from '../latinlink/LatinLink'
import TextWithQuotedLatin from '../latinlink/TextWithQuotedLatin'
import FormsTable from './FormsTable'

// The env var should be something like "Proper noun, Conjunction"
// which is processed here to ['Proper noun', 'Conjunction']
// In production, it lists the parts of speech that I have finished
// checking the generated forms for.
// The prefix NEXT_PUBLIC_ on the key prevents hydration errors
// by allowing Next.js to use the env var on the client-side.
// The env var must be defined in a .env file (.env.local etc);
// otherwise hydration will fail.
const partsOfSpeechToShowGeneratedFormsFor =
  process.env.NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR?.split(',').map((x) =>
    x.trim(),
  ) ?? []

function shouldGeneratedFormsBeShownForLemma(lemma) {
  return partsOfSpeechToShowGeneratedFormsFor.includes(lemma.PartOfSpeech)
}

const Lemma = ({
  lemma,
  linkBase,
  currentWordHyphenated,
  showFormsByDefault,
}) => {
  // Currently we have `formsFromWordsCollection` for forms that we had in Excel and that are now in the `words` MongoDB collection.
  // We also have `Forms` which is the object of forms generated by the Inflector, included in the lemma from the `lemmata` collection.
  // In the future, we will have `Forms` only, and all the forms in `Forms` will be in the `words` MongoDB collection.

  let {
    PartOfSpeech,
    Meanings,
    Notes,
    Transliterations,
    Root,
    cognates,
    formsFromWordsCollection,
    incorrectForms,
    Forms,
  } = lemma

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
        'αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ'.includes(
          word.substr(-1).toLowerCase(),
        ) ||
        'αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ'.includes(
          word.substr(-2, 1).toLowerCase(),
        )
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

  // Create JSX for the forms that are already in the words collection.
  // Forms are skipped if they are in the summary collection as an erratum.
  const mappedForms = formsFromWordsCollection ? (
    formsFromWordsCollection.map((form, index) => {
      if (incorrectForms?.includes(form)) {
        return <></>
      }
      return (
        <Fragment key={index}>
          <LatinLink
            linkBase={linkBase}
            targetWord={form}
            currentWordHyphenated={currentWordHyphenated}
          />{' '}
        </Fragment>
      )
    })
  ) : (
    <></>
  )

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

  const shouldGeneratedFormsBeShown = shouldGeneratedFormsBeShownForLemma(lemma)

  return (
    <div className="lemma">
      {/* superscriptLemmaTag() replaces anything in square brackets with a superscript. */}
      <h3 lang="la">{superscriptLemmaTag(lemma.Lemma)}</h3>
      {PartOfSpeech ? (
        <p>Part of speech: {PartOfSpeech.toLowerCase()}</p>
      ) : null}
      {Meanings ? (
        <p>
          Meanings:{' '}
          <TextWithQuotedLatin
            linkBase={linkBase}
            text={Meanings}
            currentWordHyphenated={currentWordHyphenated}
          />
        </p>
      ) : null}
      {Notes ? (
        <p>
          Notes:{' '}
          <TextWithQuotedLatin
            linkBase={linkBase}
            text={Notes}
            currentWordHyphenated={currentWordHyphenated}
          />
        </p>
      ) : null}
      {mappedTransliterations ? (
        <p>Transliterations: {mappedTransliterations}</p>
      ) : null}
      {mappedForms && !shouldGeneratedFormsBeShown ? (
        <p>Sample of forms: {mappedForms}</p>
      ) : null}
      {shouldGeneratedFormsBeShown ? (
        <FormsTable
          Forms={Forms}
          formsFromWordsCollection={formsFromWordsCollection}
          lemma={lemma.Lemma}
          linkBase={linkBase}
          currentWordHyphenated={currentWordHyphenated}
          openByDefault={showFormsByDefault}
        />
      ) : null}
      <p>
        {Root ? (
          <>Cognates: {mappedCognates}</>
        ) : (
          'I have not assigned cognates for this lemma, sorry!'
        )}
      </p>
    </div>
  )
}

export default Lemma
