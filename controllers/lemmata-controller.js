const Lemma = require('../models/lemma-model')
const sortLemmataOnMeanings = require('./sortLemmataOnMeanings')

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
		// Because this controller uses regex, we escape characters that have
		// special meanings in regex. This escaping function is taken from MDN:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
		const escapedInput = req.params.word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
		// About the query if invalid.
		if (!escapedInput) {
			res.status(400).json("Please provide a valid query.");
			return;
		}
		// Regex used here only to match lemmata where `escapedInput` is a substring of Meanings.
		Lemma.find({
			"Meanings": {
				"$regex": escapedInput,
				"$options": "i"
			}
		})
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
			let sortedLemmata = sortLemmataOnMeanings(lemmata, escapedInput)
			res.json(sortedLemmata.slice(0,100))
		})
		.catch(err => res.status(400).json(err))
	},
	// .findLemmaById() does not get used, but its route is /api/lemma/id/:id
	findLemmaById: function(req, res) {
		Lemma.findById(req.params.id)
			.then(word => res.json(word))
			.catch(err => res.status(422).json(err))
	}
}
