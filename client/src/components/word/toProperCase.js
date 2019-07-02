const toProperCase = (word) => {
    if (!word) {
        return word
    }
    else {
        let lettersArray = word.toLowerCase().split("")
        lettersArray[0] = lettersArray[0].toUpperCase()
        return lettersArray.join("")
    }
}

export default toProperCase

// console.log(toProperCase("i am a very happy human."))
// console.log(toProperCase("BABADOOK!!!"))
// console.log(toProperCase("āēīōūȳ"))