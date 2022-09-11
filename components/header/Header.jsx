import styles from './Header.module.css'

let Header = (props) => {
  return (
    <header className={styles.header}>
      {/* Pages that don’t have `textBeforeTitle` have <h1> outside of Header */}
      {props.textBeforeTitle && <h1>{props.textBeforeTitle}</h1>}
      <p>
        <span className={styles.titleAuthor}>Duncan Ritchie’s</span>
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
        Vocābulōrum Excellentium
        <br />
        Latīnōrum Ūtilēs Tabulae
      </p>
    </header>
  )
}

export default Header
