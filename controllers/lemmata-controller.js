const Lemma = require('../models/lemma-model')
const sortLemmataOnMeaning = require('./sortLemmataOnMeaning')

module.exports = {
	// .count() is accessed from route /api/lemma/count
	count: function(req, res) {
		Lemma.estimatedDocumentCount().exec((err, count) => {
			if (err) {
				res.send(err);
				return;
			}
		
			res.json({ "count": count });
		})
	},
	// .findOneLemma() is accessed from route e.g. /api/lemma/one/?Lemma=pīca
	findOneLemma: function(req, res) {
		Lemma.findOne(req.query).select({
				"Lemma": 1,
				"PartOfSpeech": 1,
				"Meanings": 1,
				"Notes": 1,
				"Transliterations": 1,
				"Root": 1,
				"NoTypeTag": 1,
				"NoMacra": 1,
				"_id": 0
			})
			.then(lemma => {res.json(lemma)})
			.catch(err => res.status(422).json(err))
	},
	// .findLemmata() is accessed from route e.g. /api/lemmata/?Root=veniō
	findLemmata: function(req, res) {
		Lemma.find(req.query).sort("NoMacraLowerCase NoMacra NoTypeTag Lemma").select({
			"Lemma": 1,
			"_id": 0
		})
		.then(lemmata=>{res.json(lemmata)})
		.catch(err => res.status(422).json(err))
	},
	// .findFromEnglish() is accessed from route /api/lemmata/english/:word
	findFromEnglish: function(req, res) {
		Lemma.find({
			"Meanings": {
				"$regex": req.params.word,
				"$options": "i"
			}
		})
		// .sort("NoMacraLowerCase NoMacra NoTypeTag Lemma")
		.select({
			"Lemma": 1,
			"PartOfSpeech": 1,
			"Meanings": 1,
			"Notes": 1,
			"Transliterations": 1,
			"Root": 1,
			"NoTypeTag": 1,
			"NoMacra": 1,
			"_id": 0
		})
		.then(lemmata=>{
			let sortedLemmata = sortLemmataOnMeaning(lemmata, req.params.word)
			res.json(sortedLemmata.slice(0,100))
		})
		.catch(err => res.status(422).json(err))
	},
	// .findLemmaById() does not get used, but its route is /api/lemma/id/:id
	findLemmaById: function(req, res) {
		Lemma.findById(req.params.id)
			.then(word => res.json(word))
			.catch(err => res.status(422).json(err))
	}
}
