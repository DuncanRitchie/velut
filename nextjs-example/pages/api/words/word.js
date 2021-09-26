import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'
import { hyphensToMacra, noMacra } from '../diacritics';

const selectionForOneWord = {
	"Word": 1,
	"NoMacra": 1,
	"PerfectRhyme": 1,
	"AlphOrderNoMacra": 1,
	"LemmaArray": 1,
	"Scansion": 1,
	"EcclesPerfectRhyme": 1,
	"RhymeVowels": 1,
	"RhymeVowelsAndUltimaCoda": 1,
	"EcclesRhymeVowels": 1,
	"EcclesRhymeVowelsAndUltimaCoda": 1,
	"AllConsonants": 1,
	"_id": 0
};

const findOneWord = async function(searchWord, selection) {
	console.log(`Calling findOneWord on “${searchWord}”`)
	await dbConnect()
	//// Possible queries, wrapped in functions so that `noMacra(searchWord)` etc will not be evaluated unless needed for a query.
	const funcsReturningQueries = [
		(searchWord) => { return {"Word": hyphensToMacra(searchWord)}},
		(searchWord) => { return {"NoMacra": noMacra(searchWord)}},
		(searchWord) => { return {"NoMacraLowerCase": noMacra(searchWord).toLowerCase()}},
	]
	//// Recursive local function to generate and execute each query until a word is found.
	const executeQuery = async (indexOfQuery) => {
		console.log(`Calling executeQuery on “${searchWord}”`)
		try {
			const foundWord = await Word.findOne(funcsReturningQueries[indexOfQuery](searchWord)).select(selection).exec()
			console.log({foundWord})
			//// If the current query found a word, send the data to the front-end.
			if (foundWord) {
				return { word: foundWord, success: true }
			}
			//// If there are no more possible queries, send `null`.
			else if (indexOfQuery == funcsReturningQueries.length - 1) {
				return { word: null, success: false }
			}
			//// Otherwise, recurse to try the next query.
			else {
				executeQuery(indexOfQuery + 1);
			}
		}
		catch (err) {
			console.log(err)
			return { success: false, error: err, word: null }
		}			
	}
	//// Launch the recursive function, starting with the first query.
	return executeQuery(0);
}

const findOneWordSelectSeveralFields = async function(searchWord) {
	console.log(`Calling findOneWordSelectSeveralFields on “${searchWord}”`)
	return await findOneWord(searchWord, selectionForOneWord)
}

export default findOneWordSelectSeveralFields
