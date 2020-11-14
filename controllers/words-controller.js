const Word = require('../models/word-model')
const findSubwordsFromMongo = require('./findSubwordsFromMongo')
const findAnagrams = require('./findAnagrams')
const flatten = require('flat')
const e = require('express')

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
	findOneWord: function(req, res) {
		Word.findOne(req.query)
			.select({
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
			})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
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
	findByPattern: function(req, res) {
		//// req.query = { scansion: String, spelling: String, elision: Boolean, sort: String }
		let findObject = {};
		let elisionAllowed = req.query.elision == "true";
		let sortInput = req.query.sort || "classical"
		const sortStrings = {
			"alphabetical": "NoMacraLowerCase NoMacra Word",
			"classical": "Sort",
			"ecclesiastical": "EcclesSort"
		}

		let scansionInput = req.query.scansion;
		console.log("scansionInput: ", scansionInput);
		if (scansionInput) {
			let scansion = scansionInput
				.replace(/[^lsx_–⏑]/gi, "")
				.replace(/l/gi, "–")
				.replace(/s/gi, "⏑")
				.replace(/x/gi, "[–⏑]")
				.replace(/_/g, ".*");
			scansion = `^${scansion}$`;
			console.log("scansion: ", scansion);
			if (elisionAllowed) {
				findObject.ScansionWithElision = {"$regex": scansion};
			}
			else {
				findObject.Scansion = {"$regex": scansion};
			}
		}

		let spellingInput = req.query.spelling;
		console.log("spellingInput: ", spellingInput);
		if (spellingInput) {
			let spelling = spellingInput
				.replace(/[^abcdefghiklmnopqrstuvxyzCV_]/g, "")
				.replace(/C/g, "[bcdfghklmnpqrstvxz]")
				.replace(/V/g, "[aeiouy]")
				.replace(/_/g, ".*");
			let elisionSubregex = "";
			if (elisionAllowed
			  && "abcdefghiklmnopqrstuvxyz".includes(spelling.substr(-1))) {
				elisionSubregex = "(a|e|i|o|u|y|ae|au|oe|am|em|im|om|um|ym)?";
			}
			spelling = `^${spelling}${elisionSubregex}$`;
			console.log("spelling: ", spelling);
			findObject.NoMacra = {"$regex": spelling};
		}
		
		if (scansionInput || spellingInput) {
			Word.find(findObject)
			.sort(sortStrings[sortInput])
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