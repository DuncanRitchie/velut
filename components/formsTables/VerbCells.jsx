import { LatinLinks } from './FormsTable'
import { grammaticalKeysByType as possibleKeys } from '../../lib/lemmata/grammaticalKeys'

// In the tables of verb forms, <th> cells have `data-id` attributes, which are unique within the <table> element.
// Every cell has a `data-headers` attribute, which lists the <th> cells (via their `data-id`) that are the headers for the cell.
// This allows the appropriate header cells to be highlighted (via CSS) whenever a cell is hovered.

// A more standard way of communicating what <th> cells are the headers of what <th>/<td> cells is to use `id` and `headers` attributes.
// But screen-readers (etc) don’t have great support for that, and `id` elements must be unique to the page, not just to the table.
// If my `data-id` & `data-headers` attributes are to be converted to `id` & `headers`, a unique key will need to be generated
// for each table and appended to each ID, and my CSS would also require modification (unless the data- attributes are kept alongside `id`/`headers`).
// Furthermore, a <th>’s `headers` attribute probably shouldn’t contain its own `id` (a cell cannot semantically be its own header),
// but I would still want the cell to be highlighted on hover.

// Given an array of tags, eg ['indicative', 'active', 'present', 'singular', 'first'],
// this function returns the `data-` attributes that enable cells to be assigned to their headers.
// For example, {
//                'data-headers': 'indicative singular first-singular active present-active',
//                'data-id': 'present-active',
//              }
// `data-id` is used on <th> elements and `data-headers` is used on both <th> & <td> elements.
// `data-headers` is the space-delimited list of the IDs of the <th> cells that are headers for the cell,
// `data-headers` always includes `data-id`, so hovering a <th> cell highlights it as one of its own headers.
function getHeaderAttributes(tagsArray) {
  let headerIds = []
  // In the array of tags, which one is the mood, the number, the voice, etc?
  const mood = tagsArray.find((key) => possibleKeys.moods.includes(key))
  const number = tagsArray.find((key) => possibleKeys.numbers.includes(key))
  const voice = tagsArray.find((key) => possibleKeys.voices.includes(key))
  const gerundOrSupine = tagsArray.find((key) => possibleKeys.gerundAndSupine.includes(key))
  const gender = tagsArray.find((key) => possibleKeys.genders.includes(key))
  const person = tagsArray.find((key) => possibleKeys.persons.includes(key))
  const tense = tagsArray.find((key) => possibleKeys.tenses.includes(key))
  const grammaticalCase = tagsArray.find((key) => possibleKeys.cases.includes(key))
  // Now let’s populate the headerIds array.
  // Since the last header ID will be used for the ID of any <th> cell, the order of the `push` statements below matters.
  // In creating the IDs, some keys need to be combined, because there may be more than one `present` row or `first` column (etc) and they need to be disambiguated.
  if (mood) {
    headerIds.push(mood)
  }
  if (voice) {
    headerIds.push(voice)
    if (tense) {
      headerIds.push(voice + '-' + tense)
    }
  }
  if (grammaticalCase) {
    if (gerundOrSupine) {
      headerIds.push(gerundOrSupine)
      headerIds.push(grammaticalCase + '-' + gerundOrSupine)
    } else {
      headerIds.push(grammaticalCase)
    }
  }
  if (number) {
    if (person) {
      headerIds.push(number)
      headerIds.push(person + '-' + number)
    } else if (gender) {
      headerIds.push(gender)
      headerIds.push(number + '-' + gender)
    } else {
      headerIds.push(number)
    }
  } else if (gender) {
    headerIds.push(gender)
  }
  // All cells have a `data-headers` attribute.
  // The `data-id` doesn’t get used for <td> cells, but <th> cells need it.
  return { 'data-headers': headerIds.join(' '), 'data-id': headerIds.at(-1) }
}

const VerbHeaderCell = ({ tags, colSpan, rowSpan, children }) => {
  const headerAttributes = getHeaderAttributes(tags.split(' '))
  return (
    <th colSpan={colSpan} rowSpan={rowSpan} {...headerAttributes}>
      {children}
    </th>
  )
}

// Every <th> and every <td> cell has a `tags` attribute that lists grammatical keys, eg "infinitive active present".
// This enables the correct <th> cells to be highlighted when any <td> or <th> cell is hovered (via the data-headers attribute).
// <th>/<td> cells are not marked up directly in the JSX, but <VerbHeaderCell> & <VerbDataCell> are used instead.
// The <VerbDataCell> component receives `tags` and creates a <td> element, and the element’s content
// is found from the Forms object by following the `tags` (eg `Forms.infinitive.active.present`).
// Therefore the order of the grammatical keys is important.
// For example, <VerbDataCell tags="infinitive active present" />
// might become HTML <td data-headers="infinitive active present-active">clāmāre</td>
// <VerbDataCell> is <GenericVerbDataCell> with some parameters curried in.
const GenericVerbDataCell = ({ tags, colSpan, Forms, linkBase, currentWordHyphenated }) => {
  const tagsArray = tags.split(' ')
  let forms = Forms
  tagsArray.forEach((key) => {
    if (!forms) {
      return
    }
    forms = forms[key]
  })

  const headers = getHeaderAttributes(tagsArray)['data-headers']

  return (
    <td data-headers={headers} colSpan={colSpan || null}>
      <LatinLinks formsArray={forms} linkBase={linkBase} currentWordHyphenated={currentWordHyphenated} />
    </td>
  )
}

export { GenericVerbDataCell, VerbHeaderCell }
