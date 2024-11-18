// Used in VerbFormsTable
export const grammaticalKeysByType = {
  moods: ['indicative', 'subjunctive', 'imperative', 'infinitive', 'gerund', 'supine', 'participle'],
  numbers: ['singular', 'plural'],
  voices: ['active', 'passive'],
  gerundAndSupine: ['gerund', 'supine'],
  genders: ['masculine', 'feminine', 'neuter'],
  persons: ['first', 'second', 'third'],
  tenses: ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'futureperfect'],
  cases: ['nominative', 'vocative', 'accusative', 'genitive', 'dative', 'ablative'],
}

// Most of the keys in the form data are suitable for display,
// but keys of more than one word will need added spaces.
export default function prettyPrintGrammaticalKey(key) {
  switch (key) {
    case 'futureperfect':
      return 'future perfect'
    case 'ne':
      return '-ne'
    case 'que':
      return '-que'
    case 've':
      return '-ve'
    default:
      return key
  }
}
