const delChars = require('./delChars')

// subwords() returns an array of objects.
// The array of objects from Mongo should be passed in as the second parameter.
// This second parameter must include Word, NoMacra, NoMacraLowerCase, and Length fields.

const findSubwordsFromMongo = (input,wordObjects) => {
    // We assume input is already demacronized from the front-end.
    let filteredWordObjects = wordObjects.filter(word=>{
        if (delChars(input,word.NoMacraLowerCase).length === input.length-word.Word.length) {
            return true
        }
        else {
            return false
        }
    })
    // Now we sort the array.
    let sortedWordObjects = filteredWordObjects
    sortedWordObjects = sortedWordObjects.sort((a,b)=>{
        if (a.Word.length > b.Word.length) {
            return -1
        }
        else if (a.Word.length < b.Word.length) {
            return 1
        }
        else if (a.NoMacraLowerCase < b.NoMacraLowerCase) {
            return -1
        }
        else if (a.NoMacraLowerCase > b.NoMacraLowerCase) {
            return 1
        }
        else if (a.NoMacra > b.NoMacra) {
            return 1
        }
        else if (a.NoMacra < b.NoMacra) {
            return -1
        }
        else if (a.Word > b.Word) {
            return 1
        }
        else if (a.Word < b.Word) {
            return -1
        }
        else {
            return 0
        }
    })
        
    return sortedWordObjects
}

module.exports = findSubwordsFromMongo