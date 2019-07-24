const Word = require('../models/word-model')
const findSubwordsFromMongo = require('./findSubwordsFromMongo')

// Defining all methods and logic for routes

module.exports = {
	// .count() may not actually work
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
	findById: function(req, res) {
		Word.findById(req.params.id)
			.then(word => res.json(word))
			.catch(err => res.status(422).json(err))
	}
	// // This is no longer being used.
	//  , findWordsShorterThan: function(req,res) {
	// 	Word.find({"Length": {"$lte": req.query.lte}})
	// 		.sort("-Length NoMacraLowerCase NoMacra Word")
	// 		.select({"Word": 1, "_id": 0})
	// 		.then(words=>res.json(words))
	// 		.catch((err1) => {
	// 			// If an error occurs, it's probably because Mongo failed to sort.
	// 			// So we try again, without sort, but projecting NoMacraLowerCase for sorting front-end.
	// 			Word.find({"Length": {"$lte": req.query.lte}})
	// 				.select({"Word": 1, "NoMacraLowerCase": 1, "_id": 0})
	// 				.then(words=>res.json(words))
	// 				.catch(err2 => {
	// 					res.status(422).json(err2)
	// 				})
	// 		})
	// }
}
