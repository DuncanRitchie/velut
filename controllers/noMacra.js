const macraToHyphens = require("./macraToHyphens");

//// This function should be exactly the same as client/src/helpers/noMacra.
//// Duplicated because we can’t call client code on the server.

const noMacra = (word) => {
    return macraToHyphens(word).replace(/-/g,"").replace(/\./g,"").replace(/:/g,"")
}

module.exports = noMacra