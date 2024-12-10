//// The list is adapted from https://en.wiktionary.org/wiki/Appendix:Latin_praenomina
const abbrevsAndPraenomina = [
  ['AP.', 'Appius'],
  ['APP.', 'Appius'],
  ['A.', 'Aulus'],
  ['AUL.', 'Aulus'],
  ['D.', 'Decimus'],
  ['C.', 'Gāius'],
  ['CN.', 'Gnaeus'],
  ['K.', 'Kaesō'],
  ['L.', 'Lūcius'],
  ['MAM.', 'Māmercus'],
  ["M'.", 'Mānius'],
  ['M’.', 'Mānius'],
  ['M.', 'Mārcus'],
  ['N.', 'Numerius'],
  ['O.', 'Octāvius'],
  ['OCT.', 'Octāvius'],
  ['P.', 'Pūblius'],
  ['Q.', 'Quīntus'],
  ['QU.', 'Quīntus'],
  ['SEPT.', 'Septimus'],
  ['SER.', 'Servius'],
  ['SEX.', 'Sextus'],
  ['S.', 'Spurius'],
  ['SP.', 'Spurius'],
  ['TI.', 'Tiberius'],
  ['TIB.', 'Tiberius'],
  ['T.', 'Titus'],
]

//// Eg, "Ap." => "Appius"
//// If the input is not an abbreviation in the list, it is returned unchanged.
export default function expandPraenomen(potentialAbbrev) {
  const foundPraenomenTuple = abbrevsAndPraenomina.find((tuple) => tuple[0] === potentialAbbrev.toUpperCase())
  return foundPraenomenTuple ? foundPraenomenTuple[1] : potentialAbbrev
}
