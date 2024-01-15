import { Fragment } from 'react'
import LatinLink from './LatinLink'
import {
  regexMatchingPunctuation,
  regexMatchingQuotedText,
  regexSplittingOnPunctuation,
  regexSplittingOnQuotedText,
} from './quotedTextRegexes'

//// Converts a text string into a JSX array, where each word is a LatinLink but spaces and quote-marks are not.
const LatinPhrase = ({ text, ...otherProps }) => {
  //// Split the string before and after any quote-mark or space. Eg, ‘ūsque ad’ -> ‘|ūsque| |ad|’
  const substrings = text.split(regexSplittingOnPunctuation)
  //// Convert the substrings to JSX depending on whether they are words or quote-marks/spaces.
  const jsx = substrings.map((substring, index) => {
    const innerJSX = regexMatchingPunctuation.test(substring) ? (
      substring
    ) : (
      <LatinLink targetWord={substring} {...otherProps} />
    )
    return <Fragment key={index}>{innerJSX}</Fragment>
  })
  return <span lang="la">{jsx}</span>
}

//// Converts a text string to a JSX array, with internal appearances of ‘…’ converted into LatinPhrase elements
//// For example, if `text` = "to the full extent; ‘ūsque ad’ = right up to; ‘ūsque quāque’ = always",
//// "‘ūsque ad’" and "‘ūsque quāque’" become LatinPhrase elements.
const TextWithQuotedLatin = ({ text, ...otherProps }) => {
  //// Split the string before and after the quoted text.
  const substrings = text.split(regexSplittingOnQuotedText)
  //// Convert the substrings to JSX depending on whether they are quoted.
  const jsx = substrings.map((substring, index) => {
    const innerJSX = regexMatchingQuotedText.test(substring) ? (
      <LatinPhrase text={substring} {...otherProps} />
    ) : (
      substring
    )
    return <Fragment key={index}>{innerJSX}</Fragment>
  })
  return jsx
}

export default TextWithQuotedLatin
