const Word = require('../models/word-model')

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
		Word.findOne(req.query).select({"Word": 1, "NoMacra": 1, "PerfectRhyme": 1, "AlphOrderNoMacra": 1, "LemmaArray": 1, "Scansion": 1, "_id": 0})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	findWordsClassical: function(req, res) {
		Word.find(req.query).sort("Sort").select({"Word": 1, "NoMacra": 1, "_id": 0})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	findWordsEcclesiastical: function(req, res) {
		Word.find(req.query).sort("EcclesSort").select({"Word": 1, "NoMacra": 1, "_id": 0})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	findWordsAlphabetical: function(req, res) {
		Word.find(req.query).sort("NoMacra Word").select({"Word": 1, "NoMacra": 1, "_id": 0})
			.then(words => res.json(words))
			.catch(err => res.status(422).json(err))
	},
	// findWordsShorterThan() doesn't actually work.
	findWordsShorterThan: function(req,res) {
		Word.find({}).lte("Length",req.params.lte).exec(words=>res.json(words))
			.catch(err => res.status(422).json(err))
	},
	findById: function(req, res) {
		Word.findById(req.params.id)
			.then(word => res.json(word))
			.catch(err => res.status(422).json(err))
	}
	// ,
	// create: function(req, res) {
	// 	Word.create(req.body)
	// 		.then(newWord => res.json(newWord))
	// 		.catch(err => res.status(422).json(err));
	// },
	// update: function(req, res) {
	// 	Word.findOneAndUpdate({ _id: req.params.id }, req.body)
	// 		.then(word => res.json(word))
	// 		.catch(err => res.status(422).json(err));
	// },
	// remove: function(req, res) {
	// 	Word.findById({ _id: req.params.id })
	// 		.then(word => word.remove())
	// 		.then(allwords => res.json(allwords))
	// 		.catch(err => res.status(422).json(err));
	// }
}
