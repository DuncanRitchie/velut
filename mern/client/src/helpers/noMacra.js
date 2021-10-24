import macraToHyphens from "./macraToHyphens";

//// This function should be exactly the same as controllers/noMacra.
//// Duplicated because we can’t call server code on the client.

const noMacra = (word) => {
    return macraToHyphens(word).replace(/-/g,"").replace(/\./g,"").replace(/:/g,"")
}

export default noMacra