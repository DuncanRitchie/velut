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
