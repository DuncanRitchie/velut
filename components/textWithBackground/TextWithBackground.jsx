import styles from './TextWithBackground.module.css'

const TextWithBackground = ({ text }) => {
  const splitIntoSpans = (text) => {
    return text
      .split(/(?<= )|(?= )/)
      .map((word) => (
        <>
          <span>{word}</span>
          <span aria-hidden="true">{word}</span>
        </>
      ))
  }

  return (
    <span className={styles.textWithBackground}>{splitIntoSpans(text)}</span>
  )
}

export default TextWithBackground
