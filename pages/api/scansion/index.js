import data from "../../../data/feet.json"
//// `data` is an array of objects with Foot and Name string properties.
//// Eg {Foot: "–⏑–", "Name": "cretic, amphimacer"}

//// Simply looks up the name of the scansion in `data`.
//// Eg "–⏑⏑" -> "dactyl"
//// Eg "–⏑–" -> "cretic, amphimacer"
//// Eg "–⏑⏑–⏑⏑⏑" -> undefined (not in `data`)
const getFootNameInData = (scansion) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].Foot === scansion) {
            return data[i].Name
        }
    }
}

//// Recursive function that takes a scansion and returns a string describing it by splitting it into scansions of lengths 3 and 2.
//// Scansions of 4 syllables are divided into two disyllables (a “head” and a “tail”).
//// Scansions of more than 4 syllables are divided into a trisyllabic “head” and a “tail” made of the remaining syllables.
//// Scansions of fewer than 4 syllables are looked up in `data`.
//// Eg "–⏑⏑" -> "dactyl"
//// Eg "–⏑–" -> "cretic"
//// Eg "–⏑⏑––" -> "dactyl spondee" (because "–⏑⏑" -> "dactyl" and "––" -> "spondee")
//// Eg "–⏑⏑–⏑⏑⏑" -> "dactyl trochee pyrrhic" (because "–⏑⏑" -> "dactyl" and "–⏑⏑⏑" -> "trochee pyrrhic" because "–⏑" -> "trochee" and "⏑⏑" -> "pyrrhic")
const getScansionDescriptionRecursive = (scansion) => {
    if (scansion.length <= 3) {
        //// If the Name is "cretic, amphimacer", we return only "cretic".
        return getFootNameInData(scansion)?.split(",")[0]
    }
    
    const headLength = scansion.length === 4 ? 2 : 3
    const head = getScansionDescriptionRecursive(scansion.substring(0, headLength))
    const tail = getScansionDescriptionRecursive(scansion.substring(headLength))

    return `${head} ${tail}`
}

//// If the scansion is in `data`, the corresponding description is returned (though eg "cretic, amphimacer" becomes "cretic or amphimacer"). Otherwise, we use the recursive function above.
const getScansionDescription = (scansion) => {
    return getFootNameInData(scansion)?.replace(",", " or") ?? getScansionDescriptionRecursive(scansion)
}

export default getScansionDescription
