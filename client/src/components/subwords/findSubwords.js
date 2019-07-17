const noMacra = require('../word/noMacra')
const delChars = require('./delChars')

// subwords() returns an array of objects. The array of objects from Mongo should be passed in as the second parameter.

const findSubwords = (input,wordObjects) => {
    if (wordObjects[0].Word) {
        let filteredWordObjects = wordObjects.filter(word=>{
            if (delChars(input.toLowerCase(),noMacra(word.Word)).length === input.length-word.Word.length) {
                return true
            }
            else {
                return false
            }
        })
        let sortedWordObjects = filteredWordObjects.sort((a,b)=>{
            if (a.Word.length > b.Word.length) {
                return -1
            }
            else if (a.Word.length < b.Word.length) {
                return 1
            }
            else if (noMacra(a.Word).toLowerCase() < noMacra(b.Word).toLowerCase()) {
                    return -1
                }
                else {
                    return 1
                }
        })
        return sortedWordObjects
    }
    else {return null}
}

export default findSubwords

// const jsonExample = require('./jsonExample.json')

// console.log(findSubwords("duncanusrichardus",jsonExample))