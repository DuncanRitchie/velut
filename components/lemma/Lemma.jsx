import { Fragment } from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'
const greece = '../../images/greece.png'
const israel = '../../images/israel.png'
import LatinLink from '../latinlink/LatinLink'
import TextWithQuotedLatin from '../latinlink/TextWithQuotedLatin'

const Lemma = ({ linkBase, lemma, currentWordHyphenated }) => {
  let {
    PartOfSpeech,
    Meanings,
    Notes,
    Transliterations,
    Root,
    cognates,
    forms,
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

  // Create JSX for the forms.
  const mappedForms = forms ? (
    forms.map((form, index) => {
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
      {mappedForms ? <p>Forms: {mappedForms}</p> : null}
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
