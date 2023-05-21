//// This function is copied from the Inflector.
function prettyPrintJson(text) {
  return JSON.stringify(text, null, '\t')
    .replace(/(?<=": \[)\n\s*/g, '') // Delete newline at start of array
    .replace(/(?<="|\d)\n\s*(?=\])/g, '') // Delete newline at end of array
    .replace(/\n\s+(?=[^:{}]+\n)/g, ' ') // Delete newlines between array items
}

const FormsTable = ({
  formsFromWordsCollection,
  Forms,
  linkBase,
  currentWordHyphenated,
}) => {
  return (
    <pre style={{ textAlign: 'left', tabSize: 2 }}>
      {prettyPrintJson(Forms)
        .split('\n')
        .map((line) => (
          <>
            {line}
            <br />
          </>
        ))}
    </pre>
  )
}

export default FormsTable
