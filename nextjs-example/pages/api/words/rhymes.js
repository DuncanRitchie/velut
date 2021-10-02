//{"NoMacraLowerCase": noMacraLowerCase}

import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'
import routes from '../../../routes.json'

export default async function getRhymes(wordObject, type) {
    console.log({wordObject, type})
    try {
        await dbConnect()

        // Let’s find the rhymes.
        // We will be using the following three values if route-specific values are not found in routes.json.
        let searchField = "PerfectRhyme" // This is the MongoDB fieldname.
        let axiosFuncName = "getWordsClass" // This is one of "getWordsAlph", "getWordsClass", "getWordsEccles" depending on the sort wanted.
        let searchFieldFull = "Perfect rhymes (classical)" // This will be rendered onscreen as a heading.
        // The route determines which type of rhyme will be wanted.
        // routes is routes.json, which matches routes to searchField, axiosFuncName, and searchFieldFull.
        // Let’s retrieve the values we want.
        const routeObject = routes.find(route=>{return ("/"+type === route.route)})
        if (routeObject) {
            searchField = routeObject.searchField
            axiosFuncName = routeObject.axiosFuncName
            searchFieldFull = routeObject.searchFieldFull
        }
        let query = {[searchField]: wordObject[searchField]}

        const foundWords = await Word.find(query)
            .sort("Sort")
            .select({"Word": 1, "_id": 0})
            .exec()
        console.log({foundWords})
        if (foundWords.length) {
            console.log("Mapping through foundWords")
            const rhymes = foundWords.map(word=>word.Word)
            console.log({rhymes})
            return { success: true, rhymes }
        }
        else {
            return { success: false }
        }
    }
    catch (error) {
        console.log(error)
        return { success: false, error: error.toString() }
    }
}




const fetchRhymes = (wordObject, type) => {
    // Let’s find the rhymes.
    // We will be using the following three values if route-specific values are not found in routes.json.
    let searchField = "PerfectRhyme" // This is the MongoDB fieldname.
    let axiosFuncName = "getWordsClass" // This is one of "getWordsAlph", "getWordsClass", "getWordsEccles" depending on the sort wanted.
    let searchFieldFull = "Perfect rhymes (classical)" // This will be rendered onscreen as a heading.
    // The route determines which type of rhyme will be wanted.
    // routes is routes.json, which matches routes to searchField, axiosFuncName, and searchFieldFull.
    // Let’s retrieve the values we want.
    const routeObject = routes.find(route=>{return ("/"+type === route.route)})
    if (routeObject) {
        searchField = routeObject.searchField
        axiosFuncName = routeObject.axiosFuncName
        searchFieldFull = routeObject.searchFieldFull
    }
    let query = {[searchField]: wordObject[searchField]}

    // axios[axiosFuncName](query).then((data)=>{
    //     let rhymes = data.data.map((wordObject,index)=>{
    //         return wordObject.Word
    //     })
    // })

    return {
        rhymes: [],
        searchField,
    }
}
const findWordsClassical = function(req, res) {
	console.log(req);
	Word.find(req.query)
		.sort("Sort")
		.select({"Word": 1, "_id": 0})
		.then(words => {res.json(words)})
		.catch(err => res.status(422).json(err))
}

const findWordsEcclesiastical = function(req, res) {
	Word.find(req.query)
		.sort("EcclesSort")
		.select({"Word": 1, "_id": 0})
		.then(words => {res.json(words)})
		.catch(err => res.status(422).json(err))
}

const findWordsAlphabetical = function(req, res) {
	Word.find(req.query)
		.sort("NoMacraLowerCase NoMacra Word")
		.select({"Word": 1, "_id": 0})
		.then(words => res.json(words))
		.catch(err => res.status(422).json(err))
}