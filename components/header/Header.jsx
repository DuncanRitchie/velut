let Header = (props) => {
  return (
    <header className="header">
      {/* Pages that don’t have `textBeforeTitle` have <h1> outside of Header */}
      {props.textBeforeTitle && <h1>{props.textBeforeTitle}</h1>}
      <p>
        <span className="titleAuthor">Duncan Ritchie’s</span>
        <br />
        <abbr
          className="title"
          title="Useful Tables of Excellent Latin Vocabulary"
        >
          velut
        </abbr>
      </p>
      <p className="titleFull" lang="la">
        Vocābulōrum Excellentium
        <br />
        Latīnōrum Ūtilēs Tabulae
      </p>
    </header>
  )
}

export default Header
