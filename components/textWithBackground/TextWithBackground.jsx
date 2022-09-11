import { Fragment } from 'react'
import styles from './TextWithBackground.module.css'

// This component gives text a background that matches
// the sky-blue gradient of the page background.
// It works by splitting a string into words (and spaces).
// For each word (or space), it renders two spans.
// The first span is for the visible text.
// The second is for the sky-blue background.
// Two spans are needed so that the backgrounds
// do not hide the text of adjacent words.

const TextWithBackground = ({ text }) => {
  const splitIntoSpans = (text) => {
    return text
      .split(/(?<= )|(?= )/)
      .map((word, index) => (
        <Fragment key={word + ' ' + index}>
          <span>{word}</span>
          <span aria-hidden="true">{word}</span>
        </Fragment>
      ))
  }

  return (
    <span className={styles.textWithBackground}>{splitIntoSpans(text)}</span>
  )
}

export default TextWithBackground
