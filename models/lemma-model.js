const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lemmaSchema = new Schema({
	"Ord": Number,
    "Word": String,
    "PartOfSpeech": String,
    "Meaning": String,
    "Scansion": String,
    "SyllableCount": Number,
    "Root": String,
    "FormCount": Number,
    "NoTypeTag": String,
    "NoMacra": String
},{collection: 'lemmata'})

const Lemma = mongoose.model('Lemma', lemmaSchema)

module.exports = Lemma;
