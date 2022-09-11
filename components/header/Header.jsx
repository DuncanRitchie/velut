import TextWithBackground from '../textWithBackground/TextWithBackground'
import styles from './Header.module.css'

let Header = (props) => {
  return (
    <header className={styles.header}>
      {/* Pages that don’t have `textBeforeTitle` have <h1> outside of Header */}
      {props.textBeforeTitle && <h1>{props.textBeforeTitle}</h1>}
      <p>
        <span className={styles.titleAuthor}>
          <TextWithBackground text="Duncan Ritchie’s" />
        </span>
        <br />
        <abbr
          className={styles.title}
          lang="la"
          title="Useful Tables of Excellent Latin Vocabulary"
        >
          velut
        </abbr>
      </p>
      <p className={styles.titleFull} lang="la">
        <TextWithBackground text="Vocābulōrum Excellentium" />
        <br />
        <TextWithBackground text="Latīnōrum Ūtilēs Tabulae" />
      </p>
    </header>
  )
}

export default Header
