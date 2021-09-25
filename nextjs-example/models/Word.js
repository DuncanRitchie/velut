import mongoose from 'mongoose'

const wordSchema = new mongoose.Schema({
	"Ord": Number,
    "Word": String,
    "Length": Number,
    "LemmaArray": Array,
    "AllConsonants": String,
    "Uncompounded": String,
    "Phonetic": String,
    "Scansion": String,
    "ScansionWithElision": String,
    "AllVowels": String,
    "SyllableCount": Number,
    "Stress": Number,
    "RhymeVowels": String,
    "PerfectRhyme": String,
    "RhymeConsonants": String,
    "Ultima": String,
    "RhymeVowelsAndUltimaCoda": String,
    "EcclesPhonetic": String,
    "EcclesVowels": String,
    "EcclesRhymeVowels": String,
    "EcclesRhymeVowelsAndUltimaCoda": String,
    "EcclesPerfectRhyme": String,
    "EcclesSort": String,
    "IsLemma": Boolean,
    "IsNonLemma": Boolean,
    "MacraAsHyphens": String,
    "NoMacra": String,
    "AlphOrderNoMacra": String,
    "NoMacraLowerCase": String,
    "Sort": String
});

export default mongoose.model('Word', wordSchema);
