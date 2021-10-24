const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
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

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
