const mongoose = require('mongoose')

// Defining the Mongoose schema.
const wordsSchema = new mongoose.Schema({
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
    "Ultima rhyme": String,
    "Rhyme vowels": String,
    "PerfectRhyme": String,
    "Rhyme consonants": String,
    "Ultima": String,
    "Rhyme vowels & ultima coda": String,
    "Ecclesiastical phonetic": String,
    "Ecclesiastical vowels": String,
    "Ecclesiastical rhyme vowels": String,
    "Ecclesiastical PerfectRhyme": String,
    "Ecclesiastical sort column": String,
    "IsLemma": Bool,
    "IsNonLemma": Bool,
    "Macra as hyphens": String,
    "NoMacra": String,
    "AlphOrderNoMacra": String,
    "Keypad code": String,
    "Sort": String
})

// Making the Mongoose model
const Words = mongoose.model('Words',wordsSchema)