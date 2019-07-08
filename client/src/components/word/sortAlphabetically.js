// The objects parameter must contain a NoMacra field.
const sortAlphabetically = (objects) => {
    let wordOrLemma = "Lemma"
    if (objects[0].Word) {
        wordOrLemma = "Word"
    }
    let sortedObjects = objects.sort((a,b)=>{
        if (a.NoMacra.toLowerCase() > b.NoMacra.toLowerCase()) {
            return 1
        }
        else if (a.NoMacra.toLowerCase() < b.NoMacra.toLowerCase()) {
            return -1
        }
        else if (a[wordOrLemma].toLowerCase() > b[wordOrLemma].toLowerCase()) {
            return 1
        }
        else if (a[wordOrLemma].toLowerCase() < b[wordOrLemma].toLowerCase()) {
            return -1
        }
        else if (a[wordOrLemma] > b[wordOrLemma]) {
            return 1
        }
        else {return -1}
    })
    return sortedObjects
}

export default sortAlphabetically