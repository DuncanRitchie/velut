const Word = require('../models/word-model')
const findSubwordsFromMongo = require('./findSubwordsFromMongo')
const findAnagrams = require('./findAnagrams')
const hyphensToMacra = require('./hyphensToMacra')
const noMacra = require('./noMacra')
const flatten = require('flat')
const e = require('express')

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

// Defining all methods and logic for routes

module.exports = {
	count: function(req, res) {
		Word.estimatedDocumentCount().exec((err, count) => {
			if (err) {
				res.send(err);
				return;
			}

			res.json({ "count": count });
		})
	},
	findOneWordFromQuery: function(req, res) {
		Word.findOne(req.query)
			.select(selectionForOneWord)
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	findOneWord: function(req, res) {
		const input = req.query.input;
		const possibleQueries = [
			{"Word": hyphensToMacra(input)},
			{"NoMacra": noMacra(input)},
			{"NoMacraLowerCase": noMacra(input).toLowerCase()},
		]
		//// Recursive local function to execute each query until a word is found.
		const executeQuery = (indexOfQuery) => {
			Word.findOne(possibleQueries[indexOfQuery])
				.select(selectionForOneWord)
				.then((data)=>{
					//// If the current query found a word, send the data to the front-end.
					if (data) {
						res.json(data);
					}
					//// If there are no more possible queries, send `undefined`.
					else if (indexOfQuery == possibleQueries.length - 1) {
						res.json(undefined);
					}
					//// Otherwise, recurse to try the next query.
					else {
						executeQuery(indexOfQuery + 1);
					}
				})
				.catch(err => res.status(422).json(err))
		}
		//// Launch the recursive function, starting with the first query.
		executeQuery(0);
	},
	findWordsClassical: function(req, res) {
		console.log(req);
		Word.find(req.query)
			.sort("Sort")
			.select({"Word": 1, "_id": 0})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	findWordsEcclesiastical: function(req, res) {
		Word.find(req.query)
			.sort("EcclesSort")
			.select({"Word": 1, "_id": 0})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	findWordsAlphabetical: function(req, res) {
		Word.find(req.query)
			.sort("NoMacraLowerCase NoMacra Word")
			.select({"Word": 1, "_id": 0})
			.then(words => res.json(words))
			.catch(err => res.status(422).json(err))
	},
	findSubwords: function(req,res) {
		let input = req.query.input
		Word.find({"Length": {"$lte": input.length}})
			.select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "Length": 1, "_id": 0})
			.then(words=>{
				let sortedSubwords = findSubwordsFromMongo(input,words)
				let subwordsOnlyWord = sortedSubwords.map((object)=>{
					return object.Word
				})
				return subwordsOnlyWord
			})
			.then(subwords=>{res.json(subwords)})
	},
	findAnagrams: function(req,res) {
		let input = req.query.input
		Word.find({"Length": {"$lte": input.length}})
			.select({"Word": 1, "NoMacraLowerCase": 1, "NoMacra": 1, "Length": 1, "_id": 0})
			.then(words=>{
				return sortedSubwords = findSubwordsFromMongo(input,words)
			})
			.then(subwords => {
				try {
					anagrams = Object.getOwnPropertyNames(flatten(findAnagrams(input,subwords),{delimiter: " "}))
					return anagrams
				} catch {
					return ["Internal server error"]
				}})
				.then(anagrams=>{res.json(anagrams)})
	},
	findAdvanced: function(req, res) {
		//// req.query = { scansion: String, spelling: String, elision: Boolean, sort: String }
		let findObject = {};
		let criteriaAreValid = false;
		let elisionAllowed = req.query.elision == "true";
		const sortStrings = {
			"alphabetical": "NoMacraLowerCase NoMacra Word",
			"classical": "Sort",
			"ecclesiastical": "EcclesSort"
		}
		let sortInput = req.query.sort
		if (!sortStrings.hasOwnProperty(sortInput)) {
			sortInput = "alphabetical";
		}

		const scansionInput = req.query.scansion;
		console.log("scansionInput: ", scansionInput);
		// If there is anything in the scansion input...
		if (scansionInput) {
			let scansion = scansionInput
				.replace(/[^lsx\.~_–⏑]/gi, "")  // Discard any invalid characters.
				.replace(/\./g, "x")            // x and . both mean an anceps syllable (can be long or short).
				.replace(/(?<![lsx])~/gi, "")  // ~ has no effect if not preceded by a letter.
				.replace(/(?:.~)+_/g, "_")      // Tokens made optional have no effect before _.
				.replace(/_(?:.~)+/g, "_")      // Tokens made optional have no effect after _.
				.replace(/[_]+/gi, "_")         // Collapse consecutive underscores into one underscore.
				.replace(/l/gi, "–")            // Long syllable.
				.replace(/s/gi, "⏑")            // Short syllable.
				.replace(/^_$/, "")             // Queries that would return all words should not proceed.
				.replace(/^x_$/i, "")           // Queries that would return all words should not proceed.
				.replace(/^_x$/i, "")           // Queries that would return all words should not proceed.
				.replace(/x/gi, "[–⏑]")         // Anceps syllable can be a long or a short.
				.replace(/~/g, "?")             // ~ makes the preceding token optional.
				.replace(/_/g, ".*");           // Zero or more of anything.

			// If the `scansion` is now the empty string, we do not use it in the search. Otherwise, we do.
			if (scansion) {
				criteriaAreValid = true;
				scansion = `^${scansion}$`;
				if (elisionAllowed) {
					findObject.ScansionWithElision = {"$regex": scansion};
				}
				else {
					findObject.Scansion = {"$regex": scansion};
				}
			}
		}

		const spellingInput = req.query.spelling;
		console.log("spellingInput: ", spellingInput);
		// If there is anything in the spelling input...
		if (spellingInput) {
			let spelling = spellingInput
				.replace(/[^abcdefghiklmnopqrstuvxyzCV~._]/g, "")  // Discard invalid characters.
				.replace(/C/g, "[bcdfghklmnpqrstvxz]")             // Any consonant.
				.replace(/V/g, "[aeiouy]")                         // Any vowel.
				.replace(/(?<![A-Za-z.])~/g, "")                   // ~ has no effect if not preceded by a letter.
				.replace(/(?:.~)+_/g, "_")                         // Tokens made optional have no effect before _.
				.replace(/_(?:.~)+/g, "_")                         // Tokens made optional have no effect after _.
				.replace(/^_$/, "")                                // Searches that would return everything are not allowed.
				.replace(/~/g, "?")                                // ~ makes the preceding token optional.
				.replace(/_/g, ".*");                              // Zero or more of anything.

			// If the `spelling` is now the empty string, we do not use it in the search. Otherwise, we do.
			if (spelling) {
				spelling = `^${spelling}$`;
				console.log("spelling: ", spelling);
				findObject.NoMacraLowerCase = {"$regex": spelling};

				criteriaAreValid = true;
			}
		}

		if (criteriaAreValid) {
			console.log("findObject: ", findObject);

			Word.find(findObject)
			.sort(sortStrings[sortInput])
			.limit(1000)
			.select({"Word": 1, "_id": 0})
			.then(words => {
				res.json(words)
			});
		}
		else {
			res.status(400).json("Please specify scansion or spelling.");
		}
	},
	findById: function(req, res) {
		Word.findById(req.params.id)
			.then(word => res.json(word))
			.catch(err => res.status(422).json(err))
	}
}