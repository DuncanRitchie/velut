import macraToHyphens from "./macraToHyphens";

const noMacra = (word) => {
    return macraToHyphens(word).replace(/\-/g,"").replace(/\./g,"").replace(/\:/g,"")
}

export default noMacra