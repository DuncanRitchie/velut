const macraToHyphens = (macronizedWord) => {
    let toHyphens = macronizedWord.replace(/\u0100/g,"A-").replace(/\u0101/g,"a-").replace(/\u0112/g,"E-").replace(/\u0113/g,"e-").replace(/\u012A/g,"I-").replace(/\u012B/g,"i-").replace(/\u014C/g,"O-").replace(/\u014D/g,"o-").replace(/\u016A/g,"U-").replace(/\u016B/g,"u-").replace(/\u0232/g,"Y-").replace(/\u0233/g,"y-")
    let toDots = toHyphens.replace(/\u00C1/g,"A.").replace(/\u00C9/g,"E.").replace(/\u00CD/g,"I.").replace(/\u00D3/g,"O.").replace(/\u00DA/g,"U.").replace(/\u00DD/g,"Y.").replace(/\u00EA/g,"a.").replace(/\u00E9/g,"e.").replace(/\u00ED/g,"i.").replace(/\u00F3/g,"o.").replace(/\u00FA/g,"u.").replace(/\u00FD/g,"y.")
    return toDots
}

export default macraToHyphens