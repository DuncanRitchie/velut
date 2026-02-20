import mongoose from 'mongoose'

const lemmaSchema = new mongoose.Schema(
  // Both Root and Roots are used in velut.
  // Root is the older field, used for specifying one lemma that is an etymological root of the lemma in the object.
  // Roots is a newer field, used for specifying at least one root.
  // Code for finding cognates considers all the roots in Roots, or simply Root (if there is no Roots).
  // My intention over time is that I will fill out all lemmata with a Roots field, and then I’ll deprecate Root.
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
    Roots: [String],
    // FormCount: Number,
    // NoTypeTag: String,
    NoMacra: String,
    NoMacraLowerCase: String,
    Forms: Object,
  },
  { collection: 'lemmata' },
)

//// If Lemma is already on the Mongoose model, we use it, otherwise add it.
export default mongoose.models?.Lemma || mongoose.model('Lemma', lemmaSchema)
