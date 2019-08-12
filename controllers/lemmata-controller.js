const Lemma = require('../models/lemma-model')

module.exports = {
	// .findOneLemma() is accessed from route e.g. /api/lemma/one/?Lemma=pīca
	findOneLemma: function(req, res) {
		Lemma.findOne(req.query).select({
				"Lemma": 1,
				"PartOfSpeech": 1,
				"Meaning": 1,
				"Notes": 1,
				"Transliteration": 1,
				"Root": 1,
				"NoTypeTag": 1,
				"NoMacra": 1,
				"_id": 0
			})
			.then(words => {res.json(words)})
			.catch(err => res.status(422).json(err))
	},
	// .findLemmata() is accessed from route e.g. /api/lemma/?Root=veniō
	findLemmata: function(req, res) {
		Lemma.find(req.query).sort("NoMacraLowerCase NoMacra NoTypeTag Lemma").select({
			"Lemma": 1,
			"_id": 0
		}).then(words=>{res.json(words)})
	},
	// .findLemmaById() does not get used, but its route is /api/lemma/id/:id
	findLemmaById: function(req, res) {
		Lemma.findById(req.params.id)
			.then(word => res.json(word))
			.catch(err => res.status(422).json(err))
	}
}
