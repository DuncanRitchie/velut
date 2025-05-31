import mongoose from 'mongoose'

const lemmaSchema = new mongoose.Schema(
  {
    // Ord: Number,
    Word: String,
    PartOfSpeech: String,
    Meanings: String,
    Notes: String,
    Transliterations: String,
    // Scansion: String,
    // SyllableCount: Number,
    Root: String,
    // FormCount: Number,
    NoTypeTag: String,
    NoMacra: String,
    NoMacraLowerCase: String,
    Forms: Object,
  },
  { collection: 'lemmata' },
)

//// If Lemma is already on the Mongoose model, we use it, otherwise add it.
export default mongoose.models?.Lemma || mongoose.model('Lemma', lemmaSchema)
