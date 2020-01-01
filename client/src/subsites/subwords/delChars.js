// delChars takes two strings as parameters.
// It removes every character (case-insensitive) in the second parameter from the first parameter, 
// e.g. delChars("Duncanus","nunc") = "Daus"
// e.g. delChars("Rīchardus","hinc") = "Rīardus"
// e.g. delChars("Richardus","hinc") = "Rardus"

const delChars = (superword,subword) => {
    let string = superword.toLowerCase()
    subword = subword.toLowerCase()
    let chars = subword.split("")
    for (let i=0; i<subword.length; i++) {
        string = string.replace(chars[i],"")
    }
    return string
}

export default delChars