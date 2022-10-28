//// The list is adapted from https://en.wiktionary.org/wiki/Appendix:Latin_praenomina
const abbrevsAndPraenomina = [
  ['Ap.', 'Appius'],
  ['A.', 'Aulus'],
  ['D.', 'Decimus'],
  ['C.', 'Gāius'],
  ['Cn.', 'Gnaeus'],
  ['K.', 'Kaesō'],
  ['L.', 'Lūcius'],
  ["M'.", 'Mānius'],
  ['M’.', 'Mānius'],
  ['M.', 'Mārcus'],
  ['N.', 'Numerius'],
  ['O.', 'Octāvius'],
  ['P.', 'Pūblius'],
  ['Q.', 'Quīntus'],
  ['Qu.', 'Quīntus'],
  ['S.', 'Servius'],
  ['Ser.', 'Servius'],
  ['Sex.', 'Sextus'],
  ['Sp.', 'Spurius'],
  ['Ti.', 'Tiberius'],
  ['T.', 'Titus'],
]

//// Eg, "Ap." => "Appius"
//// The abbreviation needs to match exactly for it to be expanded, otherwise it is returned unchanged.
export default function expandPraenomen(potentialAbbrev) {
  const foundPraenomenTuple = abbrevsAndPraenomina.find(
    (tuple) => tuple[0] === potentialAbbrev,
  )
  return foundPraenomenTuple ? foundPraenomenTuple[1] : potentialAbbrev
}
