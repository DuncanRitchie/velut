// This file contains a new set of methods for handling diacritics,
// an old set of methods (each prefixed with “old”) for the same,
// and a method that tests both sets of methods.

const macraAndHyphens = [
  ['\u0100', 'A-'],
  ['\u0101', 'a-'],
  ['\u0112', 'E-'],
  ['\u1E17', 'e-.'],
  ['\u0113', 'e-'],
  ['\u012A', 'I-'],
  ['\u012B', 'i-'],
  ['\u014C', 'O-'],
  ['\u014D', 'o-'],
  ['\u016A', 'U-'],
  ['\u1E7B', 'u-:'],
  ['\u016B', 'u-'],
  ['\u0232', 'Y-'],
  ['\u0233', 'y-'],
  ['\u00C4', 'A:'],
  ['\u00E4', 'a:'],
  ['\u00CB', 'E:'],
  ['\u00EB', 'e:'],
  ['\u00CF', 'I:'],
  ['\u00EF', 'i:'],
  ['\u00D6', 'O:'],
  ['\u00F6', 'o:'],
  ['\u00DC', 'U:'],
  ['\u00FC', 'u:'],
  ['\u0178', 'Y:'],
  ['\u00FF', 'y:'],
  ['\u00C1', 'A.'],
  ['\u00C9', 'E.'],
  ['\u00CD', 'I.'],
  ['\u00D3', 'O.'],
  ['\u00DA', 'U.'],
  ['\u00DD', 'Y.'],
  ['\u00E1', 'a.'],
  ['\u00E9', 'e.'],
  ['\u00ED', 'i.'],
  ['\u00F3', 'o.'],
  ['\u00FA', 'u.'],
  ['\u00FD', 'y.'],
]

export const hyphensToMacra = (hyphenatedWord) => {
  if (!hyphenatedWord?.replaceAll) {
    console.error(
      `hyphenatedWord is “${hyphenatedWord}” inside hyphensToMacra. A zero-width space has been rendered in its place.`,
    )
    // This is a zero-width space U+200B.
    return '​'
  }

  let temp = hyphenatedWord
  macraAndHyphens.forEach(([macron, hyphen]) => {
    temp = temp.replaceAll(hyphen, macron)
  })
  return temp
}

export const macraToHyphens = (macronizedWord) => {
  if (!macronizedWord?.replaceAll) {
    console.error(
      `macronizedWord is “${macronizedWord}” inside macraToHyphens. A zero-width space has been rendered in its place.`,
    )
    // This is a zero-width space U+200B.
    return '​'
  }

  let temp = macronizedWord
  macraAndHyphens.forEach(([macron, hyphen]) => {
    temp = temp.replaceAll(macron, hyphen)
  })
  return temp
}

export const noMacra = (word) => {
  if (!word?.replace) {
    throw new Error(`word is “${word}” inside noMacra`)
  }

  return macraToHyphens(word).replace(/-/g, '').replace(/\./g, '').replace(/:/g, '')
}

// // Old versions of the functions above.

// const hyphensToMacraOld = (hyphenatedWord) => {
//   // Hyphens are converted to macra.
//   let toMacra = hyphenatedWord
//     .replace(/A-/g, '\u0100')
//     .replace(/a-/g, '\u0101')
//     .replace(/E-/g, '\u0112')
//     .replace(/e-\./g, '\u1E17')
//     .replace(/e-/g, '\u0113')
//     .replace(/I-/g, '\u012A')
//     .replace(/i-/g, '\u012B')
//     .replace(/O-/g, '\u014C')
//     .replace(/o-/g, '\u014D')
//     .replace(/U-/g, '\u016A')
//     .replace(/u-:/g, '\u1E7B')
//     .replace(/u-/g, '\u016B')
//     .replace(/Y-/g, '\u0232')
//     .replace(/y-/g, '\u0233')
//   // Cola are converted to diaereses.
//   let toDiaereses = toMacra
//     .replace(/a:/g, '\u00E4')
//     .replace(/e:/g, '\u00EB')
//     .replace(/I:/g, '\u00CF')
//     .replace(/i:/g, '\u00EF')
//     .replace(/o:/g, '\u00F6')
//     .replace(/u:/g, '\u00FC')
//     .replace(/y:/g, '\u00FF')
//   // Dots are converted to acutes.
//   let toAcutes = toDiaereses
//     .replace(/A\./g, '\u00C1')
//     .replace(/E\./g, '\u00C9')
//     .replace(/I\./g, '\u00CD')
//     .replace(/O\./g, '\u00D3')
//     .replace(/U\./g, '\u00DA')
//     .replace(/Y\./g, '\u00DD')
//     .replace(/a\./g, '\u00E1')
//     .replace(/e\./g, '\u00E9')
//     .replace(/i\./g, '\u00ED')
//     .replace(/o\./g, '\u00F3')
//     .replace(/u\./g, '\u00FA')
//     .replace(/y\./g, '\u00FD')
//   return toAcutes
// }

// const macraToHyphensOld = (macronizedWord) => {
//   // Macra are converted to hyphens.
//   let toHyphens = macronizedWord
//     .replace(/\u0100/g, 'A-')
//     .replace(/\u0101/g, 'a-')
//     .replace(/\u0112/g, 'E-')
//     .replace(/\u0113/g, 'e-')
//     .replace(/\u012A/g, 'I-')
//     .replace(/\u012B/g, 'i-')
//     .replace(/\u014C/g, 'O-')
//     .replace(/\u014D/g, 'o-')
//     .replace(/\u016A/g, 'U-')
//     .replace(/\u016B/g, 'u-')
//     .replace(/\u1E7B/g, 'u-:')
//     .replace(/\u0232/g, 'Y-')
//     .replace(/\u0233/g, 'y-')
//     .replace(/\u1e17/g, 'e-.')
//   // Acutes are converted to dots.
//   let toDots = toHyphens
//     .replace(/\u00C1/g, 'A.')
//     .replace(/\u00C9/g, 'E.')
//     .replace(/\u00CD/g, 'I.')
//     .replace(/\u00D3/g, 'O.')
//     .replace(/\u00DA/g, 'U.')
//     .replace(/\u00DD/g, 'Y.')
//     .replace(/\u00E1/g, 'a.')
//     .replace(/\u00E9/g, 'e.')
//     .replace(/\u00ED/g, 'i.')
//     .replace(/\u00F3/g, 'o.')
//     .replace(/\u00FA/g, 'u.')
//     .replace(/\u00FD/g, 'y.')
//   // Diaereses are converted to cola.
//   let toCola = toDots
//     .replace(/\u00E4/g, 'a:')
//     .replace(/\u00EB/g, 'e:')
//     .replace(/\u00CF/g, 'I:')
//     .replace(/\u00EF/g, 'i:')
//     .replace(/\u00F6/g, 'o:')
//     .replace(/\u00FC/g, 'u:')
//     .replace(/\u00FF/g, 'y:')
//   return toCola
// }

// const noMacraOld = (word) => {
//   return macraToHyphens(word)
//     .replace(/-/g, '')
//     .replace(/\./g, '')
//     .replace(/:/g, '')
// }

// // Function testing all the functions above.

// export const testDiacriticsFunctions = () => {
//   const testSetOfFunctions = (nameOfSet, toHyphens, toMacra, toPlain) => {
//     const testWords = [
//       ['', '', ''],
//       ['fūlmārus', 'fu-lma-rus', 'fulmarus'],
//       ['Iēsus', 'Ie-sus', 'Iesus'],
//       ['Ïēsus', 'I:e-sus', 'Iesus'],
//       ['Caenīnō', 'Caeni-no-', 'Caenino'],
//       ['peragitis', 'peragitis', 'peragitis'],
//       ['gentīlitātibus', 'genti-lita-tibus', 'gentilitatibus'],
//       ['domínī', 'domi.ni-', 'domini'],
//       ['áäú', 'a.a:u.', 'aau'],
//       ['Abȳdum', 'Aby-dum', 'Abydum'],
//       ['Cytherēïī', 'Cythere-i:i-', 'Cythereii'],
//       ['Fīdḗnās', 'Fi-de-.na-s', 'Fidenas'],
//       ['Iṻlī', 'Iu-:li-', 'Iuli'],
//       ['Ántiās', 'A.ntia-s', 'Antias'],
//       ['AEIOUYaeiouy', 'AEIOUYaeiouy', 'AEIOUYaeiouy'],
//       ['ĀĒĪŌŪȲāēīōūȳ', 'A-E-I-O-U-Y-a-e-i-o-u-y-', 'AEIOUYaeiouy'],
//       ['ÁÉÍÓÚÝáéíóúý', 'A.E.I.O.U.Y.a.e.i.o.u.y.', 'AEIOUYaeiouy'],
//       ['ÄËÏÖÜŸäëïöüÿ', 'A:E:I:O:U:Y:a:e:i:o:u:y:', 'AEIOUYaeiouy'],
//       [
//         'AEIOUYaeiouyĀĒĪŌŪȲāēīōūȳÁÉÍÓÚÝáéíóúýÄËÏÖÜŸäëïöüÿ',
//         'AEIOUYaeiouyA-E-I-O-U-Y-a-e-i-o-u-y-A.E.I.O.U.Y.a.e.i.o.u.y.A:E:I:O:U:Y:a:e:i:o:u:y:',
//         'AEIOUYaeiouyAEIOUYaeiouyAEIOUYaeiouyAEIOUYaeiouy',
//       ],
//     ]

//     testWords.map(([macra, hyphens, plain]) => {
//       const computedHyphens = toHyphens(macra)
//       const computedMacra = toMacra(hyphens)
//       const computedPlainFromMacra = toPlain(macra)
//       const computedPlainFromHyphens = toPlain(hyphens)

//       const handleCorrect = () => console.log('Yay!')
//       const handleIncorrect = (expected, actual) => {
//         console.log(`${nameOfSet}: Expected ${expected} but got ${actual}`)
//       }
//       const testOne = (expected, actual) => {
//         if (expected === actual) {
//           handleCorrect()
//         } else {
//           handleIncorrect(expected, actual)
//         }
//       }

//       testOne(hyphens, computedHyphens)
//       testOne(macra, computedMacra)
//       testOne(plain, computedPlainFromMacra)
//       testOne(plain, computedPlainFromHyphens)
//     })
//   }

//   testSetOfFunctions('old', macraToHyphensOld, hyphensToMacraOld, noMacraOld)
//   testSetOfFunctions('new', macraToHyphens, hyphensToMacra, noMacra)
// }
