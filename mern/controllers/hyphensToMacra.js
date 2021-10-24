//// This function should be exactly the same as client/src/helpers/hyphensToMacra.
//// Duplicated because we can’t call client code on the server.

const hyphensToMacra = (hyphenatedWord) => {
    // Hyphens are converted to macra.
    let toMacra = hyphenatedWord.replace(/A-/g,"\u0100").replace(/a-/g,"\u0101").replace(/E-/g,"\u0112").replace(/e-\./g,"\u1E17").replace(/e-/g,"\u0113").replace(/I-/g,"\u012A").replace(/i-/g,"\u012B").replace(/O-/g,"\u014C").replace(/o-/g,"\u014D").replace(/U-/g,"\u016A").replace(/u-:/g,"\u1E7B").replace(/u-/g,"\u016B").replace(/Y-/g,"\u0232").replace(/y-/g,"\u0233")
    // Cola are converted to diaereses.
    let toDiaereses = toMacra.replace(/a:/g,"\u00E4").replace(/e:/g,"\u00EB").replace(/I:/g,"\u00CF").replace(/i:/g,"\u00EF").replace(/o:/g,"\u00F6").replace(/u:/g,"\u00FC").replace(/y:/g,"\u00FF")
    // Dots are converted to acutes.
    let toAcutes = toDiaereses.replace(/A\./g,"\u00C1").replace(/E\./g,"\u00C9").replace(/I\./g,"\u00CD").replace(/O\./g,"\u00D3").replace(/U\./g,"\u00DA").replace(/Y\./g,"\u00DD").replace(/a\./g,"\u00E1").replace(/e\./g,"\u00E9").replace(/i\./g,"\u00ED").replace(/o\./g,"\u00F3").replace(/u\./g,"\u00FA").replace(/y\./g,"\u00FD")
    return toAcutes
}

module.exports = hyphensToMacra