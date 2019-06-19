const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
	"Ord": Number,
    "Word": String,
    "LemmaArray": Array,
    "All consonants (Consonyms)": String,
    "Uncompounded": String,
    "Phonetic": String,
    "Scansion": String,
    "All vowels": String,
    "Syllable count": Number,
    "Stress": Number,
    "Rhyme vowels": String,
    "Perfect rhyme": String,
    "Rhyme consonants": String,
    "Ultima": String,
    "Rhyme vowels & ultima coda": String,
    "Ecclesiastical phonetic": String,
    "Ecclesiastical vowels": String,
    "Ecclesiastical rhyme vowels": String,
    "Ecclesiastical perfect rhyme": String,
    "Ecclesiastical sort column": String,
    "IsLemma": Boolean,
    "IsNonLemma": Boolean,
    "Macra as hyphens": String,
    "No macra": String,
    "Alph order no macra": String,
    "Keypad code": Number,
    "Sort column": String
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
