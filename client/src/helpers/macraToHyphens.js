const macraToHyphens = (macronizedWord) => {
    // Macra are converted to hyphens.
    let toHyphens = macronizedWord.replace(/\u0100/g,"A-").replace(/\u0101/g,"a-").replace(/\u0112/g,"E-").replace(/\u0113/g,"e-").replace(/\u012A/g,"I-").replace(/\u012B/g,"i-").replace(/\u014C/g,"O-").replace(/\u014D/g,"o-").replace(/\u016A/g,"U-").replace(/\u016B/g,"u-").replace(/\u1E7B/g,"u-:").replace(/\u0232/g,"Y-").replace(/\u0233/g,"y-")
    // Acutes are converted to dots.
    let toDots = toHyphens.replace(/\u00C1/g,"A.").replace(/\u00C9/g,"E.").replace(/\u00CD/g,"I.").replace(/\u00D3/g,"O.").replace(/\u00DA/g,"U.").replace(/\u00DD/g,"Y.").replace(/\u00E1/g,"a.").replace(/\u00E9/g,"e.").replace(/\u00ED/g,"i.").replace(/\u00F3/g,"o.").replace(/\u00FA/g,"u.").replace(/\u00FD/g,"y.")
    // Diaereses are converted to cola.
    toDots = toDots.replace(/\u00E4/g,"a:").replace(/\u00EB/g,"e:").replace(/\u00CF/g,"i:").replace(/\u00EF/g,"i:").replace(/\u00F6/g,"o:").replace(/\u00FC/g,"u:").replace(/\u00FF/g,"y:")
    return toDots
}

export default macraToHyphens