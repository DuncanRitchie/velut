export const hyphensToMacra = (hyphenatedWord) => {
    // Hyphens are converted to macra.
    let toMacra = hyphenatedWord.replace(/A-/g,"\u0100").replace(/a-/g,"\u0101").replace(/E-/g,"\u0112").replace(/e-\./g,"\u1E17").replace(/e-/g,"\u0113").replace(/I-/g,"\u012A").replace(/i-/g,"\u012B").replace(/O-/g,"\u014C").replace(/o-/g,"\u014D").replace(/U-/g,"\u016A").replace(/u-:/g,"\u1E7B").replace(/u-/g,"\u016B").replace(/Y-/g,"\u0232").replace(/y-/g,"\u0233")
    // Cola are converted to diaereses.
    let toDiaereses = toMacra.replace(/a:/g,"\u00E4").replace(/e:/g,"\u00EB").replace(/I:/g,"\u00CF").replace(/i:/g,"\u00EF").replace(/o:/g,"\u00F6").replace(/u:/g,"\u00FC").replace(/y:/g,"\u00FF")
    // Dots are converted to acutes.
    let toAcutes = toDiaereses.replace(/A\./g,"\u00C1").replace(/E\./g,"\u00C9").replace(/I\./g,"\u00CD").replace(/O\./g,"\u00D3").replace(/U\./g,"\u00DA").replace(/Y\./g,"\u00DD").replace(/a\./g,"\u00E1").replace(/e\./g,"\u00E9").replace(/i\./g,"\u00ED").replace(/o\./g,"\u00F3").replace(/u\./g,"\u00FA").replace(/y\./g,"\u00FD")
    return toAcutes
}

export const macraToHyphens = (macronizedWord) => {
    // Macra are converted to hyphens.
    let toHyphens = macronizedWord.replace(/\u0100/g,"A-").replace(/\u0101/g,"a-").replace(/\u0112/g,"E-").replace(/\u0113/g,"e-").replace(/\u012A/g,"I-").replace(/\u012B/g,"i-").replace(/\u014C/g,"O-").replace(/\u014D/g,"o-").replace(/\u016A/g,"U-").replace(/\u016B/g,"u-").replace(/\u1E7B/g,"u-:").replace(/\u0232/g,"Y-").replace(/\u0233/g,"y-").replace(/\u1e17/g,"e-.")
    // Acutes are converted to dots.
    let toDots = toHyphens.replace(/\u00C1/g,"A.").replace(/\u00C9/g,"E.").replace(/\u00CD/g,"I.").replace(/\u00D3/g,"O.").replace(/\u00DA/g,"U.").replace(/\u00DD/g,"Y.").replace(/\u00E1/g,"a.").replace(/\u00E9/g,"e.").replace(/\u00ED/g,"i.").replace(/\u00F3/g,"o.").replace(/\u00FA/g,"u.").replace(/\u00FD/g,"y.")
    // Diaereses are converted to cola.
    toCola = toDots.replace(/\u00E4/g,"a:").replace(/\u00EB/g,"e:").replace(/\u00CF/g,"I:").replace(/\u00EF/g,"i:").replace(/\u00F6/g,"o:").replace(/\u00FC/g,"u:").replace(/\u00FF/g,"y:")
    return toCola
}

