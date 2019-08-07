import delChars from './delChars'

// subwords() returns an array of objects. The array of objects from Mongo should be passed in as the second parameter.

const findSubwords = (input,wordObjects) => {
    if (wordObjects[0].Word) {
        let filteredWordObjects = wordObjects.filter(word=>{
            if (delChars(input,word.NoMacra).length === input.length-word.Word.length) {
                return true
            }
            else {
                return false
            }
        })
        // The relevant Mongoose controller, the one that produces the array that is fed in as wordObjects,
        // produces either a sorted array with only Word projected, or an unsorted array with both Word and
        // NoMacraLowerCase. So if NoMacraLowerCase is projected, we want to sort the array here.
        let sortedWordObjects = filteredWordObjects
        if (wordObjects[0].NoMacraLowerCase) {
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
                else {
                    return 1
                }
            })
         }
            
        return sortedWordObjects
    }
    else {return null}
}

export default findSubwords

// const jsonExample = require('./jsonExample.json')

// console.log(findSubwords("duncanusrichardus",jsonExample))