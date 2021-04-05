const macraToHyphens = require("./macraToHyphens");

const noMacra = (word) => {
    return macraToHyphens(word).replace(/-/g,"").replace(/\./g,"").replace(/:/g,"")
}

module.exports = noMacra