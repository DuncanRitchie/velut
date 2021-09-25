import mongoose from 'mongoose'

const lemmaSchema = new mongoose.Schema({
	"Ord": Number,
    "Word": String,
    "PartOfSpeech": String,
    "Meanings": String,
    "Notes": String,
    "Transliterations": String,
    "Scansion": String,
    "SyllableCount": Number,
    "Root": String,
    "FormCount": Number,
    "NoTypeTag": String,
    "NoMacra": String,
    "NoMacraLowerCase": String
}, {collection: 'lemmata'})

export default mongoose.model('Lemma', lemmaSchema)
