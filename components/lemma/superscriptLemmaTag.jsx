//// If there are multiple lemmata in the database with the same headword,
//// I add extra info in square brackets to disambiguate.
//// Eg "amīcus[n]" & "amīcus[adj]" because “amīcus” can be noun or adjective.
//// This function converts this text into JSX, with the bracketed bit
//// (if present) rendered in round brackets with a CSS class.
//// Eg "amīcus[n]" -> <>amīcus <span className="lemma-tag">(n)</span>
//// Eg "fūlmārus" -> <>fūlmārus</>
const superscriptLemmaTag = (lemma) => {
  if (!lemma) {
    return null
  }

  //// Split the string on [ and ]
  let array = lemma.split(/[[\]]/g)
  //// Any text in square brackets becomes `array[1]`
  if (!array[1]) {
    return <>{lemma}</>
  }

  return (
    <span lang="la">
      {array[0]}&nbsp;<span className="lemma-tag">({array[1]})</span>
    </span>
  )
}
export default superscriptLemmaTag
